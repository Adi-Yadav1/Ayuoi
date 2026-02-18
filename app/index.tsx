import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-gradient-to-br from-primary-50 to-primary-100 justify-center items-center">
      <View className="items-center">
        {/* Logo/Icon */}
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-8 shadow-lg">
          <Text className="text-5xl">🌿</Text>
        </View>
        
        <Text className="text-4xl font-bold text-primary-900 text-center">
          Veda
        </Text>
        
        <Text className="text-xl text-primary-700 text-center mt-4">
          Ayurvedic Diet Assistant
        </Text>
        
        <Text className="text-sm text-primary-600 text-center mt-8 px-8">
          Personalized wellness through ancient wisdom
        </Text>

        {/* Loading indicator */}
        <View className="mt-16 items-center">
          <View className="w-2 h-2 bg-primary-500 rounded-full mb-2 animate-pulse" />
          <Text className="text-primary-600 text-sm">Loading...</Text>
        </View>
      </View>
    </View>
  );
}
