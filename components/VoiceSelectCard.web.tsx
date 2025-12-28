import { View, Text, Pressable, Dimensions } from "react-native";
import { shadowPresets } from "@/utils/useShadow";
import Icon from "./Icon";
import useThemeColors from "@/app/contexts/ThemeColors";

interface VoiceItemProps {
  name: string;
  description: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
  isPlaying?: boolean;
  onPreviewStart?: () => void;
  onPreviewStop?: () => void;
}

// Web fallback that avoids lottie-react-native while keeping the same API
export const VoiceSelectCard = (props: VoiceItemProps) => {
  const windowWidth = Dimensions.get("window").width;
  const colors = useThemeColors();

  const handleTogglePlay = () => {
    if (props.isPlaying) {
      props.onPreviewStop?.();
    } else {
      props.onPreviewStart?.();
    }
  };

  return (
    <View
      style={{ width: windowWidth / 2 - 30, ...shadowPresets.card, borderRadius: 20 }}
      className="relative p-1.5 mx-1.5 mb-3 bg-light-secondary dark:bg-dark-secondary"
    >
      <Pressable
        onPress={() => {
          handleTogglePlay();
          props.onSelect(props.name);
        }}
        className="w-full relative z-50 flex flex-col items-start rounded-2xl"
      >
        <View className="p-global items-start">
          <Icon name={props.isPlaying ? "Pause" : "Play"} fill={colors.icon} size={20} />
          <Text className="text-lg font-outfit-bold text-white mt-16">{props.name}</Text>
          <Text className="text-xs opacity-60 text-white -mt-px">{props.description}</Text>
        </View>
      </Pressable>
    </View>
  );
};

