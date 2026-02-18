import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { TextInputField, SelectField, CheckboxGroup, RadioGroup } from '@/components/Forms';
import { Button } from '@/components/ui/Button';
import { saveHealthProfile } from '@/app/services/analyticsService';

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
  progressContainer: {
    marginBottom: 24,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: 4,
    width: '25%',
    backgroundColor: '#EE9B4D',
  },
  formContainer: {
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontSize: 16,
  },
  optionContainer: {
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  checkbox: {
    width: '48%',
    marginBottom: 12,
  },
});

export default function HealthProfileScreen() {
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [sleepPattern, setSleepPattern] = useState('moderate');
  const [digestiveStrength, setDigestiveStrength] = useState('moderate');
  const [stressLevel, setStressLevel] = useState('moderate');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDietaryPreferenceToggle = (id: string, checked: boolean) => {
    if (checked) {
      setDietaryPreferences([...dietaryPreferences, id]);
    } else {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== id));
    }
  };

  const handleNext = async () => {
    if (!age || !weight || !height) {
      alert('Please fill in basic information');
      return;
    }

    setLoading(true);
    try {
      await saveHealthProfile({
        age: parseInt(age),
        weight: parseInt(weight),
        height: parseInt(height),
        activityLevel: activityLevel as any,
        sleepPattern: sleepPattern as any,
        digestiveStrength: digestiveStrength as any,
        stressLevel: stressLevel as any,
        dietaryPreferences,
        allergies: allergies.split(',').map(a => a.trim()).filter(a => a),
        healthConditions: healthConditions.split(',').map(h => h.trim()).filter(h => h)
      });
      setLoading(false);
      router.push('/(app)/onboarding/prakriti-assessment');
    } catch (error) {
      setLoading(false);
      alert('Error saving profile. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <Text style={styles.title}>Health Profile</Text>
          <Text style={styles.subtitle}>
            Help us understand your health to provide personalized guidance
          </Text>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <TextInputField
                label="Age"
                placeholder="e.g., 30"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInputField
                label="Weight (kg)"
                placeholder="e.g., 70"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInputField
                label="Height (cm)"
                placeholder="e.g., 170"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldContainer}>
              <SelectField
                label="Activity Level"
                options={[
                  { id: 'sedentary', label: 'Sedentary (little exercise)' },
                  { id: 'light', label: 'Light (1-3 days/week)' },
                  { id: 'moderate', label: 'Moderate (3-5 days/week)' },
                  { id: 'active', label: 'Active (6-7 days/week)' },
                  { id: 'veryActive', label: 'Very Active (intense workouts)' }
                ]}
                selectedValue={activityLevel}
                onSelect={setActivityLevel}
              />
            </View>

            <View style={styles.fieldContainer}>
              <RadioGroup
                label="Sleep Pattern"
                options={[
                  { id: 'early', label: 'Early sleeper (bed by 9 PM)' },
                  { id: 'moderate', label: 'Moderate (bed by 10-11 PM)' },
                  { id: 'late', label: 'Late sleeper (bed after 11 PM)' }
                ]}
                selectedValue={sleepPattern}
                onSelect={setSleepPattern}
              />
            </View>

            <View style={styles.fieldContainer}>
              <RadioGroup
                label="Digestive Strength"
                options={[
                  { id: 'weak', label: 'Weak (frequent bloating)' },
                  { id: 'moderate', label: 'Moderate (usually fine)' },
                  { id: 'strong', label: 'Strong (can digest anything)' }
                ]}
                selectedValue={digestiveStrength}
                onSelect={setDigestiveStrength}
              />
            </View>

            <View style={styles.fieldContainer}>
              <RadioGroup
                label="Stress Level"
                options={[
                  { id: 'low', label: 'Low (generally calm)' },
                  { id: 'moderate', label: 'Moderate (sometimes stressed)' },
                  { id: 'high', label: 'High (frequently stressed)' }
                ]}
                selectedValue={stressLevel}
                onSelect={setStressLevel}
              />
            </View>

            <View style={styles.fieldContainer}>
              <CheckboxGroup
                label="Dietary Preferences"
                options={[
                  { id: 'vegetarian', label: 'Vegetarian' },
                  { id: 'vegan', label: 'Vegan' },
                  { id: 'nonVegetarian', label: 'Non-vegetarian' },
                  { id: 'glutenFree', label: 'Gluten-free' },
                  { id: 'dairyFree', label: 'Dairy-free' }
                ]}
                selectedValues={dietaryPreferences}
                onToggle={handleDietaryPreferenceToggle}
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInputField
                label="Allergies (if any)"
                placeholder="e.g., peanuts, shellfish"
                value={allergies}
                onChangeText={setAllergies}
                multiline
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInputField
                label="Health Conditions (if any)"
                placeholder="e.g., diabetes, hypertension"
                value={healthConditions}
                onChangeText={setHealthConditions}
                multiline
              />
            </View>

            <Button
              title={loading ? 'Saving...' : 'Continue'}
              onPress={handleNext}
              disabled={loading}
              style={{ marginTop: 32 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
