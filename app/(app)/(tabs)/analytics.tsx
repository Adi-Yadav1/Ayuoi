import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { generatePersonalizedAnalytics } from '@/app/services/analyticsService';
import { getDietarySuggestions } from '@/app/services/dietarySuggestionService';
import { Card, Section, Button, Loader, ProgressBar } from '@/components/ui/Button';
import { DailyAnalytics, WeeklyAnalytics, DietarySuggestion } from '@/app/types';

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
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  calorieValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EE9B4D',
    marginTop: 8,
  },
  calorieHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  macroLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  macroValue: {
    fontWeight: '600',
    color: '#111827',
  },
  doshaBalanceRow: {
    marginBottom: 12,
  },
  doshaBalanceLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  doshaName: {
    fontSize: 14,
    fontWeight: '600',
  },
  doshaPercent: {
    fontSize: 14,
  },
  foodTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  foodTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  redTag: {
    backgroundColor: '#FEE2E2',
  },
  redTagText: {
    color: '#991B1B',
    fontSize: 12,
  },
  greenTag: {
    backgroundColor: '#DCFCE7',
  },
  greenTagText: {
    color: '#166534',
    fontSize: 12,
  },
  weeklyStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  weeklyStatItem: {
    flex: 1,
  },
  weeklyStatLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  weeklyStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EE9B4D',
    marginTop: 8,
  },
  suggesionsContainer: {
    gap: 12,
  },
  suggestionCard: {
    borderLeftWidth: 4,
    marginBottom: 12,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  suggestionTitle: {
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityHighBadge: {
    backgroundColor: '#FEE2E2',
  },
  priorityHighText: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '600',
  },
  priorityMediumBadge: {
    backgroundColor: '#FEF3C7',
  },
  priorityMediumText: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '600',
  },
  priorityLowBadge: {
    backgroundColor: '#DBEAFE',
  },
  priorityLowText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '600',
  },
  suggestionDescription: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 12,
  },
  actionStepsLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 8,
  },
  actionStep: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
  },
  ctaButton: {
    marginTop: 32,
    marginBottom: 32,
    
  },
});

