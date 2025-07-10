/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#007AFF',       // 主色调：蓝色
    secondary: '#FF9500',     // 辅助色：橙色
    success: '#4CD964',       // 成功色：绿色
    danger: '#FF3B30',        // 危险色：红色
    warning: '#FFCC00',       // 警告色：黄色
    info: '#5AC8FA',          // 信息色：浅蓝色
    light: '#F7F7F7',         // 浅色背景
    dark: '#2C2C2E',          // 深色文本
    muted: '#8E8E93',         // 次要文本
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
export default {
  primary: '#e91e63',
  secondary: '#9c27b0',
  accent: '#ffeb3b',
  dark: '#212121',
  light: '#f5f5f5',
};