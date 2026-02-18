import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { RadioGroup } from '@/components/Forms';
import { Button } from '@/components/ui/Button';
import { assessPrakriti } from '@/app/services/prakritiService';
import { PrakritiAssessmentAnswers } from '@/app/types';

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
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EE9B4D',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#EE9B4D',
  },
  questionsContainer: {
    marginBottom: 32,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  submitButton: {
    marginBottom: 16,
  },
  footerText: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 32,
  },
});

const assessmentQuestions = [
  { key: 'bodyType', label: 'Body Type', options: [
    { id: 'lightSlim', label: 'Light and slim' },
    { id: 'mediumMusclular', label: 'Medium and muscular' },
    { id: 'heavyRobust', label: 'Heavy and robust' }
  ]},
  { key: 'skinType', label: 'Skin Type', options: [
    { id: 'drySensitive', label: 'Dry and sensitive' },
    { id: 'fairReddish', label: 'Fair and reddish' },
    { id: 'paleWhitish', label: 'Pale and whitish' }
  ]},
  { key: 'hairType', label: 'Hair Type', options: [
    { id: 'thinDryWiry', label: 'Thin, dry, wiry' },
    { id: 'fairFineStraight', label: 'Fair, fine, straight' },
    { id: 'thickCurlyOily', label: 'Thick, curly, oily' }
  ]},
  { key: 'appetite', label: 'Appetite', options: [
    { id: 'variableIrregular', label: 'Variable and irregular' },
    { id: 'sharpIncreased', label: 'Sharp and increased' },
    { id: 'lowOozing', label: 'Low or oozing' }
  ]},
  { key: 'digestion', label: 'Digestion', options: [
    { id: 'delicateIrregular', label: 'Delicate and irregular' },
    { id: 'efficient', label: 'Efficient' },
    { id: 'slowGravy', label: 'Slow with mucus' }
  ]},
  { key: 'sleepQuality', label: 'Sleep Quality', options: [
    { id: 'lightRestless', label: 'Light and restless' },
    { id: 'fitfulInterrupted', label: 'Fitful and interrupted' },
    { id: 'heavyHeavy', label: 'Heavy and deep' }
  ]},
  { key: 'sleepDuration', label: 'Sleep Duration', options: [
    { id: 'poorlyDefined', label: 'Poorly defined (varies)' },
    { id: 'mediumDefined', label: 'Medium defined (6-7 hrs)' },
    { id: 'largeWellDefined', label: 'Long and well-defined (8+ hrs)' }
  ]},
  { key: 'temperament', label: 'Temperament', options: [
    { id: 'quickChanging', label: 'Quick and changeable' },
    { id: 'focusedIntense', label: 'Focused and intense' },
    { id: 'calm', label: 'Calm and steady' }
  ]},
  { key: 'emotionalState', label: 'Emotional State', options: [
    { id: 'anxiousNervous', label: 'Anxious and nervous' },
    { id: 'irritableImpatient', label: 'Irritable and impatient' },
    { id: 'stable', label: 'Stable and contented' }
  ]},
  { key: 'preferredTemperature', label: 'Preferred Temperature', options: [
    { id: 'coldWind', label: 'Warm (dislike cold & wind)' },
    { id: 'hotSun', label: 'Cool (dislike heat)' },
    { id: 'coldDamp', label: 'Warm (dislike damp & cold)' }
  ]},
  { key: 'physicalActivity', label: 'Physical Activity', options: [
    { id: 'irregularsporadic', label: 'Irregular and sporadic' },
    { id: 'moderate', label: 'Regular and moderate' },
    { id: 'minimalsedentary', label: 'Minimal (sedentary)' }
  ]},
  { key: 'flexibility', label: 'Flexibility', options: [
    { id: 'looseflexible', label: 'Loose and flexible' },
    { id: 'moderate_flex', label: 'Moderate flexibility' },
    { id: 'stiffrigid', label: 'Stiff and rigid' }
  ]}
];

export default function PrakritiAssessmentScreen() {
  const [answers, setAnswers] = useState<Partial<PrakritiAssessmentAnswers>>({});
  const [loading, setLoading] = useState(false);

  const totalQuestions = assessmentQuestions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (key: string, value: string) => {
    setAnswers({
      ...answers,
      [key]: value
    });
  };

  const handleSubmit = async () => {
    if (answeredQuestions < totalQuestions) {
      alert(`Please answer all ${totalQuestions} questions`);
      return;
    }

    setLoading(true);
    try {
      const result = assessPrakriti(answers as PrakritiAssessmentAnswers);
      setLoading(false);
      
      // Save result and navigate to results screen
      router.push({
        pathname: '/(app)/onboarding/prakriti-result',
        params: { result: JSON.stringify(result) }
      });
    } catch (error) {
      setLoading(false);
      alert('Error analyzing assessment. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <Text style={styles.title}>Prakriti Assessment</Text>
          <Text style={styles.subtitle}>
            Answer these questions about your nature to determine your Dosha
          </Text>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressValue}>{answeredQuestions}/{totalQuestions}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[styles.progressBar, { width: `${progress}%` }]}
              />
            </View>
          </View>

          {/* Questions */}
          <View style={styles.questionsContainer}>
            {assessmentQuestions.map((question, index) => (
              <View key={question.key} style={styles.questionContainer}>
                <Text style={styles.questionLabel}>
                  {index + 1}. {question.label}
                </Text>
                <RadioGroup
                  label=""
                  options={question.options}
                  selectedValue={answers[question.key as keyof PrakritiAssessmentAnswers] || ''}
                  onSelect={(value) => handleAnswer(question.key, value)}
                />
              </View>
            ))}
          </View>

          {/* Submit Button */}
          <Button
            title={loading ? 'Analyzing...' : 'Get My Prakriti'}
            onPress={handleSubmit}
            disabled={loading || answeredQuestions < totalQuestions}
            style={styles.submitButton}
          />

          <Text style={styles.footerText}>
            Based on Ayurvedic principles, we&apos;ll analyze your responses to determine your unique constitution
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
