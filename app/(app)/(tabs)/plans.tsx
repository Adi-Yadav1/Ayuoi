import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { getMealPlanAsync } from '@/app/services/mealPlanService';
import { Card, Section, Button, Loader, EmptyState } from '@/components/ui/Button';
import { MealPlan, MealItem } from '@/app/types';

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
  validHeader: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  validIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  validTitle: {
    color: '#1E3A8A',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  validDate: {
    color: '#1E40AF',
    fontSize: 12,
  },
  mealCardStyle: {
    marginBottom: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mealName: {
    flex: 1,
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 16,
  },
  mealCategoryBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  mealCategory: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  mealDescription: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 12,
  },
  benefitsSectionLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 6,
  },
  benefitTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  benefitTag: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  benefitTagText: {
    color: '#047857',
    fontSize: 12,
  },
  cautionTag: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cautionTagText: {
    color: '#B45309',
    fontSize: 12,
  },
  seasonText: {
    fontSize: 12,
    color: '#374151',
  },
  seasonDivider: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
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
    marginBottom: 4,
  },
  tipDescription: {
    color: '#6B7280',
    fontSize: 14,
  },
  regenerateButton: {
    marginTop: 32,
    marginBottom: 32,
  },
});

export default function PlansScreen() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMealPlan = async () => {
      try {
        const plan = await getMealPlanAsync('user_1');
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
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  if (!mealPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          title="No Meal Plan"
          description="Start by creating your personalized meal plan"
        />
      </SafeAreaView>
    );
  }

  const categories = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

  const renderMealItem = (meal: MealItem) => (
    <Card key={meal.id} style={styles.mealCardStyle}>
      <View>
        <View style={styles.mealHeader}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <View style={styles.mealCategoryBadge}>
            <Text style={styles.mealCategory}>
              {meal.category}
            </Text>
          </View>
        </View>
        
        <Text style={styles.mealDescription}>{meal.description}</Text>
        
        {meal.benefits.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.benefitsSectionLabel}>Benefits:</Text>
            <View style={styles.benefitTags}>
              {meal.benefits.map((benefit, idx) => (
                <View key={idx} style={styles.benefitTag}>
                  <Text style={styles.benefitTagText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {meal.cautions.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.benefitsSectionLabel}>Cautions:</Text>
            <View style={styles.benefitTags}>
              {meal.cautions.map((caution, idx) => (
                <View key={idx} style={styles.cautionTag}>
                  <Text style={styles.cautionTagText}>{caution}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {meal.season.length > 0 && (
          <View style={styles.seasonDivider}>
            <Text style={styles.benefitsSectionLabel}>Best Seasons:</Text>
            <Text style={styles.seasonText}>
              {meal.season.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <Text style={styles.title}>My Meal Plan</Text>
          <Text style={styles.subtitle}>
            Personalized daily meals for your {mealPlan.dosha} Dosha
          </Text>

          {/* Meal Plan Valid Until */}
          <Card style={styles.validHeader}>
            <Text style={styles.validIcon}>📅</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.validTitle}>Valid Until</Text>
              <Text style={styles.validDate}>
                {new Date(mealPlan.validUntil).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>
          </Card>

          {/* Meals by Category */}
          {categories.map(category => {
            const categoryMeals = mealPlan.meals.filter(m => m.category === category);
            if (categoryMeals.length === 0) return null;

            return (
              <Section 
                key={category}
                title={category.charAt(0).toUpperCase() + category.slice(1)}
              >
                <View>
                  {categoryMeals.map(meal => renderMealItem(meal))}
                </View>
              </Section>
            );
          })}

          {/* Tips */}
          <Section title="Tips for Success">
            <View style={styles.tipCard}>
              <Card>
                <View style={styles.tipCardItem}>
                  <Text style={styles.tipEmoji}>🍽️</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tipTitle}>Eating Mindfully</Text>
                    <Text style={styles.tipDescription}>
                      Take your time eating. Chew thoroughly and avoid distractions.
                    </Text>
                  </View>
                </View>
              </Card>

              <Card>
                <View style={styles.tipCardItem}>
                  <Text style={styles.tipEmoji}>⏰</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tipTitle}>Consistent Timing</Text>
                    <Text style={styles.tipDescription}>
                      Eat at the same times daily to support your digestion.
                    </Text>
                  </View>
                </View>
              </Card>

              <Card>
                <View style={styles.tipCardItem}>
                  <Text style={styles.tipEmoji}>🌿</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tipTitle}>Fresh Ingredients</Text>
                    <Text style={styles.tipDescription}>
                      Use fresh, seasonal ingredients whenever possible.
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </Section>

          {/* Action */}
          <Button
            title="Generate New Plan"
            variant="secondary"
            style={styles.regenerateButton}
            onPress={() => alert('Plan regeneration coming soon!')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
