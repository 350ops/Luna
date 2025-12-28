import React, { useState, useRef, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '@/app/contexts/ThemeColors';
import { PlatformSelector, Platform as SocialPlatform } from '@/components/PlatformSelector';
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
    const scrollRef = useRef<ScrollView>(null);

    const handlePlatformSelect = (platform: SocialPlatform) => {
        setSelectedPlatform(platform);

        // Add User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: `I want to increase my ${platform} followers`,
            type: 'text'
        };

        setMessages(prev => [...prev, userMsg]);

        // Add Assistant Response (Quantity Selector)
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: 'quantity-selector',
                data: { platform }
            };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

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

    return (
        <View className="flex-1" style={{ backgroundColor: colors.bg }}>
            <SafeAreaView className="flex-1">
                {/* Custom Header */}
                <View className="px-4 py-2 flex-row items-center justify-between z-10">
                    <DrawerButton />
                    {messages.length > 0 && <Text className="text-white font-bold text-xl">reach974</Text>}
                    <View style={{ width: 40 }} />
                </View>

                {messages.length === 0 ? (
                    // Initial State: Platform Selector
                    <PlatformSelector onSelect={handlePlatformSelect} />
                ) : (
                    // Chat Interface
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
                                        />
                                    )}
                                </View>
                            ))}
                        </ScrollView>

                        <ChatInput />
                    </KeyboardAvoidingView>
                )}
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;