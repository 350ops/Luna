import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';
import { useThemeColors } from '@/app/contexts/ThemeColors';

// SVG Icons (Simplified for now, ideally we'd use proper SVG files or an icon set)
// Using colorful circles as placeholders for brand colors if actual svgs are complex to inline here without proper paths.
// But I will try to use lucide icons where possible or simple colored visual indicators.
// Actually, for "Instagram", "TikTok", etc., Lucide might not have them all. 
// I'll use FontAwesome via @expo/vector-icons or just colored placeholders for the MVP.
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


export type Platform = 'Instagram' | 'TikTok' | 'Google' | 'Snapchat';

interface PlatformSelectorProps {
    onSelect: (platform: Platform) => void;
}

const PlatformItem = ({ name, icon, color, onPress }: { name: string, icon: any, color: string, onPress: () => void }) => (
    <Pressable onPress={onPress} className="items-center justify-center m-4">
        <View style={{ backgroundColor: color }} className="w-16 h-16 rounded-full items-center justify-center mb-2 shadow-lg shadow-black/50">
            {icon}
        </View>
        <Text className="text-white font-medium text-xs">{name}</Text>
    </Pressable>
);

export const PlatformSelector = ({ onSelect }: PlatformSelectorProps) => {
    const colors = useThemeColors();

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-white text-3xl font-bold mb-2">reach974</Text>

            <Text className="text-white text-4xl font-bold mb-2 text-center">
                Visibility. <Text style={{ color: colors.placeholder }}>Awareness.</Text>
            </Text>
            <Text className="text-white text-4xl font-bold mb-8 text-center">
                Growth. <Text style={{ color: colors.highlight }}>REACH.</Text>
            </Text>

            <Text className="text-gray-400 text-sm mb-12 text-center px-8">
                Designed for creators and businesses looking to grow their social audience through controlled visibility.
            </Text>

            <View className="flex-row flex-wrap justify-center gap-4">
                <PlatformItem
                    name="Instagram"
                    color="#E1306C"
                    icon={<FontAwesome5 name="instagram" size={32} color="white" />}
                    onPress={() => onSelect('Instagram')}
                />
                <PlatformItem
                    name="TikTok"
                    color="#000000" // TikTok uses black/cyan/magenta usually, pure black circle with white icon works
                    icon={<FontAwesome5 name="tiktok" size={28} color="white" />}
                    onPress={() => onSelect('TikTok')}
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
        </View>
    );
};
