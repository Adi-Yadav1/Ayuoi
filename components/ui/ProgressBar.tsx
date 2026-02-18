import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%' as any,
    borderRadius: 4,
  },
});

interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'primary' | 'vata' | 'pitta' | 'kapha' | 'success' | 'warning' | 'danger';
  height?: number;
}

const colorMap = {
  primary: '#EE9B4D',
  vata: '#A0AEC0',
  pitta: '#FF9F43',
  kapha: '#48BB78',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'primary',
  height = 8,
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const containerStyle: ViewStyle = { ...styles.container, height };
  const fillStyle: ViewStyle = {
    ...styles.fill,
    width: `${normalizedProgress}%` as any,
    backgroundColor: colorMap[color],
  };

  return (
    <View style={containerStyle}>
      <View style={fillStyle} />
    </View>
  );
};
