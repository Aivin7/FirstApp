import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
  overlay?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  text = '加载中...',
  size = 'large',
  overlay = true,
}) => {
  return (
    <View
      style={[
        styles.container,
        overlay && styles.overlay,
      ]}
    >
      <ActivityIndicator
        size={size}
        color={Colors.primary}
      />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 100,
  },
  text: {
    marginTop: 10,
    color: Colors.dark,
    fontSize: 16,
  },
});

export default Loading;