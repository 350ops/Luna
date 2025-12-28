import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useThemeColors } from '@/app/contexts/ThemeColors';
import { FontAwesome5 } from '@expo/vector-icons';

export type Platform = 'Instagram' | 'TikTok' | 'Google' | 'Snapchat' | 'Facebook';

interface PlatformSelectorProps {
    onSelect: (platform: Platform) => void;
}

const PlatformItem = ({ name, icon, color, onPress }: { name: string, icon: any, color: string, onPress: () => void }) => (
    <Pressable onPress={onPress} className="items-center justify-center m-3">
        <View style={{ backgroundColor: color }} className="w-16 h-16 rounded-full items-center justify-center mb-2 shadow-sm shadow-black/50">
            {icon}
        </View>
        <Text className="text-white font-medium text-xs">{name}</Text>
    </Pressable>
);

export const PlatformSelector = ({ onSelect }: PlatformSelectorProps) => {
    const colors = useThemeColors();

    return (
        <View className="flex-1 justify-center items-center px-6">
            <View className="items-center mb-12">
                {/* Logo Area */}
                <Text className="text-white text-3xl font-bold mb-8">reach974</Text>

                <Text className="text-white text-2xl font-bold mb-4 text-center leading-8">
                    Choose a platform to start growing your audience
                </Text>

                <Text className="text-gray-400 text-sm text-center px-4 leading-5">
                    Structured visibility campaigns designed for creators and businesses in Qatar.
                </Text>
            </View>

            <View className="flex-row flex-wrap justify-center gap-2 mb-12">
                <PlatformItem
                    name="Instagram"
                    color="#E1306C"
                    icon={<FontAwesome5 name="instagram" size={32} color="white" />}
                    onPress={() => onSelect('Instagram')}
                />
                <PlatformItem
                    name="TikTok"
                    color="#000000"
                    icon={<FontAwesome5 name="tiktok" size={28} color="white" />}
                    onPress={() => onSelect('TikTok')}
                />
                <PlatformItem
                    name="Facebook"
                    color="#1877F2"
                    icon={<FontAwesome5 name="facebook-f" size={32} color="white" />}
                    onPress={() => onSelect('Facebook')}
                />
                <PlatformItem
                    name="Google"
                    color="#4285F4"
                    icon={<FontAwesome5 name="google" size={28} color="white" />}
                    onPress={() => onSelect('Google')}
                />
                <PlatformItem
                    name="Snapchat"
                    color="#FFFC00"
                    icon={<FontAwesome5 name="snapchat-ghost" size={30} color="black" />}
                    onPress={() => onSelect('Snapchat')}
                />
            </View>

            <View className="absolute bottom-10 w-full items-center">
                <Text className="text-gray-600 text-xs">
                    No login required · No account access needed
                </Text>
            </View>
        </View>
    );
};
