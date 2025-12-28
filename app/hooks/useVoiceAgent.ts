import { useState, useRef, useCallback, useEffect } from 'react';
import { RTCPeerConnection, mediaDevices, RTCView, MediaStream } from 'react-native-webrtc';
import EventTarget from 'event-target-shim';

// Define endpoints - in a real app these should be proxied to avoid exposing keys
// For this demo we'll use a direct ephemeral token approach if possible, or just the instruction
// to use a valid key from .env which the user must provide.

const OPENAI_BASE_URL = 'https://api.openai.com/v1/realtime';
const MODEL = 'gpt-4o-realtime-preview-2024-10-01';

export const useVoiceAgent = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);
    const dcRef = useRef<RTCDataChannel | null>(null);

    const cleanup = useCallback(() => {
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }
        setIsConnected(false);
        setIsSpeaking(false);
    }, []);

    const connect = useCallback(async (apiKey: string) => {
        if (!apiKey) {
            console.error('API Key is required');
            return;
        }

        try {
            // 1. Get an ephemeral token (In production, do this on server)
            // Since we are client-side for this demo, we'll assume we pass the raw key 
            // OR we use the standard "Realtime API" flow which often starts with a standard WebSocket 
            // or a direct SDP exchange.
            // OpenAI Realtime WebRTC instructions (beta) usually involve:
            // POST /v1/realtime/sessions to get a session
            // Then connect via WebRTC.

            const sessionResponse = await fetch(`${OPENAI_BASE_URL}/sessions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: MODEL,
                    voice: 'alloy', // Can be parameterized
                }),
            });

            if (!sessionResponse.ok) {
                const err = await sessionResponse.text();
                throw new Error(`Failed to create session: ${err}`);
            }

            const sessionData = await sessionResponse.json();
            const ephemeralKey = sessionData.client_secret.value;

            // 2. Initialize WebRTC
            const pc = new RTCPeerConnection({
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }
                ]
            });
            pcRef.current = pc;

            // Handle remote audio
            (pc as any).ontrack = (event: any) => {
                if (event.streams && event.streams[0]) {
                    remoteStreamRef.current = event.streams[0];
                }
            };

            // 3. Get Microphone
            const stream = await mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            localStreamRef.current = stream;

            // Add existing tracks to connection
            stream.getTracks().forEach(track => {
                pc.addTrack(track, stream);
            });

            // 4. Data Channel for events
            const dc = pc.createDataChannel('oai-events');
            dcRef.current = dc;

            (dc as any).onopen = () => {
                setIsConnected(true);
                // Send initial config if needed
                const responseCreate = {
                    type: 'response.create',
                    response: {
                        modalities: ['text', 'audio'],
                        instructions: 'You are a helpful assistant.',
                    },
                };
                dc.send(JSON.stringify(responseCreate));
            };

            (dc as any).onmessage = (e: any) => {
                const event = JSON.parse(e.data);
                if (event.type === 'response.audio.delta') {
                    // We might not need to handle raw audio delta manually if we use the media stream,
                    // but visualizers use this.
                }
                if (event.type === 'input_audio_buffer.speech_started') {
                    // User started speaking
                }
                if (event.type === 'input_audio_buffer.speech_stopped') {
                    // User stopped
                }
                // Handle function calls etc.
            };


            // 5. Create Offer & Set Local Description
            const offer = await pc.createOffer({});
            await pc.setLocalDescription(offer);

            // 6. Send Offer to OpenAI (using the ephemeral token URL base usually, 
            // BUT currently the standard flow is slightly different for WebRTC beta. 
            // Often it's: connect via specific signaling mechanism.
            // 
            // ACTUALLY: As of late 2024, the easiest way for OpenAI Realtime WebRTC is often 
            // hitting the specific endpoint setup by the Ephemeral Token response.
            // Let's assume standard SDP exchange pattern for now as per generic Realtime guides.

            const sdpResponse = await fetch(`${OPENAI_BASE_URL}?model=${MODEL}`, {
                method: 'POST',
                body: offer.sdp,
                headers: {
                    'Authorization': `Bearer ${ephemeralKey}`,
                    'Content-Type': 'application/sdp',
                },
            });

            if (!sdpResponse.ok) {
                throw new Error(`SDP exchange failed: ${await sdpResponse.text()}`);
            }

            const answerSdp = await sdpResponse.text();

            await pc.setRemoteDescription({
                type: 'answer',
                sdp: answerSdp,
            });

        } catch (e) {
            console.error(e);
            cleanup();
        }
    }, [cleanup]);

    const disconnect = useCallback(() => {
        cleanup();
    }, [cleanup]);

    return {
        connect,
        disconnect,
        isConnected,
        isSpeaking // You'd update this based on events
    };
};
