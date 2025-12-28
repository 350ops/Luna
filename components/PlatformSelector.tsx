import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useThemeColors } from '@/app/contexts/ThemeColors';
import { FontAwesome5 } from '@expo/vector-icons';

export type Platform = 'Instagram' | 'TikTok' | 'Google' | 'Snapchat' | 'Facebook';

interface PlatformSelectorProps {
    onSelect: (platform: Platform) => void;
}

const PlatformItem = ({ name, icon, color, onPress }: { name: string, icon: any, color: string, onPress: () => void }) => (
    <Pressable onPress={onPress} className="items-center justify-center m-5">
        <View style={{ backgroundColor: color }} className="w-14 h-14 rounded-full items-center justify-center mb-3 shadow-sm shadow-black/50 opacity-90">
            {icon}
        </View>
        <Text className="text-gray-400 font-medium text-[10px] tracking-widest uppercase">{name}</Text>
    </Pressable>
);

export const PlatformSelector = ({ onSelect }: PlatformSelectorProps) => {
    const colors = useThemeColors();

    return (
        <View className="flex-1 justify-center items-center px-6">
            <View className="items-center mb-16">
                {/* Logo Area */}
                <Text className="text-white text-lg font-bold mb-12 opacity-50 tracking-widest">REACH974</Text>

                <Text className="text-white text-xl font-medium mb-6 text-center leading-8">
                    Choose a platform to start growing your audience
                </Text>

                <Text className="text-gray-500 text-xs text-center px-8 leading-5 max-w-xs">
                    Structured visibility campaigns designed for creators and businesses in Qatar.
                </Text>
            </View>

            <View className="flex-row flex-wrap justify-center gap-4 mb-16">
                <PlatformItem
                    name="Instagram"
                    color="#E1306C"
                    icon={<FontAwesome5 name="instagram" size={28} color="white" />}
                    onPress={() => onSelect('Instagram')}
                />
                <PlatformItem
                    name="TikTok"
                    color="#111111"
                    icon={<FontAwesome5 name="tiktok" size={24} color="white" />}
                    onPress={() => onSelect('TikTok')}
                />
                <PlatformItem
                    name="Facebook"
                    color="#1877F2"
                    icon={<FontAwesome5 name="facebook-f" size={28} color="white" />}
                    onPress={() => onSelect('Facebook')}
                />
                <PlatformItem
                    name="Google"
                    color="#4285F4"
                    icon={<FontAwesome5 name="google" size={24} color="white" />}
                    onPress={() => onSelect('Google')}
                />
                <PlatformItem
                    name="Snapchat"
                    color="#FFFC00"
                    icon={<FontAwesome5 name="snapchat-ghost" size={26} color="black" />}
                    onPress={() => onSelect('Snapchat')}
                />
            </View>

            <View className="absolute bottom-12 w-full items-center">
                <Text className="text-gray-700 text-[10px] tracking-wide">
                    NO LOGIN REQUIRED · NO ACCOUNT ACCESS NEEDED
                </Text>
            </View>
        </View>
    );
};
