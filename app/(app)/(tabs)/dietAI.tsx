import { useAuth } from "@/app/context/AuthContext";
import { apiClient } from "@/app/services/apiClient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  time: string;
};

const SUGGESTED_PROMPTS = [
  "Build a 7-day meal plan",
  "Low sugar dinner ideas",
  "Morning routine for digestion",
  "Foods for seasonal balance",
];

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Hello. I can help with personalized diet suggestions, meal timing, and routines. Ask me anything.",
    time: "09:12",
  },
];

const fontFamily = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia",
});

export default function DietAI() {
  const { token } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [isSending, setIsSending] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e: { endCoordinates: { height: number } }) => {
        Animated.timing(keyboardHeight, {
          toValue: e.endCoordinates.height,
          duration: Platform.OS === "ios" ? 250 : 200,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: Platform.OS === "ios" ? 250 : 200,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [keyboardHeight]);

  const getTimeStamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const sendToApi = async (message: string) => {
    if (!token) {
      Alert.alert(
        "Login Required",
        "Please log in to use Diet AI recommendations.",
      );
      return "Please log in to continue. Once signed in, I can help with diet recommendations.";
    }

    const dosha = "vata";
    return await apiClient.chatbotChat(dosha, message);
  };

  const handleSend = async (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
      time: getTimeStamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const reply = await sendToApi(trimmed);
      const assistantMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: reply,
        time: getTimeStamp(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot request failed:", error);
      const assistantMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: "Sorry, I couldn't reach the chatbot. Please try again in a moment.",
        time: getTimeStamp(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    handleSend(prompt);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.backgroundGlowA} />
      <View style={styles.backgroundGlowB} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diet AI</Text>
        <Text style={styles.headerSubtitle}>
          Ask about meals, routines, and balanced choices
        </Text>
      </View>

      <Animated.View style={[styles.heroCard, { opacity: fadeAnim }]}>
        <Text style={styles.heroTitle}>Today&apos;s Focus</Text>
        <Text style={styles.heroBody}>
          Keep meals warm, lightly spiced, and easy to digest. Prioritize cooked
          vegetables and moderate grains.
        </Text>
        <View style={styles.heroMetaRow}>
          <View style={styles.heroPill}>
            <Text style={styles.heroPillText}>Balance</Text>
          </View>
          <View style={styles.heroPillAlt}>
            <Text style={styles.heroPillTextAlt}>Hydration</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.chipsRow}>
        {SUGGESTED_PROMPTS.map((prompt) => (
          <TouchableOpacity
            key={prompt}
            style={styles.chip}
            activeOpacity={0.8}
            onPress={() => handleQuickPrompt(prompt)}
          >
            <Text style={styles.chipText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={({ item }) => (
          <View
            style={
              item.role === "assistant"
                ? styles.messageRowAssistant
                : styles.messageRowUser
            }
          >
            <View
              style={
                item.role === "assistant"
                  ? styles.avatarAssistant
                  : styles.avatarUser
              }
            >
              <Text
                style={
                  item.role === "assistant"
                    ? styles.avatarTextAssistant
                    : styles.avatarTextUser
                }
              >
                {item.role === "assistant" ? "A" : "U"}
              </Text>
            </View>
            <View
              style={
                item.role === "assistant"
                  ? styles.bubbleAssistant
                  : styles.bubbleUser
              }
            >
              <Text
                style={
                  item.role === "assistant"
                    ? styles.bubbleTextAssistant
                    : styles.bubbleTextUser
                }
              >
                {item.text}
              </Text>
              <Text
                style={
                  item.role === "assistant"
                    ? styles.timeAssistant
                    : styles.timeUser
                }
              >
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />

      <Animated.View style={[styles.inputBar, { bottom: keyboardHeight }]}>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Type your question"
            placeholderTextColor="#8B7E6B"
            style={styles.input}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
          />
        </View>
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!input.trim() || isSending) && styles.sendButtonDisabled,
          ]}
          activeOpacity={0.85}
          onPress={() => handleSend()}
          disabled={!input.trim() || isSending}
        >
          <Text style={styles.sendButtonText}>
            {isSending ? "Sending" : "Send"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7EC",
    paddingTop: 8,
  },
  backgroundGlowA: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#FFD7B3",
    top: -120,
    right: -120,
    opacity: 0.6,
  },
  backgroundGlowB: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#DFF5E1",
    bottom: -100,
    left: -80,
    opacity: 0.6,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    color: "#2E2A24",
    fontFamily,
    fontWeight: "700",
  },
  headerSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B5E4B",
    fontFamily,
  },
  heroCard: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFF0DE",
    borderWidth: 1,
    borderColor: "#F2D2B5",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroTitle: {
    fontSize: 16,
    fontFamily,
    color: "#2E2A24",
    fontWeight: "700",
  },
  heroBody: {
    marginTop: 8,
    fontSize: 14,
    color: "#5F5344",
    lineHeight: 20,
    fontFamily,
  },
  heroMetaRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  heroPill: {
    backgroundColor: "#FFEDD5",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  heroPillText: {
    fontSize: 12,
    color: "#7A3E00",
    fontWeight: "600",
  },
  heroPillAlt: {
    backgroundColor: "#E6F6EA",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroPillTextAlt: {
    fontSize: 12,
    color: "#1F5E3C",
    fontWeight: "600",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#E3C7A6",
    backgroundColor: "#FFF6EA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 12,
    color: "#6B563C",
    fontWeight: "600",
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 90,
  },
  messageRowAssistant: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-end",
  },
  messageRowUser: {
    flexDirection: "row-reverse",
    marginBottom: 14,
    alignItems: "flex-end",
  },
  avatarAssistant: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFE0C2",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarUser: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#D8F2DE",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTextAssistant: {
    color: "#8A4B12",
    fontWeight: "700",
    fontSize: 13,
  },
  avatarTextUser: {
    color: "#1E5A3D",
    fontWeight: "700",
    fontSize: 13,
  },
  bubbleAssistant: {
    marginLeft: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1D9C4",
    maxWidth: "76%",
  },
  bubbleUser: {
    marginRight: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#F0FAF2",
    borderWidth: 1,
    borderColor: "#CFE9D6",
    maxWidth: "76%",
  },
  bubbleTextAssistant: {
    color: "#2F2A23",
    fontSize: 14,
    lineHeight: 20,
    fontFamily,
  },
  bubbleTextUser: {
    color: "#20382B",
    fontSize: 14,
    lineHeight: 20,
    fontFamily,
  },
  timeAssistant: {
    marginTop: 6,
    fontSize: 11,
    color: "#8A7B6A",
  },
  timeUser: {
    marginTop: 6,
    fontSize: 11,
    color: "#6E8677",
    textAlign: "right",
  },
  inputBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF1E1",
    borderTopWidth: 1,
    borderTopColor: "#F0D8C0",
  },
  inputWrap: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E6CCB5",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    fontSize: 14,
    color: "#2F2A23",
    fontFamily,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#E58B3A",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: "#FFF7ED",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
