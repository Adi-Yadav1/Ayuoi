import { getUserFoodHistory } from "@/app/services/foodRecognitionService";
import { FoodEntry } from "@/app/types";
import { Button, Card, Loader, Section } from "@/components/ui/Button";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FoodAnalysis = {
  foodDetected: string;
  nutrition: {
    servingEnergyKcal: number;
    servingProteinG: number;
    servingCarbsG: number;
    servingFatG: number;
  };
  doshaAnalysis: {
    isSuitable: boolean;
    impact: string;
    why: string;
  };
  healthImpact: {
    sleepEffect: string;
    stressEffect: string;
    activityImpact: string;
  };
  viruddhaAlert: {
    risk: boolean;
    reason: string;
  };
  ayurvedicRecommendation: string;
  bestTimeToConsume: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAF5",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
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
  analyzeCard: {
    marginBottom: 16,
  },
  analyzeLoadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  analyzeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "#EEE0FF",
    borderTopColor: "#EE9B4D",
  },
  imagePreview: {
    width: "100%",
    height: 256,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonGap: {
    gap: 12,
    marginBottom: 24,
  },
  recognizedFoodCard: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  foodHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  foodMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  foodCategory: {
    color: "#6B7280",
    fontSize: 14,
  },
  foodConfidence: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
  },
  nutritionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  nutritionTitle: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  nutritionLabel: {
    color: "#6B7280",
  },
  nutritionValue: {
    fontWeight: "600",
    color: "#111827",
  },
  doshaImpactContainer: {
    marginBottom: 16,
  },
  doshaImpactTitle: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  doshaImpactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  doshaImpactLabel: {
    textTransform: "capitalize",
    color: "#374151",
  },
  doshaImpactBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  doshaImpactBadgeText: {
    color: "#4F46E5",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  analysisText: {
    color: "#374151",
    fontSize: 12,
    marginTop: 6,
  },
  analysisSubtext: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },
  foodHistoryTitle: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  historyItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  historyItemName: {
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  historyItemCalories: {
    fontWeight: "600",
    color: "#EE9B4D",
  },
  historyTime: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
  historyCategory: {
    fontSize: 12,
    color: "#6B7280",
  },
  tipCard: {
    gap: 12,
  },
  tipCardItem: {
    flexDirection: "row",
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTitle: {
    fontWeight: "600",
    color: "#111827",
    fontSize: 14,
    marginBottom: 2,
  },
  tipDescription: {
    color: "#6B7280",
    fontSize: 12,
  },
});

