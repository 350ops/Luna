import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useThemeColors } from '@/app/contexts/ThemeColors';
import { FontAwesome5 } from '@expo/vector-icons';

export type UserContext = 'Creator / Influencer' | 'Business / Brand' | 'Individual';

interface ContextSelectorProps {
    onSelect: (context: UserContext) => void;
}

export const ContextSelector = ({ onSelect }: ContextSelectorProps) => {
    const colors = useThemeColors();

    const OptionCard = ({ title, description, icon, color }: { title: UserContext, description: string, icon: string, color: string }) => (
        <Pressable
            onPress={() => onSelect(title)}
            style={{ backgroundColor: colors.secondary }}
            className="w-full max-w-sm mb-4 p-6 rounded-2xl border border-transparent active:border-blue-500 active:bg-gray-900"
        >
            <View className="flex-row items-center">
                <View style={{ backgroundColor: color }} className="w-12 h-12 rounded-full items-center justify-center mr-4">
                    <FontAwesome5 name={icon} size={20} color="white" />
                </View>
                <View className="flex-1">
                    <Text className="text-white text-lg font-bold">{title}</Text>
                    <Text className="text-gray-400 text-xs">{description}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View className="flex-1 justify-center items-center px-6">
            <Text className="text-white text-3xl font-bold mb-8">reach974</Text>

            <Text className="text-white text-2xl font-bold mb-12 text-center">
                What best describes you?
            </Text>

            <OptionCard
                title="Creator / Influencer"
                description="Build your personal brand"
                icon="user-astronaut"
                color="#8B5CF6"
            />

            <OptionCard
                title="Business / Brand"
                description="Expand your market reach"
                icon="building"
                color="#3B82F6"
            />

            <OptionCard
                title="Individual"
                description="Boost your personal profile"
                icon="user"
                color="#10B981"
            />
        </View>
    );
};
