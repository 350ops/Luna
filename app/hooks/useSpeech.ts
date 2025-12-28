import * as Speech from 'expo-speech';
import { useState, useEffect, useCallback } from 'react';

export const useSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            const speaking = await Speech.isSpeakingAsync();
            setIsSpeaking(speaking);
        };

        // Set up listeners for speech events
        // Note: Expo Speech doesn't have a comprehensive global event listener for all start/stop 
        // that persists easily across all calls without passing options every time, 
        // but checking routinely or relying on our own state management is best.
        
        // However, we can use the onDone/onStopped callbacks in the speak function to clear state.
        
        const interval = setInterval(checkStatus, 500);
        return () => clearInterval(interval);
    }, []);

    const speak = useCallback((text: string, options?: Speech.SpeechOptions & { voiceId?: string }) => {
        // Stop any current speech before starting new
        Speech.stop();
        
        setCurrentVoiceId(options?.voiceId || null);
        setIsSpeaking(true);

        const speechOptions: Speech.SpeechOptions = {
            ...options,
            onDone: () => {
                setIsSpeaking(false);
                setCurrentVoiceId(null);
                options?.onDone?.();
            },
            onStopped: () => {
                setIsSpeaking(false);
                setCurrentVoiceId(null);
                options?.onStopped?.();
            },
            onError: (e) => {
                setIsSpeaking(false);
                setCurrentVoiceId(null);
                options?.onError?.(e);
            }
        };

        Speech.speak(text, speechOptions);
    }, []);

    const stop = useCallback(async () => {
        await Speech.stop();
        setIsSpeaking(false);
        setCurrentVoiceId(null);
    }, []);

    const getAvailableVoices = useCallback(async () => {
        return await Speech.getAvailableVoicesAsync();
    }, []);

    return {
        isSpeaking,
        currentVoiceId,
        speak,
        stop,
        getAvailableVoices
    };
};
