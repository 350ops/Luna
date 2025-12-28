import { View } from "react-native";
import ThemedText from "./ThemedText";

// Web fallback that avoids the native Lottie dependency
export const Sphere = () => (
  <View className="flex-1 items-center justify-center p-6">
    <View className="w-[140px] h-[140px] rounded-full bg-light-secondary dark:bg-dark-primary items-center justify-center">
      <ThemedText className="text-center text-light-subtext dark:text-dark-subtext">
        Animation available on mobile
      </ThemedText>
    </View>
  </View>
);