export default function AnalyticsScreen() {
  const [daily, setDaily] = useState<DailyAnalytics | null>(null);
  const [weekly, setWeekly] = useState<WeeklyAnalytics | null>(null);
  const [suggestions, setSuggestions] = useState<DietarySuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const analytics = await generatePersonalizedAnalytics('user_1', 'pitta');
      setDaily(analytics.daily);
      setWeekly(analytics.weekly);

      const sugg = await getDietarySuggestions('pitta');
      setSuggestions(sugg);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Track your wellness progress</Text>

          {/* Daily Overview */}
          {daily && (
            <Section title="Today's Overview">
              <Card style={{ marginBottom: 16 }}>
                <View>
                  <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 16 }}>Nutrition Summary</Text>
                  <View>
                    <View style={styles.calorieRow}>
                      <View>
                        <Text style={styles.calorieLabel}>Calories</Text>
                        <Text style={styles.calorieValue}>
                          {daily.totalCalories}
                        </Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 24 }}>
                        <ProgressBar progress={(daily.totalCalories / 2500) * 100} color="primary" />
                        <Text style={styles.calorieHint}>of 2500 kcal</Text>
                      </View>
                    </View>

                    <View style={{ borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 12, marginTop: 12 }}>
                      <View style={styles.macroRow}>
                        <Text style={styles.macroLabel}>Protein</Text>
                        <Text style={styles.macroValue}>{daily.totalProtein}g</Text>
                      </View>
                      <View style={styles.macroRow}>
                        <Text style={styles.macroLabel}>Carbs</Text>
                        <Text style={styles.macroValue}>{daily.totalCarbs}g</Text>
                      </View>
                      <View style={styles.macroRow}>
                        <Text style={styles.macroLabel}>Fat</Text>
                        <Text style={styles.macroValue}>{daily.totalFat}g</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>

              {/* Dosha Balance Chart */}
              <Card>
                <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 12 }}>Dosha Balance</Text>
                <View>
                  <View style={styles.doshaBalanceRow}>
                    <View style={styles.doshaBalanceLabel}>
                      <Text style={[styles.doshaName, { color: '#A0AEC0' }]}>Vata</Text>
                      <Text style={[styles.doshaPercent, { color: '#A0AEC0' }]}>{daily.doshaBalance.vata}%</Text>
                    </View>
                    <ProgressBar progress={daily.doshaBalance.vata} color="vata" height={6} />
                  </View>

                  <View style={styles.doshaBalanceRow}>
                    <View style={styles.doshaBalanceLabel}>
                      <Text style={[styles.doshaName, { color: '#FF9F43' }]}>Pitta</Text>
                      <Text style={[styles.doshaPercent, { color: '#FF9F43' }]}>{daily.doshaBalance.pitta}%</Text>
                    </View>
                    <ProgressBar progress={daily.doshaBalance.pitta} color="pitta" height={6} />
                  </View>

                  <View style={styles.doshaBalanceRow}>
                    <View style={styles.doshaBalanceLabel}>
                      <Text style={[styles.doshaName, { color: '#48BB78' }]}>Kapha</Text>
                      <Text style={[styles.doshaPercent, { color: '#48BB78' }]}>{daily.doshaBalance.kapha}%</Text>
                    </View>
                    <ProgressBar progress={daily.doshaBalance.kapha} color="kapha" height={6} />
                  </View>
                </View>
              </Card>

              {/* Food Analysis */}
              {daily.aggregatingFoods.length > 0 && (
                <Card style={{ marginTop: 16 }}>
                  <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 8 }}>Aggravating Foods</Text>
                  <View style={styles.foodTagsContainer}>
                    {daily.aggregatingFoods.map((food, idx) => (
                      <View key={idx} style={[styles.foodTag, styles.redTag]}>
                        <Text style={styles.redTagText}>{food}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              )}

              {daily.balancingFoods.length > 0 && (
                <Card style={{ marginTop: 16 }}>
                  <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 8 }}>Balancing Foods</Text>
                  <View style={styles.foodTagsContainer}>
                    {daily.balancingFoods.map((food, idx) => (
                      <View key={idx} style={[styles.foodTag, styles.greenTag]}>
                        <Text style={styles.greenTagText}>{food}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              )}
            </Section>
          )}

          {/* Weekly Insights */}
          {weekly && (
            <Section title="Weekly Insights">
              <Card style={{ marginBottom: 16 }}>
                <View>
                  <View style={styles.weeklyStatsRow}>
                    <View style={styles.weeklyStatItem}>
                      <Text style={styles.weeklyStatLabel}>Average Calories</Text>
                      <Text style={styles.weeklyStatValue}>
                        {weekly.averageCalories}
                      </Text>
                    </View>
                    <View style={styles.weeklyStatItem}>
                      <Text style={styles.weeklyStatLabel}>Meal Consistency</Text>
                      <Text style={styles.weeklyStatValue}>
                        {(weekly.mealConsistency * 100).toFixed(0)}%
                      </Text>
                    </View>
                  </View>

                  <View style={styles.weeklyStatsRow}>
                    <View style={styles.weeklyStatItem}>
                      <Text style={styles.weeklyStatLabel}>Food Diversity</Text>
                      <Text style={styles.weeklyStatValue}>
                        {(weekly.foodDiversity * 100).toFixed(0)}%
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'right' }}>
                        Great variety of <Text style={{ fontWeight: '600' }}>nutritious foods</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            </Section>
          )}

          {/* Personalized Suggestions */}
          {suggestions.length > 0 && (
            <Section title="Personalized Recommendations">
              <View style={styles.suggesionsContainer}>
                {suggestions.slice(0, 5).map((suggestion) => {
                  let borderColor = '#3B82F6';
                  let badgeStyle = styles.priorityLowBadge;
                  let badgeTextStyle = styles.priorityLowText;
                  if (suggestion.priority === 'high') {
                    borderColor = '#EF4444';
                    badgeStyle = styles.priorityHighBadge;
                    badgeTextStyle = styles.priorityHighText;
                  } else if (suggestion.priority === 'medium') {
                    borderColor = '#EAB308';
                    badgeStyle = styles.priorityMediumBadge;
                    badgeTextStyle = styles.priorityMediumText;
                  }
                  
                  return (
                    <Card 
                      key={suggestion.id}
                      style={{
                        ...styles.suggestionCard,
                        borderLeftColor: borderColor
                      }}
                    >
                      <View>
                        <View style={styles.suggestionHeader}>
                          <Text style={styles.suggestionTitle}>
                            {suggestion.title}
                          </Text>
                          <View style={badgeStyle}>
                            <Text style={badgeTextStyle}>
                              {suggestion.priority}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.suggestionDescription}>{suggestion.description}</Text>
                        <View>
                          <Text style={styles.actionStepsLabel}>Action Steps:</Text>
                          {suggestion.actionableSteps.slice(0, 2).map((step, idx) => (
                            <Text key={idx} style={styles.actionStep}>• {step}</Text>
                          ))}
                        </View>
                      </View>
                    </Card>
                  );
                })}
              </View>
            </Section>
          )}

          {/* CTA */}
          <Button
            title="View All Recommendations"
            variant="secondary"
            style={styles.ctaButton}
            onPress={() => alert('Detailed recommendations page coming soon!')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
