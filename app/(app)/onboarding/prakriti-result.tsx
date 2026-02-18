import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { DoshaCard, Section, Card, Button, Loader } from '@/components/ui/Button';
import { PrakritiResult } from '@/app/types';

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
  doshaCardsRow: {
    marginBottom: 32,
    flexDirection: 'row',
    gap: 8,
  },
  primaryDoshaCard: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  primaryDoshaCenterContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  doshaEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  primaryDoshaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  secondaryDoshaText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  characteristicBullet: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
  },
  bulletPoint: {
    color: '#EE9B4D',
    fontWeight: 'bold',
    marginRight: 12,
  },
  characteristicText: {
    flex: 1,
    color: '#1A202C',
  },
  checkmark: {
    color: '#10B981',
    fontWeight: 'bold',
    marginRight: 12,
  },
  habitText: {
    flex: 1,
    color: '#1A202C',
  },
  recommendationContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
  },
  recommendationBadge: {
    backgroundColor: '#EE9B4D',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  recommendationBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendationText: {
    flex: 1,
    color: '#1A202C',
  },
  actionButtonsContainer: {
    marginTop: 32,
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 32,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoTitle: {
    color: '#1E3A8A',
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#1E40AF',
    fontSize: 12,
  },
});

export default function PrakritiResultScreen() {
  if (!result) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
                  {result.primaryDosha === 'vata' && '💨'} 
                  {result.primaryDosha === 'pitta' && '🔥'}
                  {result.primaryDosha === 'kapha' && '💧'}
                </Text>
                <Text style={styles.primaryDoshaTitle}>
                  {result.primaryDosha.charAt(0).toUpperCase() + result.primaryDosha.slice(1)} Prakriti
                </Text>
                <Text style={styles.secondaryDoshaText}>
                  Secondary: {result.secondaryDosha}
                </Text>
              </View>
            </Card>
          </Section>

          {/* Characteristics */}
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

          {/* Feeding Habits */}
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

          {/* Recommendations */}
          <Section title="Key Recommendations">
            <Card>
              {result.recommendations.map((rec, idx) => (
                <View key={idx} style={styles.recommendationContainer}>
                  <View style={styles.recommendationBadge}>
                    <Text style={styles.recommendationBadgeText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </Card>
          </Section>

          {/* Navigation */}
          <View style={styles.actionButtonsContainer}>
            <Button
              title="Create My Meal Plan"
              onPress={() => router.push('/(app)/onboarding/meal-plan-setup')}
            />
            <Button
              title="Skip for Now"
              variant="outline"
              onPress={() => router.replace('/(app)/(tabs)/home')}
            />
          </View>

          {/*Info Card*/}
          <Card style={styles.infoCard}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>About Your Prakriti</Text>
                <Text style={styles.infoText}>
                  Your Prakriti remains constant throughout life. Understanding it helps you maintain balance and 
                  prevent disease through proper diet, lifestyle, and seasonal adjustments.
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
