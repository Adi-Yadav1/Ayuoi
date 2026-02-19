import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StatusBar as RNStatusBar, View } from "react-native";
import "react-native-reanimated";

import { AppProvider } from "@/app/context/AppContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(auth)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <View
            style={{
              flex: 1,
              paddingTop:
                Platform.OS === "android"
                  ? (RNStatusBar.currentHeight ?? 0)
                  : 0,
            }}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="index" />
              <Stack.Screen
                name="(app)"
                options={{ animationTypeForReplace: "pop" }}
              />
            </Stack>
          </View>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </AppProvider>
  );
}
