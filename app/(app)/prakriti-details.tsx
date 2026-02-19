import { useAuth } from "@/app/context/AuthContext";
import { getPrakritiResultAsync } from "@/app/services/prakritiService";
import { PrakritiResult } from "@/app/types";
import {
    Button,
    Card,
    DoshaCard,
    Loader,
    Section,
} from "@/components/ui/Button";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAF5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 24,
    color: "#EE9B4D",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 32,
    fontSize: 16,
  },
  doshaCardsRow: {
    marginBottom: 32,
    flexDirection: "row",
    gap: 8,
  },
  primaryDoshaCard: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  primaryDoshaCenterContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  doshaEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  primaryDoshaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  secondaryDoshaText: {
    color: "#6B7280",
    textAlign: "center",
  },
  characteristicBullet: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    flexDirection: "row",
  },
  bulletPoint: {
    color: "#EE9B4D",
    fontWeight: "bold",
    marginRight: 12,
  },
  characteristicText: {
    flex: 1,
    color: "#1A202C",
  },
  checkmark: {
    color: "#10B981",
    fontWeight: "bold",
    marginRight: 12,
  },
  habitText: {
    flex: 1,
    color: "#1A202C",
  },
  recommendationContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    flexDirection: "row",
  },
  recommendationBadge: {
    backgroundColor: "#EE9B4D",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 4,
  },
  recommendationBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendationText: {
    flex: 1,
    color: "#1A202C",
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginTop: 16,
    marginBottom: 32,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoTitle: {
    color: "#1E3A8A",
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    color: "#1E40AF",
    fontSize: 12,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default function PrakritiDetailsScreen() {
  const { user } = useAuth();
  const [result, setResult] = useState<PrakritiResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPrakritiData();
    }
  }, [user]);

  const loadPrakritiData = async () => {
    try {
      setLoading(true);
      const data = await getPrakritiResultAsync(user?.id || "user_1");
      if (data) {
        setResult(data);
      } else {
        setError(
          "No Prakriti assessment found. Please complete the assessment first.",
        );
      }
    } catch (err) {
      console.error("Error loading Prakriti data:", err);
      setError("Failed to load Prakriti data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prakriti Details</Text>
        </View>
        <Loader />
      </SafeAreaView>
    );
  }

  if (error || !result) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prakriti Details</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || "No data available"}</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prakriti Details</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Header */}
          <Text style={styles.title}>Your Prakriti</Text>
          <Text style={styles.subtitle}>
            Your unique Ayurvedic body constitution
          </Text>

          {/* Dosha Scores */}
          <View style={styles.doshaCardsRow}>
            <DoshaCard
              dosha="vata"
              score={result.scores.vata}
              title="Vata"
              description="Space & Air"
            />
            <DoshaCard
              dosha="pitta"
              score={result.scores.pitta}
              title="Pitta"
              description="Fire & Water"
            />
            <DoshaCard
              dosha="kapha"
              score={result.scores.kapha}
              title="Kapha"
              description="Water & Earth"
            />
          </View>

          {/* Primary Constitution */}
          <Section title="Your Primary Dosha">
            <Card style={styles.primaryDoshaCard}>
              <View style={styles.primaryDoshaCenterContainer}>
                <Text style={styles.doshaEmoji}>
                  {result.primaryDosha === "vata" && "💨"}
                  {result.primaryDosha === "pitta" && "🔥"}
                  {result.primaryDosha === "kapha" && "💧"}
                </Text>
                <Text style={styles.primaryDoshaTitle}>
                  {result.primaryDosha.charAt(0).toUpperCase() +
                    result.primaryDosha.slice(1)}{" "}
                  Prakriti
                </Text>
                <Text style={styles.secondaryDoshaText}>
                  Secondary: {result.secondaryDosha}
                </Text>
              </View>
            </Card>
          </Section>

          {/* Characteristics */}
          {result.characteristics && result.characteristics.length > 0 && (
            <Section title="Your Characteristics">
              <Card>
                {result.characteristics.map((char, idx) => (
                  <View key={idx} style={styles.characteristicBullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.characteristicText}>{char}</Text>
                  </View>
                ))}
              </Card>
            </Section>
          )}

          {/* Feeding Habits */}
          {result.feedingHabits && result.feedingHabits.length > 0 && (
            <Section title="Recommended Feeding Habits">
              <Card>
                {result.feedingHabits.map((habit, idx) => (
                  <View key={idx} style={styles.characteristicBullet}>
                    <Text style={styles.checkmark}>✓</Text>
                    <Text style={styles.habitText}>{habit}</Text>
                  </View>
                ))}
              </Card>
            </Section>
          )}

          {/* Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (
            <Section title="Key Recommendations">
              <Card>
                {result.recommendations.map((rec, idx) => (
                  <View key={idx} style={styles.recommendationContainer}>
                    <View style={styles.recommendationBadge}>
                      <Text style={styles.recommendationBadgeText}>
                        {idx + 1}
                      </Text>
                    </View>
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </Card>
            </Section>
          )}

          {/* Info Card */}
          <Card style={styles.infoCard}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>About Your Prakriti</Text>
                <Text style={styles.infoText}>
                  Your Prakriti remains constant throughout life. Understanding
                  it helps you maintain balance and prevent disease through
                  proper diet, lifestyle, and seasonal adjustments.
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
