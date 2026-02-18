import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { generateMealPlan } from '@/app/services/mealPlanService';
import { Button, Card, Section, Loader, EmptyState } from '@/components/ui/Button';
import { MealPlan } from '@/app/types';

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
    paddingVertical: 40,
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
  mealName: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  mealDescription: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 12,
  },
  benefitLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 12,
    color: '#374151',
  },
  infoCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginBottom: 32,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoTitle: {
    color: '#166534',
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    color: '#15803D',
    fontSize: 12,
  },
  buttonsContainer: {
    marginBottom: 24,
    gap: 12,
  },
  mealCardStyle: {
    marginBottom: 12,
  },
});

export default function MealPlanSetupScreen() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMealPlan = async () => {
      try {
        const plan = await generateMealPlan('user_1', 'pitta');
        setMealPlan(plan);
      } catch (error) {
        console.error('Error loading meal plan:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMealPlan();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!mealPlan) {
    return (
      <EmptyState
        title="Could not load meal plan"
        description="Please try again or skip this step"
        actionButton={{
          title: 'Go to Home',
          onPress: () => router.replace('/(app)/(tabs)/home')
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <Text style={styles.title}>Your Meal Plan</Text>
          <Text style={styles.subtitle}>
            Personalized meals based on your {mealPlan.dosha} Dosha
          </Text>

          {/* Meal Categories */}
          <Section title="Breakfast">
            <View>
              {mealPlan.meals
                .filter(m => m.category === 'breakfast')
                .map((meal) => (
                  <Card key={meal.id} style={styles.mealCardStyle}>
                    <View>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      <Text style={styles.mealDescription}>{meal.description}</Text>
                      <View>
                        <Text style={styles.benefitLabel}>Benefits:</Text>
                        <Text style={styles.benefitText}>{meal.benefits.join(', ')}</Text>
                      </View>
                    </View>
                  </Card>
                ))}
            </View>
          </Section>

          <Section title="Lunch">
            <View>
              {mealPlan.meals
                .filter(m => m.category === 'lunch')
                .map((meal) => (
                  <Card key={meal.id} style={styles.mealCardStyle}>
                    <View>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      <Text style={styles.mealDescription}>{meal.description}</Text>
                      <View>
                        <Text style={styles.benefitLabel}>Benefits:</Text>
                        <Text style={styles.benefitText}>{meal.benefits.join(', ')}</Text>
                      </View>
                    </View>
                  </Card>
                ))}
            </View>
          </Section>

          <Section title="Dinner">
            <View>
              {mealPlan.meals
                .filter(m => m.category === 'dinner')
                .map((meal) => (
                  <Card key={meal.id} style={styles.mealCardStyle}>
                    <View>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      <Text style={styles.mealDescription}>{meal.description}</Text>
                      <View>
                        <Text style={styles.benefitLabel}>Benefits:</Text>
                        <Text style={styles.benefitText}>{meal.benefits.join(', ')}</Text>
                      </View>
                    </View>
                  </Card>
                ))}
            </View>
          </Section>

          <Section title="Snacks">
            <View>
              {mealPlan.meals
                .filter(m => m.category === 'snack')
                .map((meal) => (
                  <Card key={meal.id} style={styles.mealCardStyle}>
                    <View>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      <Text style={styles.mealDescription}>{meal.description}</Text>
                      <View>
                        <Text style={styles.benefitLabel}>Benefits:</Text>
                        <Text style={styles.benefitText}>{meal.benefits.join(', ')}</Text>
                      </View>
                    </View>
                  </Card>
                ))}
            </View>
          </Section>

          {/* Info */}
          <Card style={styles.infoCard}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.infoIcon}>💚</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>Meal Plan Valid Until</Text>
                <Text style={styles.infoText}>
                  {new Date(mealPlan.validUntil).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            </View>
          </Card>

          {/* Actions */}
          <View style={styles.buttonsContainer}>
            <Button
              title="Start Using This Plan"
              onPress={() => router.replace('/(app)/(tabs)/home')}
            />
            <Button
              title="Customize My Plan"
              variant="outline"
              onPress={() => router.push('/(app)/(tabs)/plans')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
