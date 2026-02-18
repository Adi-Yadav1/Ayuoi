import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { getPrakritiResultAsync } from '@/app/services/prakritiService';
import { getHighPrioritySuggestions } from '@/app/services/dietarySuggestionService';
import { Card, Section, Button, Loader, DoshaCard, StatItem } from '@/components/ui/Button';
import { PrakritiResult, DietarySuggestion } from '@/app/types';
import { useAuth } from '@/app/context/AuthContext';
import { apiClient } from '@/app/services/apiClient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EC',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    backgroundColor: '#FFF7EC',
  },
  greetingContainer: {
    marginBottom: 24,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2E2A24',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  greetingDate: {
    fontSize: 14,
    color: '#6B5E4B',
    fontWeight: '500',
  },
  sectionContainer: {
    paddingHorizontal: 24,
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
  },
  statItemContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
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
    backgroundColor: '#FFF0DE',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E58B3A',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F2D2B5',
  },
  quickButtonAlt: {
    shadowColor: '#10B981',
    borderColor: '#D8F2DE',
    backgroundColor: '#E6F6EA',
  },
  quickButtonIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E2A24',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickButtonSubtext: {
    fontSize: 11,
    color: '#6B5E4B',
    marginTop: 2,
  },
  prakritiHeroCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    overflow: 'hidden',
  },
  prakritiCardGradient: {
    padding: 24,
    borderRadius: 24,
  },
  prakritiCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  prakritiEmojiLarge: {
    fontSize: 56,
    marginRight: 16,
  },
  prakritiInfo: {
    flex: 1,
  },
  prakritiLabel: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '600',
    marginBottom: 4,
  },
  prakritiType: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  prakritiPercentage: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.95,
    fontWeight: '600',
  },
  prakritiSecondaryInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prakritiSecondaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#FFF0DE',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#E58B3A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F2D2B5',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E2A24',
    marginBottom: 16,
  },
  tipsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#FFF0DE',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#E58B3A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderLeftWidth: 4,
  },
  infoCardBlue: {
    borderLeftColor: '#E58B3A',
  },
  infoCardGreen: {
    borderLeftColor: '#4A9B6B',
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoCardEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  infoCardTextContainer: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2A24',
    marginBottom: 6,
  },
  infoCardDescription: {
    fontSize: 14,
    color: '#5F5344',
    lineHeight: 20,
  },
  buttonsGap: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFF0DE',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#E58B3A',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F2D2B5',
  },
  actionButtonSecondary: {
    borderColor: '#D8F2DE',
    shadowColor: '#4A9B6B',
    backgroundColor: '#E6F6EA',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButtonEmoji: {
    fontSize: 24,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2A24',
  },
  actionButtonArrow: {
    fontSize: 18,
    color: '#8A7B6A',
  },
  tipCard: {
    backgroundColor: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#667EEA',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tipCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
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
  const [isPrakritiSubmitting, setIsPrakritiSubmitting] = useState(false);
  const [isDoshaSubmitting, setIsDoshaSubmitting] = useState(false);
  const { user } = useAuth();
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

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDoshaColor = (dosha: string): string => {
    switch (dosha) {
      case 'vata':
        return '#667E';
      case 'pitta':
        return '#F71C';
      case 'kapha':
        return '#4FCFE';
      default:
        return '#EE9B4D';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Hero Section with Greeting */}
          <View style={styles.heroSection}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingSubtitle}>{getTimeOfDayGreeting()}</Text>
              <Text style={styles.greetingTitle}>
                {user?.username ? user.username : 'Welcome Back'}
              </Text>
              <Text style={styles.greetingDate}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Text>
            </View>
          </View>

          {/* Prakriti Hero Card */}
          {prakriti && (
            <View style={styles.sectionContainer}>
              <TouchableOpacity 
                onPress={() => router.navigate('/(app)/(tabs)/profile')}
                activeOpacity={0.9}
              >
                <View style={[styles.prakritiHeroCard, { backgroundColor: getDoshaColor(prakriti.primaryDosha) }]}>
                  <View style={styles.prakritiCardGradient}>
                    <View style={styles.prakritiCardHeader}>
                      <Text style={styles.prakritiEmojiLarge}>
                        {prakriti.primaryDosha === 'vata' && '💨'}
                        {prakriti.primaryDosha === 'pitta' && '🔥'}
                        {prakriti.primaryDosha === 'kapha' && '💧'}
                      </Text>
                      <View style={styles.prakritiInfo}>
                        <Text style={styles.prakritiLabel}>YOUR PRAKRITI TYPE</Text>
                        <Text style={styles.prakritiType}>
                          {prakriti.primaryDosha.charAt(0).toUpperCase() + prakriti.primaryDosha.slice(1)}
                        </Text>
                        <Text style={styles.prakritiPercentage}>
                          {prakriti.scores[prakriti.primaryDosha]}% Dominant
                        </Text>
                      </View>
                    </View>
                    <View style={styles.prakritiSecondaryInfo}>
                      <Text style={styles.prakritiSecondaryText}>
                        Secondary: {prakriti.secondaryDosha.charAt(0).toUpperCase() + prakriti.secondaryDosha.slice(1)} • Tap to view details
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.sectionContainer}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>Assessments</Text>
            <View style={styles.quickButtonsRow}>
              <TouchableOpacity
                style={styles.quickButton}
                activeOpacity={0.85}
                onPress={() => setIsPrakritiFormOpen(true)}
              >
                <Text style={styles.quickButtonIcon}>🧬</Text>
                <Text style={styles.quickButtonText}>Prakriti</Text>
                <Text style={styles.quickButtonSubtext}>Body Constitution</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickButton, styles.quickButtonAlt]}
                activeOpacity={0.85}
                onPress={() => setIsDoshaFormOpen(true)}
              >
                <Text style={styles.quickButtonIcon}>🌸</Text>
                <Text style={styles.quickButtonText}>Dosha</Text>
                <Text style={styles.quickButtonSubtext}>Current Balance</Text>
              </TouchableOpacity>
            </View>
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
                    title={isPrakritiSubmitting ? 'Saving...' : 'Save Prakriti'}
                    onPress={async () => {
                      if (!user) {
                        Alert.alert('Error', 'User not found. Please login again.');
                        return;
                      }

                      try {
                        setIsPrakritiSubmitting(true);
                        const response = await apiClient.submitPrakritiTraits(prakritiForm);
                        console.log('Prakriti submission response:', response);
                        
                        // Check if any field is empty
                        const emptyFields = Object.entries(prakritiForm).filter(([_, value]) => value === '');
                        if (emptyFields.length > 0) {
                          Alert.alert(
                            'Incomplete Form',
                            `Please fill all ${emptyFields.length} field(s) before submitting.`
                          );
                          return;
                        }

                        Alert.alert('Success', 'Prakriti assessment submitted successfully!', [
                          {
                            text: 'OK',
                            onPress: () => {
                              setIsPrakritiFormOpen(false);
                              // Reset form
                              setPrakritiForm({
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
                            },
                          },
                        ]);
                      } catch (error) {
                        console.error('Prakriti submission error:', error);
                        Alert.alert(
                          'Error',
                          error instanceof Error ? error.message : 'Failed to submit Prakriti assessment. Please try again.'
                        );
                      } finally {
                        setIsPrakritiSubmitting(false);
                      }
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
                    title={isDoshaSubmitting ? 'Submitting...' : 'Analyze Dosha'}
                    onPress={async () => {
                      if (!user) {
                        Alert.alert('Error', 'User not found. Please login again.');
                        return;
                      }

                      try {
                        setIsDoshaSubmitting(true);
                        
                        // Check if any field is empty
                        const emptyFields = Object.entries(doshaForm).filter(([_, value]) => value === '');
                        if (emptyFields.length > 0) {
                          Alert.alert(
                            'Incomplete Form',
                            `Please fill all ${emptyFields.length} field(s) before submitting.`
                          );
                          return;
                        }

                        const response = await apiClient.submitDoshaTraits(doshaForm);
                        console.log('Dosha submission response:', response);
                        
                        Alert.alert('Success', 'Dosha assessment submitted successfully!', [
                          {
                            text: 'OK',
                            onPress: () => {
                              setIsDoshaFormOpen(false);
                              // Reset form
                              setDoshaForm({
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
                            },
                          },
                        ]);
                      } catch (error) {
                        console.error('Dosha submission error:', error);
                        Alert.alert(
                          'Error',
                          error instanceof Error ? error.message : 'Failed to submit Dosha assessment. Please try again.'
                        );
                      } finally {
                        setIsDoshaSubmitting(false);
                      }
                    }}
                    style={{ marginTop: 12, marginBottom: 12 }}
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>
          {/* Today's Stats */}
          <View style={styles.sectionContainer}>
            <Text style={styles.statsTitle}>Today's Stats</Text>
            <View style={styles.statsCard}>
              <View style={styles.statsRow}>
                <StatItem label="Calories" value="2,100" unit="kcal" />
                <View style={styles.statDivider} />
                <StatItem label="Protein" value="75" unit="g" />
                <View style={styles.statDivider} />
                <StatItem label="Meals" value="3" color="text-secondary-500" />
              </View>
            </View>
          </View>

          {/* Dosha Balance */}
          {prakriti && (
            <View style={styles.sectionContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>Dosha Balance</Text>
                <TouchableOpacity onPress={() => router.navigate('/(app)/(tabs)/analytics')}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#EE9B4D' }}>View Details →</Text>
                </TouchableOpacity>
              </View>
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
                />
                <DoshaCard
                  dosha="kapha"
                  score={prakriti.scores.kapha}
                  title="Kapha"
                  description="Water & Earth"
                />
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.sectionContainer}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>Quick Actions</Text>
            <View style={styles.buttonsGap}>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.85}
                onPress={() => router.navigate('/(app)/(tabs)/food-tracking')}
              >
                <View style={styles.actionButtonContent}>
                  <Text style={styles.actionButtonEmoji}>📸</Text>
                  <Text style={styles.actionButtonText}>Recognize Food</Text>
                </View>
                <Text style={styles.actionButtonArrow}>→</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonSecondary]}
                activeOpacity={0.85}
                onPress={() => router.navigate('/(app)/(tabs)/plans')}
              >
                <View style={styles.actionButtonContent}>
                  <Text style={styles.actionButtonEmoji}>📋</Text>
                  <Text style={styles.actionButtonText}>View Today's Plan</Text>
                </View>
                <Text style={styles.actionButtonArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Today's Tip */}
          {suggestions.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>Today's Tip</Text>
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.tipCard}
              >
                <View style={styles.tipCardContent}>
                  <Text style={styles.tipEmoji}>🌿</Text>
                  <View style={styles.tipTextContainer}>
                    <Text style={styles.tipTitle}>{suggestions[0].title}</Text>
                    <Text style={styles.tipDescription}>{suggestions[0].description}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Info Cards */}
          <View style={styles.sectionContainer}>
            <View style={styles.tipsContainer}>
              <View style={[styles.infoCard, styles.infoCardBlue]}>
                <View style={styles.infoCardContent}>
                  <Text style={styles.infoCardEmoji}>🌿</Text>
                  <View style={styles.infoCardTextContainer}>
                    <Text style={styles.infoCardTitle}>Mindful Eating</Text>
                    <Text style={styles.infoCardDescription}>
                      Chew thoroughly and eat slowly for better digestion and nutrient absorption
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.infoCard, styles.infoCardGreen]}>
                <View style={styles.infoCardContent}>
                  <Text style={styles.infoCardEmoji}>💧</Text>
                  <View style={styles.infoCardTextContainer}>
                    <Text style={styles.infoCardTitle}>Stay Hydrated</Text>
                    <Text style={styles.infoCardDescription}>
                      Drink warm water throughout the day to support digestion and balance doshas
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
