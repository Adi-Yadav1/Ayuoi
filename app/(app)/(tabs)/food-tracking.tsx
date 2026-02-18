import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { recognizeFoodFromImage, getUserFoodHistory } from '@/app/services/foodRecognitionService';
import { Card, Section, Button, Loader } from '@/components/ui/Button';
import { FoodEntry, RecognizedFood, DoeshaType } from '@/app/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
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
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 32,
    fontSize: 16,
  },
  analyzeCard: {
    marginBottom: 16,
  },
  analyzeLoadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  analyzeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#EEE0FF',
    borderTopColor: '#EE9B4D',
  },
  imagePreview: {
    width: '100%',
    height: 256,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonGap: {
    gap: 12,
    marginBottom: 24,
  },
  recognizedFoodCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  foodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  foodCategory: {
    color: '#6B7280',
    fontSize: 14,
  },
  foodConfidence: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  nutritionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  nutritionTitle: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  nutritionLabel: {
    color: '#6B7280',
  },
  nutritionValue: {
    fontWeight: '600',
    color: '#111827',
  },
  doshaImpactContainer: {
    marginBottom: 16,
  },
  doshaImpactTitle: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  doshaImpactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  doshaImpactLabel: {
    textTransform: 'capitalize',
    color: '#374151',
  },
  doshaImpactBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  doshaImpactBadgeText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  foodHistoryTitle: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  historyItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  historyItemName: {
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  historyItemCalories: {
    fontWeight: '600',
    color: '#EE9B4D',
  },
  historyTime: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  historyCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  tipCard: {
    gap: 12,
  },
  tipCardItem: {
    flexDirection: 'row',
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTitle: {
    fontWeight: '600',
    color: '#111827',
    fontSize: 14,
    marginBottom: 2,
  },
  tipDescription: {
    color: '#6B7280',
    fontSize: 12,
  },
});

export default function FoodTrackingScreen() {
  const [history, setHistory] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [recognizing, setRecognizing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recognizedFood, setRecognizedFood] = useState<RecognizedFood | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const hist = await getUserFoodHistory('user_1');
      setHistory(hist);
    } catch (error) {
      console.error('Error loading food history:', error);
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
      alert('Error picking image');
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
      alert('Error capturing image');
    }
  };

  const recognizeFood = async (imageUri: string) => {
    setRecognizing(true);
    try {
      const food = await recognizeFoodFromImage(imageUri);
      setRecognizedFood(food);
    } catch (error) {
      alert('Error recognizing food');
    } finally {
      setRecognizing(false);
    }
  };

  const calculateNutrients = (food: RecognizedFood) => ({
    calories: Math.round(food.calories),
    protein: food.protein.toFixed(1),
    carbs: food.carbs.toFixed(1),
    fat: food.fat.toFixed(1),
    fiber: food.fiber.toFixed(1)
  });

  if (loading && history.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
                      <Text style={styles.foodName}>{recognizedFood.name}</Text>
                      <View style={styles.foodMeta}>
                        <Text style={styles.foodCategory}>{recognizedFood.category}</Text>
                        <Text style={styles.foodConfidence}>
                          {(recognizedFood.confidence * 100).toFixed(0)}% confidence
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Nutrition Facts */}
                  <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Nutrition Facts</Text>
                    <View>
                      {(() => {
                        const nuts = calculateNutrients(recognizedFood);
                        return (
                          <>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Calories</Text>
                              <Text style={styles.nutritionValue}>{nuts.calories} kcal</Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Protein</Text>
                              <Text style={styles.nutritionValue}>{nuts.protein}g</Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Carbs</Text>
                              <Text style={styles.nutritionValue}>{nuts.carbs}g</Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Fat</Text>
                              <Text style={styles.nutritionValue}>{nuts.fat}g</Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Fiber</Text>
                              <Text style={styles.nutritionValue}>{nuts.fiber}g</Text>
                            </View>
                          </>
                        );
                      })()}
                    </View>
                  </View>

                  {/* Dosha Impact */}
                  <View style={styles.doshaImpactContainer}>
                    <Text style={styles.doshaImpactTitle}>Dosha Impact</Text>
                    <View>
                      {(Object.keys(recognizedFood.doshaImpact) as any[]).map((dosha) => (
                        <View key={dosha} style={styles.doshaImpactRow}>
                          <Text style={styles.doshaImpactLabel}>{dosha}</Text>
                          <View style={styles.doshaImpactBadge}>
                            <Text style={styles.doshaImpactBadgeText}>
                              {recognizedFood.doshaImpact[dosha as DoeshaType]}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>

                  <Button
                    title="✅ Log This Food"
                    onPress={() => {
                      alert('Food logged successfully!');
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
                          <Text style={styles.historyItemName}>{entry.food.name}</Text>
                          <Text style={styles.historyTime}>
                            {new Date(entry.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </View>
                        <Text style={styles.historyItemCalories}>{entry.food.calories} kcal</Text>
                      </View>
                      <Text style={styles.historyCategory}>{entry.food.category}</Text>
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
                      Lunch should be your largest meal when digestion is strongest (noon-1 PM)
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
