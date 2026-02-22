import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for the lotus
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      router.replace("/(auth)");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#FFF7EC", "#FEFAF5", "#F0E6D2"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Lotus Symbol with Om */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
            },
          ]}
        >
          {/* Outer circle with gradient */}
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text style={styles.lotusEmoji}>🪷</Text>
            </View>
          </View>

          {/* Om symbol overlay */}
          <View style={styles.omContainer}>
            <Text style={styles.omSymbol}>ॐ</Text>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          Veda
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          Ayurvedic Diet Assistant
        </Animated.Text>

        {/* Sanskrit-inspired divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerSymbol}>✦</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Dosha elements */}
        <View style={styles.doshaContainer}>
          <View style={styles.doshaItem}>
            <Text style={styles.doshaEmoji}>🔥</Text>
            <Text style={styles.doshaText}>Pitta</Text>
          </View>
          <View style={styles.doshaItem}>
            <Text style={styles.doshaEmoji}>💨</Text>
            <Text style={styles.doshaText}>Vata</Text>
          </View>
          <View style={styles.doshaItem}>
            <Text style={styles.doshaEmoji}>🌊</Text>
            <Text style={styles.doshaText}>Kapha</Text>
          </View>
        </View>

        {/* Wisdom quote */}
        <Animated.Text
          style={[
            styles.quote,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          "When diet is wrong, medicine is of no use.{"\n"}When diet is correct,
          medicine is of no need."
        </Animated.Text>

        {/* Loading indicator */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </Animated.View>
      </Animated.View>

      {/* Decorative leaves */}
      <Text style={styles.leafTopLeft}>🌿</Text>
      <Text style={styles.leafTopRight}>🍃</Text>
      <Text style={styles.leafBottomLeft}>🌾</Text>
      <Text style={styles.leafBottomRight}>🌿</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 32,
    position: "relative",
  },
  outerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8B7355",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 3,
    borderColor: "#D4AF37",
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF7EC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#EE9B4D",
  },
  lotusEmoji: {
    fontSize: 64,
  },
  omContainer: {
    position: "absolute",
    bottom: -15,
    backgroundColor: "#8B4513",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
  omSymbol: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  appName: {
    fontSize: 48,
    fontWeight: "800",
    color: "#8B4513",
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 2,
    textShadowColor: "rgba(139, 69, 19, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 18,
    color: "#6B5E4B",
    marginBottom: 24,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: width * 0.6,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D4AF37",
  },
  dividerSymbol: {
    marginHorizontal: 12,
    fontSize: 16,
    color: "#D4AF37",
  },
  doshaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.7,
    marginVertical: 20,
  },
  doshaItem: {
    alignItems: "center",
  },
  doshaEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  doshaText: {
    fontSize: 13,
    color: "#8B4513",
    fontWeight: "600",
  },
  quote: {
    fontSize: 13,
    color: "#6B5E4B",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    marginTop: 20,
  },
  loadingDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EE9B4D",
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  // Decorative leaves
  leafTopLeft: {
    position: "absolute",
    top: 60,
    left: 30,
    fontSize: 32,
    opacity: 0.3,
    transform: [{ rotate: "-15deg" }],
  },
  leafTopRight: {
    position: "absolute",
    top: 80,
    right: 40,
    fontSize: 28,
    opacity: 0.3,
    transform: [{ rotate: "25deg" }],
  },
  leafBottomLeft: {
    position: "absolute",
    bottom: 100,
    left: 40,
    fontSize: 30,
    opacity: 0.3,
    transform: [{ rotate: "15deg" }],
  },
  leafBottomRight: {
    position: "absolute",
    bottom: 80,
    right: 30,
    fontSize: 32,
    opacity: 0.3,
    transform: [{ rotate: "-20deg" }],
  },
});
