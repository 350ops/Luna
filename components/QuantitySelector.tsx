import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { useThemeColors } from '@/app/contexts/ThemeColors';
import { Platform } from './PlatformSelector';

interface QuantitySelectorProps {
    platform: Platform;
    onConfirm: (quantity: number, price: number) => void;
}

export const QuantitySelector = ({ platform, onConfirm }: QuantitySelectorProps) => {
    const colors = useThemeColors();
    const [quantity, setQuantity] = useState(1000); // Default 1k

    // Pricing logic (Mock)
    // Instagram: 120 QAR per 1k ?
    const getPricePer1k = (p: Platform) => {
        switch (p) {
            case 'Instagram': return 120;
            case 'TikTok': return 100;
            case 'Google': return 150;
            case 'Snapchat': return 130;
            default: return 100;
        }
    }

    const price = Math.round((quantity / 1000) * getPricePer1k(platform));

    return (
        <View style={{ backgroundColor: '#1A1A1A', borderColor: '#333' }} className="rounded-2xl p-6 border w-full max-w-sm mb-4">
            <Text className="text-white text-xl font-bold mb-1">Choose Quantity</Text>
            <Text className="text-gray-400 text-sm mb-8">Slide to select your follower count</Text>

            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-400">Followers</Text>
                <Text className="text-white text-2xl font-bold">
                    {quantity >= 1000 ? `${(quantity / 1000).toFixed(1)}K` : quantity}
                </Text>
            </View>

            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={10000}
                step={100}
                value={quantity}
                onValueChange={setQuantity}
                minimumTrackTintColor="white"
                maximumTrackTintColor="#333"
                thumbTintColor="white"
            />

            <View className="flex-row justify-between mt-2 mb-8">
                <Text className="text-gray-500 text-xs">0</Text>
                <Text className="text-gray-500 text-xs">10K</Text>
            </View>

            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-gray-400">Total Price</Text>
                <View className="flex-row items-baseline">
                    <Text className="text-blue-500 text-2xl font-bold mr-1">{price}</Text>
                    <Text className="text-blue-500 text-xl font-bold">QAR</Text>
                </View>
            </View>

            <Pressable
                onPress={() => onConfirm(quantity, price)}
                style={{ backgroundColor: colors.highlight }}
                className="w-full py-4 rounded-xl items-center"
            >
                <Text className="text-white font-bold text-base uppercase">
                    SELECT {(quantity / 1000).toFixed(1)}K FOLLOWERS
                </Text>
            </Pressable>
        </View>
    );
};
