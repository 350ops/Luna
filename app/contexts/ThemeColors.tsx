import { useTheme } from './ThemeContext';

export const useThemeColors = () => {
  const { isDark } = useTheme();

  return {
    icon: isDark ? 'white' : 'black',
    bg: '#000000', // Pitch black for reach974
    invert: '#ffffff',
    secondary: '#1A1A1A', // Dark gray for secondary elements
    state: 'rgba(255, 255, 255, 0.3)',
    sheet: '#111111',
    highlight: '#0000FF', // Neon Blue
    lightDark: '#111111',
    border: '#333333',
    text: 'white',
    placeholder: 'rgba(255,255,255,0.4)',
    switch: 'rgba(255,255,255,0.4)',
    chatBg: '#111111',
    isDark: true // Force dark mode for now logic-wise, though this prop comes from context
  };
};

export default useThemeColors;