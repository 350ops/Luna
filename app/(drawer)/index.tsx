import React, { useState, useRef, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '@/app/contexts/ThemeColors';
import { PlatformSelector, Platform as SocialPlatform } from '@/components/PlatformSelector';
import { ContextSelector, UserContext } from '@/components/ContextSelector';
import { QuantitySelector } from '@/components/QuantitySelector';
import DrawerButton from '@/components/DrawerButton';
import { ChatInput } from '@/components/ChatInput';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content?: string;
    type?: 'text' | 'quantity-selector' | 'success';
    data?: any;
}

const HomeScreen = () => {
    const colors = useThemeColors();
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
    const [selectedContext, setSelectedContext] = useState<UserContext | null>(null);
    const scrollRef = useRef<ScrollView>(null);

    const handlePlatformSelect = (platform: SocialPlatform) => {
        setSelectedPlatform(platform);
    };

    const handleContextSelect = (context: UserContext) => {
        setSelectedContext(context);
        startChat(selectedPlatform!, context);
    };

    const startChat = (platform: SocialPlatform, context: UserContext) => {
        // Custom Message based on Context
        let initialText = `Great — let’s work on your ${platform} visibility.\nWhat’s your goal?`;

        if (context === 'Individual') {
            initialText = `Great! Let's get more followers for your ${platform} profile to boost your social proof.`;
        } else if (context === 'Business / Brand') {
            initialText = `Excellent. Let's expand your ${platform} reach and drive more visibility for your business.`;
        } else if (context === 'Creator / Influencer') {
            initialText = `Awesome. Let's build your personal brand on ${platform} and increase your influence.`;
        }

        const botMsg: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: initialText,
            type: 'text'
        };
        setMessages([botMsg]);

        setTimeout(() => {
            const quantityMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: 'quantity-selector',
                data: { platform }
            };
            setMessages(prev => [...prev, quantityMsg]);
        }, 1200);
    }

    const handleQuantityConfirm = (qty: number, price: number) => {
        // Add User Confirmation
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: `Selected ${qty} followers for ${price} QAR`,
            type: 'text'
        };
        setMessages(prev => [...prev, userMsg]);

        // Add Assistant Success/Next Step
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Great choice! To proceed with the campaign, please provide your profile link.",
                type: 'text'
            };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    }

    // Render Logic
    const renderContent = () => {
        if (!selectedPlatform) {
            return <PlatformSelector onSelect={handlePlatformSelect} />;
        }
        if (!selectedContext) {
            return <ContextSelector onSelect={handleContextSelect} />;
        }

        // Chat Interface
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView
                    ref={scrollRef}
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 100 }}
                    onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            className={`mb-4 w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            {msg.type === 'text' && (
                                <View
                                    style={{
                                        backgroundColor: msg.role === 'user' ? colors.highlight : colors.secondary,
                                        maxWidth: '80%'
                                    }}
                                    className="px-4 py-3 rounded-2xl"
                                >
                                    <Text className="text-white text-base">{msg.content}</Text>
                                </View>
                            )}

                            {msg.type === 'quantity-selector' && (
                                <QuantitySelector
                                    platform={msg.data.platform}
                                    onConfirm={handleQuantityConfirm}
                                // Pass context if pricing differs?
                                />
                            )}
                        </View>
                    ))}
                </ScrollView>

                <ChatInput />
            </KeyboardAvoidingView>
        );
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.bg }}>
            <SafeAreaView className="flex-1">
                {/* Custom Header */}
                <View className="px-4 py-2 flex-row items-center justify-between z-10">
                    <DrawerButton />
                    {/* Show Title only in Chat or Context mode */}
                    {(selectedPlatform) && <Text className="text-white font-bold text-xl">reach974</Text>}
                    <View style={{ width: 40 }} />
                </View>

                {renderContent()}

            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;