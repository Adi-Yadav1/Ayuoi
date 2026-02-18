import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { router } from 'expo-router';
import { getPrakritiResultAsync } from '@/app/services/prakritiService';
import { getHighPrioritySuggestions } from '@/app/services/dietarySuggestionService';
import { Card, Section, Button, Loader, DoshaCard, StatItem } from '@/components/ui/Button';
import { PrakritiResult, DietarySuggestion } from '@/app/types';

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
  greetingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  greetingDate: {
    color: '#6B7280',
    marginBottom: 24,
  },
  doshaCardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  doshaEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  doshaCardContent: {
    flex: 1,
    marginLeft: 16,
  },
  doshaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  doshaScore: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  doshaSecondary: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  doshaCardsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#FFF1E1',
    borderWidth: 1,
    borderColor: '#F0D8C0',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  quickButtonAlt: {
    backgroundColor: '#F0FAF2',
    borderColor: '#CFE9D6',
  },
  quickButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2F2A23',
  },
  tipsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  tipCard: {
    marginBottom: 12,
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTitle: {
    fontWeight: '600',
    color: '#111827',
  },
  tipDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  learnMoreLink: {
    color: '#EE9B4D',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonsGap: {
    gap: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  modalClose: {
    color: '#EE9B4D',
    fontWeight: '600',
  },
  inputBlock: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
});

export default function HomeScreen() {
  const [prakriti, setPrakriti] = useState<PrakritiResult | null>(null);
  const [suggestions, setSuggestions] = useState<DietarySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPrakritiFormOpen, setIsPrakritiFormOpen] = useState(false);
  const [prakritiForm, setPrakritiForm] = useState({
    body_size: '',
    body_weight_tendency: '',
    height: '',
    bone_structure: '',
    body_frame: '',
    complexion: '',
    skin_type: '',
    skin_texture: '',
    hair_color: '',
    hair_density: '',
    hair_texture: '',
    hair_appearance: '',
    hair_graying: '',
    face_shape: '',
    cheeks: '',
    jaw_structure: '',
    eyes: '',
    eye_luster: '',
    eyelashes: '',
    blinking_pattern: '',
    nose_shape: '',
    nose_tip: '',
    teeth_structure: '',
    teeth_gums: '',
    lips: '',
    nails: '',
    appetite: '',
    digestion_speed: '',
    hunger_frequency: '',
    thirst_level: '',
    sweating: '',
    bowel_habit: '',
    taste_preference: '',
    food_temperature_preference: '',
    weather_preference: '',
  });

  const [isDoshaFormOpen, setIsDoshaFormOpen] = useState(false);
  const [doshaForm, setDoshaForm] = useState({
    current_symptoms: '',
    symptom_duration: '',
    symptom_severity: '',
    medical_history: '',
    current_medications: '',
    appetite_level: '',
    digestion_quality: '',
    bowel_pattern: '',
    gas_bloating: '',
    acidity_burning: '',
    sleep_quality: '',
    sleep_duration: '',
    daytime_energy: '',
    mental_state: '',
    stress_level: '',
    physical_activity_level: '',
    daily_routine_consistency: '',
    work_type: '',
    travel_frequency: '',
    diet_type: '',
    food_quality: '',
    taste_dominance: '',
    meal_timing_regular: '',
    hydration_level: '',
    caffeine_intake: '',
    climate_exposure: '',
    season: '',
    pollution_exposure: '',
    screen_exposure: '',
    age_group: '',
    gender: '',
    occupation: '',
    cultural_diet_preference: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getPrakritiResultAsync('user_1');
        setPrakriti(result);
        
        if (result) {
          const sugg = await getHighPrioritySuggestions(result.primaryDosha);
          setSuggestions(sugg);
        }
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
          {/* Greeting */}
          <Text style={styles.greetingTitle}>Welcome Back</Text>
          <Text style={styles.greetingDate}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </Text>

          {/* Prakriti Card */}
          {prakriti && (
            <Section title="Your Prakriti">
              <TouchableOpacity 
                onPress={() => router.navigate('/(app)/(tabs)/profile')}
                activeOpacity={0.7}
              >
                <Card style={{ backgroundColor: '#F3F4F6', marginBottom: 24 }}>
                  <View style={styles.doshaCardsContainer}>
                    <View>
                      <Text style={styles.doshaEmoji}>
                        {prakriti.primaryDosha === 'vata' && '💨'} 
                        {prakriti.primaryDosha === 'pitta' && '🔥'}
                        {prakriti.primaryDosha === 'kapha' && '💧'}
                      </Text>
                    </View>
                    <View style={styles.doshaCardContent}>
                      <Text style={styles.doshaName}>
                        {prakriti.primaryDosha.charAt(0).toUpperCase() + prakriti.primaryDosha.slice(1)}
                      </Text>
                      <Text style={styles.doshaScore}>
                        {prakriti.scores[prakriti.primaryDosha]}% Dominant
                      </Text>
                      <Text style={styles.doshaSecondary}>
                        Secondary: {prakriti.secondaryDosha}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            </Section>
          )}

          <View style={styles.quickButtonsRow}>
            <TouchableOpacity
              style={styles.quickButton}
              activeOpacity={0.8}
              onPress={() => setIsPrakritiFormOpen(true)}
            >
              <Text style={styles.quickButtonText}>Prakriti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickButton, styles.quickButtonAlt]}
              activeOpacity={0.8}
              onPress={() => setIsDoshaFormOpen(true)}
            >
              <Text style={styles.quickButtonText}>Dosha</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={isPrakritiFormOpen}
            animationType="slide"
            transparent
            onRequestClose={() => setIsPrakritiFormOpen(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Prakriti Form</Text>
                  <TouchableOpacity onPress={() => setIsPrakritiFormOpen(false)}>
                    <Text style={styles.modalClose}>Close</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  {[
                    { key: 'body_size', label: 'Body Size' },
                    { key: 'body_weight_tendency', label: 'Body Weight Tendency' },
                    { key: 'height', label: 'Height' },
                    { key: 'bone_structure', label: 'Bone Structure' },
                    { key: 'body_frame', label: 'Body Frame' },
                    { key: 'complexion', label: 'Complexion' },
                    { key: 'skin_type', label: 'Skin Type' },
                    { key: 'skin_texture', label: 'Skin Texture' },
                    { key: 'hair_color', label: 'Hair Color' },
                    { key: 'hair_density', label: 'Hair Density' },
                    { key: 'hair_texture', label: 'Hair Texture' },
                    { key: 'hair_appearance', label: 'Hair Appearance' },
                    { key: 'hair_graying', label: 'Hair Graying' },
                    { key: 'face_shape', label: 'Face Shape' },
                    { key: 'cheeks', label: 'Cheeks' },
                    { key: 'jaw_structure', label: 'Jaw Structure' },
                    { key: 'eyes', label: 'Eyes' },
                    { key: 'eye_luster', label: 'Eye Luster' },
                    { key: 'eyelashes', label: 'Eyelashes' },
                    { key: 'blinking_pattern', label: 'Blinking Pattern' },
                    { key: 'nose_shape', label: 'Nose Shape' },
                    { key: 'nose_tip', label: 'Nose Tip' },
                    { key: 'teeth_structure', label: 'Teeth Structure' },
                    { key: 'teeth_gums', label: 'Teeth Gums' },
                    { key: 'lips', label: 'Lips' },
                    { key: 'nails', label: 'Nails' },
                    { key: 'appetite', label: 'Appetite' },
                    { key: 'digestion_speed', label: 'Digestion Speed' },
                    { key: 'hunger_frequency', label: 'Hunger Frequency' },
                    { key: 'thirst_level', label: 'Thirst Level' },
                    { key: 'sweating', label: 'Sweating' },
                    { key: 'bowel_habit', label: 'Bowel Habit' },
                    { key: 'taste_preference', label: 'Taste Preference' },
                    { key: 'food_temperature_preference', label: 'Food Temperature Preference' },
                    { key: 'weather_preference', label: 'Weather Preference' },
                  ].map((field) => (
                    <View key={field.key} style={styles.inputBlock}>
                      <Text style={styles.inputLabel}>{field.label}</Text>
                      <TextInput
                        style={styles.inputField}
                        value={prakritiForm[field.key as keyof typeof prakritiForm]}
                        onChangeText={(value) =>
                          setPrakritiForm((prev) => ({
                            ...prev,
                            [field.key]: value,
                          }))
                        }
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  ))}

                  <Button
                    title="Save Prakriti"
                    onPress={() => {
                      console.log('Prakriti form data', prakritiForm);
                      setIsPrakritiFormOpen(false);
                    }}
                    style={{ marginTop: 12, marginBottom: 12 }}
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isDoshaFormOpen}
            animationType="slide"
            transparent
            onRequestClose={() => setIsDoshaFormOpen(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Dosha Assessment</Text>
                  <TouchableOpacity onPress={() => setIsDoshaFormOpen(false)}>
                    <Text style={styles.modalClose}>Close</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  {[
                    { key: 'current_symptoms', label: 'Current Symptoms' },
                    { key: 'symptom_duration', label: 'Symptom Duration' },
                    { key: 'symptom_severity', label: 'Symptom Severity' },
                    { key: 'medical_history', label: 'Medical History' },
                    { key: 'current_medications', label: 'Current Medications' },
                    { key: 'appetite_level', label: 'Appetite Level' },
                    { key: 'digestion_quality', label: 'Digestion Quality' },
                    { key: 'bowel_pattern', label: 'Bowel Pattern' },
                    { key: 'gas_bloating', label: 'Gas/Bloating' },
                    { key: 'acidity_burning', label: 'Acidity/Burning' },
                    { key: 'sleep_quality', label: 'Sleep Quality' },
                    { key: 'sleep_duration', label: 'Sleep Duration' },
                    { key: 'daytime_energy', label: 'Daytime Energy' },
                    { key: 'mental_state', label: 'Mental State' },
                    { key: 'stress_level', label: 'Stress Level' },
                    { key: 'physical_activity_level', label: 'Physical Activity Level' },
                    { key: 'daily_routine_consistency', label: 'Daily Routine Consistency' },
                    { key: 'work_type', label: 'Work Type' },
                    { key: 'travel_frequency', label: 'Travel Frequency' },
                    { key: 'diet_type', label: 'Diet Type' },
                    { key: 'food_quality', label: 'Food Quality' },
                    { key: 'taste_dominance', label: 'Taste Dominance' },
                    { key: 'meal_timing_regular', label: 'Meal Timing Regular' },
                    { key: 'hydration_level', label: 'Hydration Level' },
                    { key: 'caffeine_intake', label: 'Caffeine Intake' },
                    { key: 'climate_exposure', label: 'Climate Exposure' },
                    { key: 'season', label: 'Season' },
                    { key: 'pollution_exposure', label: 'Pollution Exposure' },
                    { key: 'screen_exposure', label: 'Screen Exposure' },
                    { key: 'age_group', label: 'Age Group' },
                    { key: 'gender', label: 'Gender' },
                    { key: 'occupation', label: 'Occupation' },
                    { key: 'cultural_diet_preference', label: 'Cultural Diet Preference' },
                  ].map((field) => (
                    <View key={field.key} style={styles.inputBlock}>
                      <Text style={styles.inputLabel}>{field.label}</Text>
                      <TextInput
                        style={styles.inputField}
                        value={doshaForm[field.key as keyof typeof doshaForm]}
                        onChangeText={(value) =>
                          setDoshaForm((prev) => ({
                            ...prev,
                            [field.key]: value,
                          }))
                        }
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  ))}

                  <Button
                    title="Analyze Dosha"
                    onPress={() => {
                      console.log('Dosha assessment data', doshaForm);
                      setIsDoshaFormOpen(false);
                    }}
                    style={{ marginTop: 12, marginBottom: 12 }}
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>
          <Section title="Today's Stats">
            <Card>
              <View style={styles.statsRow}>
                <StatItem label="Calories" value="2,100" unit="kcal" />
                <StatItem label="Protein" value="75" unit="g" />
                <StatItem label="Meals" value="3" color="text-secondary-500" />
              </View>
            </Card>
          </Section>

          {/* Dosha Balance */}
          {prakriti && (
            <Section title="Current Dosha Balance">
              <View style={styles.doshaCardsRow}>
                <DoshaCard
                  dosha="vata"
                  score={prakriti.scores.vata}
                  title="Vata"
                  description="Space & Air"
                />
                <DoshaCard
                  dosha="pitta"
                  score={prakriti.scores.pitta}
                  title="Pitta"
                  description="Fire & Water"
                  onPress={() => router.navigate('/(app)/(tabs)/analytics')}
                />
                <DoshaCard
                  dosha="kapha"
                  score={prakriti.scores.kapha}
                  title="Kapha"
                  description="Water & Earth"
                />
              </View>
            </Section>
          )}

          {/* Quick Actions */}
          <Section title="Quick Actions">
            <View style={styles.buttonsGap}>
              <Button
                title="📸 Recognize Food"
                onPress={() => router.navigate('/(app)/(tabs)/food-tracking')}
              />
              <Button
                title="📋 View Today's Plan"
                variant="secondary"
                onPress={() => router.navigate('/(app)/(tabs)/plans')}
              />
            </View>
          </Section>

          {/* Today's Suggestions */}
          {suggestions.length > 0 && (
            <Section title="Today's Tip">
              <Card style={{ borderLeftWidth: 4, borderLeftColor: '#EE9B4D' }}>
                <View>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipEmoji}>💡</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tipTitle}>{suggestions[0].title}</Text>
                      <Text style={styles.tipDescription}>{suggestions[0].description}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.navigate('/(app)/(tabs)/analytics')}
                  >
                    <Text style={styles.learnMoreLink}>Learn More →</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </Section>
          )}

          {/* Info Cards */}
          <View style={styles.tipsContainer}>
            <Card style={{ backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#BFDBFE' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.tipEmoji}>🌿</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tipTitle, { color: '#1E3A8A' }]}>Tip</Text>
                  <Text style={[styles.tipDescription, { color: '#1E40AF' }]}>
                    Eat mindfully and chew thoroughly for better digestion
                  </Text>
                </View>
              </View>
            </Card>
            <Card style={{ backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#DCFCE7' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.tipEmoji}>💧</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tipTitle, { color: '#166534' }]}>Hydration</Text>
                  <Text style={[styles.tipDescription, { color: '#15803D' }]}>
                    Drink warm water throughout the day for optimal digestion
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
