import React, { useState } from 'react';
import { View, ScrollView, Alert, Modal, TextInput, Text } from 'react-native';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import Section from '@/components/layout/Section';
import { VoiceSelectCard } from '@/components/VoiceSelectCard';
import { useSpeech } from '@/app/hooks/useSpeech';
import { useVoiceAgent } from '@/app/hooks/useVoiceAgent';

// Add type for VoiceItem props
type VoiceItemProps = {
  name: string;
  description: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
};

const VOICES = [
  { id: "John", name: "John", description: "Deep and rich tone", sample: "Hello, I'm John. I have a deep and rich tone." },
  { id: "Jessica", name: "Jessica", description: "Friendly and warm", sample: "Hi there! I'm Jessica. I sound friendly and warm." },
  { id: "Larry", name: "Larry", description: "British gentleman", sample: "Greetings. I am Larry. I suppose I sound like a British gentleman." },
  { id: "Monday", name: "Monday", description: "Always annoyed", sample: "Ugh, whatever. I'm Monday. leave me alone." },
  { id: "Tomas", name: "Tomas", description: "Chill and relaxed", sample: "Hey dude, I'm Tomas. Just chillin' here." },
  { id: "Jerry", name: "Jerry", description: "Sarcastic and funny", sample: "Oh great, another demo. I'm Jerry." },
];

export default function AiVoiceScreen() {
  // Add state to track which voice is selected
  const [selectedVoice, setSelectedVoice] = useState("John");
  const { speak, stop, isSpeaking } = useSpeech();
  const [currentlyPreviewing, setCurrentlyPreviewing] = useState<string | null>(null);

  // OpenAI Voice Agent Hook
  const { connect, disconnect, isConnected, isSpeaking: isAgentSpeaking } = useVoiceAgent();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // Function to handle selection
  const handleSelectVoice = (voiceName: string) => {
    setSelectedVoice(voiceName);
  };

  const handlePreviewVoice = (voiceName: string) => {
    const voice = VOICES.find(v => v.name === voiceName);
    if (voice) {
      setCurrentlyPreviewing(voiceName);
      speak(voice.sample, {
        onDone: () => setCurrentlyPreviewing(null),
        onStopped: () => setCurrentlyPreviewing(null),
      });
    }
  };

  const handleStartConversation = () => {
    // In a real app key would be in env or backend
    // For this demo we ask/expect one or hardcode for dev if user provided it
    // setShowApiKeyModal(true); 
    // For now, let's assume we read from a known place or alert if missing
    // connect("...");
    alert("To use Realtime Voice, you must provide a valid OpenAI API Key in the code or via a secure input.");
  };

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header showBackButton
        rightComponents={[
          <Button title="Save" />
        ]}
      />

      <ScrollView className="flex-1 px-global">
        <Section title="Ai Voice" titleSize='3xl' className='py-8 mb-8 pl-3' subtitle="Pick the voice that matches your style" />

        {/* Connection Status / Control */}
        <View className="mb-6 mx-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <Text className="text-lg font-bold mb-2 dark:text-white">Realtime Agent</Text>
          <Text className="mb-4 dark:text-gray-300">
            Status: {isConnected ? 'Connected' : 'Disconnected'}
            {isAgentSpeaking ? ' (Speaking...)' : ''}
          </Text>
          {isConnected ? (
            <Button title="End Conversation" onPress={disconnect} variant="secondary" />
          ) : (
            <Button title="Start Conversation (WebRTC)" onPress={handleStartConversation} />
          )}
        </View>

        <View className='flex flex-row flex-wrap ' >
          {VOICES.map((voice) => (
            <VoiceSelectCard
              key={voice.id}
              isSelected={selectedVoice === voice.id}
              name={voice.name}
              description={voice.description}
              onSelect={(name) => {
                // If clicking a new card, stop current speech and start new one
                if (name !== currentlyPreviewing) {
                  handlePreviewVoice(name);
                }
                handleSelectVoice(name);
              }}
              isPlaying={currentlyPreviewing === voice.name && isSpeaking}
              onPreviewStart={() => handlePreviewVoice(voice.name)}
              onPreviewStop={stop}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