export default function FoodTrackingScreen() {
  const [history, setHistory] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [recognizing, setRecognizing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recognizedFood, setRecognizedFood] = useState<FoodAnalysis | null>(
    null,
  );

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const hist = await getUserFoodHistory("user_1");
      setHistory(hist);
    } catch (error) {
      console.error("Error loading food history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        await recognizeFood(imageUri);
      }
    } catch (error) {
      alert("Error picking image");
    }
  };

  const handleCaptureImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        await recognizeFood(imageUri);
      }
    } catch (error) {
      alert("Error capturing image");
    }
  };

  const recognizeFood = async (imageUri: string) => {
    setRecognizing(true);
    try {
      const formData = new FormData();
      const fileName = imageUri.split("/").pop() || `food-${Date.now()}.jpg`;
      const isPng = fileName.toLowerCase().endsWith(".png");

      formData.append("file", {
        uri: imageUri,
        name: fileName,
        type: isPng ? "image/png" : "image/jpeg",
      } as any);

      const response = await fetch("http://54.226.87.3:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analyze failed: ${response.status}`);
      }

      const data = await response.json();
      const analysis: FoodAnalysis = {
        foodDetected: data.food_detected || "Unknown food",
        nutrition: {
          servingEnergyKcal: Number(data?.nutrition?.serving_energy_kcal ?? 0),
          servingProteinG: Number(data?.nutrition?.serving_protein_g ?? 0),
          servingCarbsG: Number(data?.nutrition?.serving_carbs_g ?? 0),
          servingFatG: Number(data?.nutrition?.serving_fat_g ?? 0),
        },
        doshaAnalysis: {
          isSuitable: Boolean(data?.dosha_analysis?.is_suitable),
          impact: data?.dosha_analysis?.impact || "",
          why: data?.dosha_analysis?.why || "",
        },
        healthImpact: {
          sleepEffect: data?.health_impact?.sleep_effect || "",
          stressEffect: data?.health_impact?.stress_effect || "",
          activityImpact: data?.health_impact?.activity_impact || "",
        },
        viruddhaAlert: {
          risk: Boolean(data?.viruddha_alert?.risk),
          reason: data?.viruddha_alert?.reason || "",
        },
        ayurvedicRecommendation: data?.ayurvedic_recommendation || "",
        bestTimeToConsume: data?.best_time_to_consume || "",
      };

      setRecognizedFood(analysis);
    } catch (error) {
      console.error("Analyze error:", error);
      Alert.alert("Error", "Failed to analyze the image. Please try again.");
    } finally {
      setRecognizing(false);
    }
  };

  if (loading && history.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Header */}
          <Text style={styles.title}>Food Tracking</Text>
          <Text style={styles.subtitle}>Capture and analyze your meals</Text>

          {/* Image Capture */}
          <Section title="Recognize Food">
            {selectedImage && recognizing ? (
              <Card style={styles.analyzeCard}>
                <View style={styles.analyzeLoadingContainer}>
                  <Text style={styles.analyzeText}>Analyzing...</Text>
                  <View style={styles.spinner} />
                </View>
              </Card>
            ) : selectedImage ? (
              <View style={{ marginBottom: 16 }}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.imagePreview}
                />
              </View>
            ) : null}

            <View style={styles.buttonGap}>
              <Button
                title="📷 Capture with Camera"
                onPress={handleCaptureImage}
                disabled={recognizing}
              />
              <Button
                title="🖼️ Choose from Library"
                variant="secondary"
                onPress={handlePickImage}
                disabled={recognizing}
              />
            </View>

            {recognizedFood && (
              <Card style={styles.recognizedFoodCard}>
                <View>
                  <View style={styles.foodHeader}>
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>
                        {recognizedFood.foodDetected}
                      </Text>
                      {recognizedFood.bestTimeToConsume ? (
                        <Text style={styles.foodCategory}>
                          Best time: {recognizedFood.bestTimeToConsume}
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  {/* Nutrition Facts */}
                  <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Nutrition Facts</Text>
                    <View>
                      <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Calories</Text>
                        <Text style={styles.nutritionValue}>
                          {Math.round(
                            recognizedFood.nutrition.servingEnergyKcal,
                          )}{" "}
                          kcal
                        </Text>
                      </View>
                      <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Protein</Text>
                        <Text style={styles.nutritionValue}>
                          {recognizedFood.nutrition.servingProteinG.toFixed(1)}g
                        </Text>
                      </View>
                      <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Carbs</Text>
                        <Text style={styles.nutritionValue}>
                          {recognizedFood.nutrition.servingCarbsG.toFixed(1)}g
                        </Text>
                      </View>
                      <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Fat</Text>
                        <Text style={styles.nutritionValue}>
                          {recognizedFood.nutrition.servingFatG.toFixed(1)}g
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Dosha Analysis */}
                  <View style={styles.doshaImpactContainer}>
                    <Text style={styles.doshaImpactTitle}>Dosha Analysis</Text>
                    <View style={styles.doshaImpactRow}>
                      <Text style={styles.doshaImpactLabel}>Suitable</Text>
                      <View style={styles.doshaImpactBadge}>
                        <Text style={styles.doshaImpactBadgeText}>
                          {recognizedFood.doshaAnalysis.isSuitable
                            ? "Yes"
                            : "No"}
                        </Text>
                      </View>
                    </View>
                    {recognizedFood.doshaAnalysis.impact ? (
                      <Text style={styles.analysisText}>
                        {recognizedFood.doshaAnalysis.impact}
                      </Text>
                    ) : null}
                    {recognizedFood.doshaAnalysis.why ? (
                      <Text style={styles.analysisSubtext}>
                        {recognizedFood.doshaAnalysis.why}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.doshaImpactContainer}>
                    <Text style={styles.doshaImpactTitle}>Health Impact</Text>
                    {recognizedFood.healthImpact.sleepEffect ? (
                      <Text style={styles.analysisText}>
                        Sleep: {recognizedFood.healthImpact.sleepEffect}
                      </Text>
                    ) : null}
                    {recognizedFood.healthImpact.stressEffect ? (
                      <Text style={styles.analysisText}>
                        Stress: {recognizedFood.healthImpact.stressEffect}
                      </Text>
                    ) : null}
                    {recognizedFood.healthImpact.activityImpact ? (
                      <Text style={styles.analysisText}>
                        Activity: {recognizedFood.healthImpact.activityImpact}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.doshaImpactContainer}>
                    <Text style={styles.doshaImpactTitle}>Viruddha Alert</Text>
                    <View style={styles.doshaImpactRow}>
                      <Text style={styles.doshaImpactLabel}>Risk</Text>
                      <View style={styles.doshaImpactBadge}>
                        <Text style={styles.doshaImpactBadgeText}>
                          {recognizedFood.viruddhaAlert.risk ? "Yes" : "No"}
                        </Text>
                      </View>
                    </View>
                    {recognizedFood.viruddhaAlert.reason ? (
                      <Text style={styles.analysisSubtext}>
                        {recognizedFood.viruddhaAlert.reason}
                      </Text>
                    ) : null}
                  </View>

                  {recognizedFood.ayurvedicRecommendation ? (
                    <View style={styles.doshaImpactContainer}>
                      <Text style={styles.doshaImpactTitle}>
                        Recommendation
                      </Text>
                      <Text style={styles.analysisText}>
                        {recognizedFood.ayurvedicRecommendation}
                      </Text>
                    </View>
                  ) : null}
                  <Button
                    title="✅ Log This Food"
                    onPress={() => {
                      alert("Food logged successfully!");
                      setSelectedImage(null);
                      setRecognizedFood(null);
                      loadHistory();
                    }}
                  />
                </View>
              </Card>
            )}
          </Section>

          {/* Today's Intake */}
          {history.length > 0 && (
            <Section title="Today's Intake">
              <Card>
                <View>
                  {history.slice(0, 3).map((entry) => (
                    <View key={entry.id} style={styles.historyItem}>
                      <View style={styles.historyItemRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.historyItemName}>
                            {entry.food.name}
                          </Text>
                          <Text style={styles.historyTime}>
                            {new Date(entry.timestamp).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </Text>
                        </View>
                        <Text style={styles.historyItemCalories}>
                          {entry.food.calories} kcal
                        </Text>
                      </View>
                      <Text style={styles.historyCategory}>
                        {entry.food.category}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            </Section>
          )}

          {/* Eating Tips */}
          <Section title="Eating Tips">
            <View style={styles.tipCard}>
              <Card>
                <View style={styles.tipCardItem}>
                  <Text style={styles.tipEmoji}>🍽️</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tipTitle}>Portion Control</Text>
                    <Text style={styles.tipDescription}>
                      Eat until 3/4 full to aid digestion according to Ayurveda
                    </Text>
                  </View>
                </View>
              </Card>

              <Card>
                <View style={styles.tipCardItem}>
                  <Text style={styles.tipEmoji}>🕐</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tipTitle}>Best Time to Eat</Text>
                    <Text style={styles.tipDescription}>
                      Lunch should be your largest meal when digestion is
                      strongest (noon-1 PM)
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
