import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="health-profile" />
      <Stack.Screen name="prakriti-assessment" />
      <Stack.Screen name="prakriti-result" />
      <Stack.Screen name="meal-plan-setup" />
    </Stack>
  );
}
