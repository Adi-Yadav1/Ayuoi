import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { dashboardService } from '@/app/services/dashboardService';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 0,
    paddingBottom: 40,
  },
  // Header Section
  headerSection: {
    backgroundColor: 'linear-gradient(135deg, #EE9B4D 0%, #F5BA7E 100%)',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTextSection: {
    flex: 1,
  },
  headerGreeting: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: 28,
  },
  wellnessBanner: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wellnessEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  wellnessText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 20,
  },
  // Main Content
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  // Dosha Card
  doshaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  doshaEmoji: {
    fontSize: 56,
    marginRight: 20,
  },
  doshaInfo: {
    flex: 1,
  },
  doshaName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  doshaDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    fontWeight: '500',
  },
  doshaStatus: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  // Meals Card
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  mealLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  mealLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  mealStatus: {
    fontSize: 12,
    color: '#6B7280',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mealCompleted: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
    fontWeight: '600',
  },
  mealPending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    fontWeight: '600',
  },
  // Calorie Card
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  calorieLeftSide: {
    flex: 1,
  },
  calorieLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  calorieValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  progressBarContainer: {
    marginTop: 16,
  },
  calorieInfo: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Insights Card
  insightCard: {
    backgroundColor: '#FFFBF0',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderLeftWidth: 4,
    borderLeftColor: '#EE9B4D',
  },
  insightLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EA580C',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  insightText: {
    fontSize: 13,
    color: '#111827',
    lineHeight: 20,
    fontWeight: '500',
  },
  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  quickActionEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  // Trends Card
  trendCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  trendLeftSide: {
    flex: 1,
  },
  trendLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 6,
  },
  trendValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  trendEmoji: {
    fontSize: 32,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyStateText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});

interface DashboardData {
  user: {
    name: string;
    prakriti: string;
    email: string;
  };
  prakritiStatus: {
    primary: string;
    balance: 'balanced' | 'imbalanced' | 'moderately_balanced';
    description: string;
  };
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snacks: number;
  };
  calories: {
    consumed: number;
    target: number;
    percentage: number;
  };
  insights: string[];
  trends: {
    doshaBalance: string;
    calorieAverage: number;
  };
}

// Dummy data service
// (Moved to dashboardService.ts - using API service instead)

