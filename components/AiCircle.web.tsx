import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "./Icon";
import { shadowPresets } from "@/utils/useShadow";

// Web-friendly version without lottie-react-native
export const AiCircle = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <View className="flex-1 items-center justify-center">
      <View className="relative w-[250px] h-[250px] items-center justify-center">
        <View
          style={shadowPresets.large}
          className="w-[140px] h-[140px] rounded-full bg-light-secondary dark:bg-dark-primary items-center justify-center"
        >
          <LinearGradient
            colors={["#D883E4", "#016BF0", "#3DE3E0", "#E57DDF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="w-[140px] h-[140px] rounded-full items-center justify-center"
            style={{ ...shadowPresets.large }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsSpeaking((prev) => !prev)}
              className="w-[120px] h-[120px] rounded-full bg-light-secondary dark:bg-dark-primary items-center justify-center"
            >
              <Icon name={isSpeaking ? "Pause" : "Mic"} size={34} strokeWidth={1.2} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