const getDoshaEmoji = (prakriti: string): string => {
  switch(prakriti.toLowerCase()) {
    case 'vata': return '💨';
    case 'pitta': return '🔥';
    case 'kapha': return '💧';
    default: return '🌿';
  }
};

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export default function DashboardScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await dashboardService.getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section with Gradient */}
        <View style={styles.headerSection}>
          <View style={styles.headerContent}>
            <View style={styles.headerTextSection}>
              <Text style={styles.headerGreeting}>{getGreeting()}</Text>
              <Text style={styles.headerTitle}>{data.user.name}</Text>
            </View>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>👤</Text>
            </View>
          </View>

          {/* Wellness Banner */}
          <View style={styles.wellnessBanner}>
            <Text style={styles.wellnessEmoji}>✨</Text>
            <Text style={styles.wellnessText}>{data.prakritiStatus.description}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Prakriti Status Card */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text style={styles.sectionTitleEmoji}>🌀</Text>
              <Text style={styles.cardTitle}>Your Prakriti</Text>
            </View>
            <View style={styles.doshaContainer}>
              <Text style={styles.doshaEmoji}>{getDoshaEmoji(data.prakritiStatus.primary)}</Text>
              <View style={styles.doshaInfo}>
                <Text style={styles.doshaName}>{data.prakritiStatus.primary}</Text>
                <Text style={styles.doshaDescription}>
                  {data.prakritiStatus.primary === 'vata' && 'Air & Space - Creative, Quick, Flexible'}
                  {data.prakritiStatus.primary === 'pitta' && 'Fire & Water - Driven, Intelligent, Intense'}
                  {data.prakritiStatus.primary === 'kapha' && 'Water & Earth - Calm, Steady, Grounded'}
                </Text>
              </View>
            </View>
            <View style={styles.doshaStatus}>
              <View style={styles.statusBadge}>
                <View style={[
                  styles.statusDot, 
                  { 
                    backgroundColor: data.prakritiStatus.balance === 'balanced' ? '#10B981' : 
                                     data.prakritiStatus.balance === 'imbalanced' ? '#EF4444' : '#F59E0B'
                  }
                ]} />
                <Text style={styles.statusText}>
                  {data.prakritiStatus.balance === 'balanced' ? '✓ Balanced' : 
                   data.prakritiStatus.balance === 'imbalanced' ? '⚠ Needs Attention' : '◐ Moderately Balanced'}
                </Text>
              </View>
            </View>
          </View>

          {/* Daily Meals Progress */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitleEmoji}>🍽️</Text>
              <Text style={styles.cardTitle}>Today's Meals</Text>
            </View>
            <View style={styles.mealRow}>
              <View style={styles.mealLeftSide}>
                <Text style={styles.mealEmoji}>🥣</Text>
                <Text style={styles.mealLabel}>Breakfast</Text>
              </View>
              <Text style={[styles.mealStatus, data.meals.breakfast ? styles.mealCompleted : styles.mealPending]}>
                {data.meals.breakfast ? '✓ Done' : 'Pending'}
              </Text>
            </View>
            <View style={styles.mealRow}>
              <View style={styles.mealLeftSide}>
                <Text style={styles.mealEmoji}>🍛</Text>
                <Text style={styles.mealLabel}>Lunch</Text>
              </View>
              <Text style={[styles.mealStatus, data.meals.lunch ? styles.mealCompleted : styles.mealPending]}>
                {data.meals.lunch ? '✓ Done' : 'Pending'}
              </Text>
            </View>
            <View style={styles.mealRow}>
              <View style={styles.mealLeftSide}>
                <Text style={styles.mealEmoji}>🍜</Text>
                <Text style={styles.mealLabel}>Dinner</Text>
              </View>
              <Text style={[styles.mealStatus, data.meals.dinner ? styles.mealCompleted : styles.mealPending]}>
                {data.meals.dinner ? '✓ Done' : 'Pending'}
              </Text>
            </View>
            <View style={[styles.mealRow, { borderBottomWidth: 0 }]}>
              <View style={styles.mealLeftSide}>
                <Text style={styles.mealEmoji}>🍪</Text>
                <Text style={styles.mealLabel}>Snacks</Text>
              </View>
              <Text style={styles.mealStatus}>{data.meals.snacks} taken</Text>
            </View>
          </View>

          {/* Calorie Overview */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitleEmoji}>🔥</Text>
              <Text style={styles.cardTitle}>Calorie Intake</Text>
            </View>
            <View style={styles.calorieRow}>
              <View style={styles.calorieLeftSide}>
                <Text style={styles.calorieLabel}>Consumed</Text>
                <Text style={styles.calorieValue}>{data.calories.consumed}</Text>
              </View>
              <View style={styles.calorieLeftSide}>
                <Text style={styles.calorieLabel}>Target</Text>
                <Text style={styles.calorieValue}>{data.calories.target}</Text>
              </View>
              <View style={styles.calorieLeftSide}>
                <Text style={styles.calorieLabel}>Remaining</Text>
                <Text style={styles.calorieValue}>{data.calories.target - data.calories.consumed}</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={Math.min(data.calories.percentage, 100)} color="primary" height={10} />
              <Text style={styles.calorieInfo}>
                {Math.round(data.calories.percentage)}% of daily target
              </Text>
            </View>
          </View>

          {/* AI Insights */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 24 }}>
              <Text style={styles.sectionTitleEmoji}>💡</Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>Wellness Insights</Text>
            </View>
            {data.insights.map((insight, idx) => (
              <View key={idx} style={[styles.insightCard, { marginHorizontal: 24 }]}>
                <Text style={styles.insightLabel}>Suggestion {idx + 1}</Text>
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitleEmoji}>⚡</Text>
              <Text style={styles.cardTitle}>Quick Actions</Text>
            </View>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/(app)/(tabs)/food-tracking')}
              >
                <Text style={styles.quickActionEmoji}>📷</Text>
                <Text style={styles.quickActionLabel}>Scan Food</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/(app)/(tabs)/plans')}
              >
                <Text style={styles.quickActionEmoji}>🍱</Text>
                <Text style={styles.quickActionLabel}>Meal Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/(app)/(tabs)/analytics')}
              >
                <Text style={styles.quickActionEmoji}>📊</Text>
                <Text style={styles.quickActionLabel}>Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Weekly Trends */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitleEmoji}>📈</Text>
              <Text style={styles.cardTitle}>This Week</Text>
            </View>
            <View style={styles.trendCard}>
              <View style={styles.trendLeftSide}>
                <Text style={styles.trendLabel}>Dosha Balance</Text>
                <Text style={styles.trendValue}>{data.trends.doshaBalance}</Text>
              </View>
              <Text style={styles.trendEmoji}>⚖️</Text>
            </View>
            <View style={styles.trendCard}>
              <View style={styles.trendLeftSide}>
                <Text style={styles.trendLabel}>Avg. Daily Calories</Text>
                <Text style={styles.trendValue}>{data.trends.calorieAverage} kcal</Text>
              </View>
              <Text style={styles.trendEmoji}>📊</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
