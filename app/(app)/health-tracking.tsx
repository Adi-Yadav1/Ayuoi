/**
 * Health Tracking Screen
 * Comprehensive health metrics logging and visualization
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/app/context/AuthContext';
import { useHealthTracking } from '@/app/hooks/useApi';
import { ProgressBar } from '@/components/ui/ProgressBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#EE9B4D',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
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
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#EE9B4D',
    marginLeft: 12,
  },
  metricUnit: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  inputSection: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  scaleContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  scaleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scaleButtonActive: {
    backgroundColor: '#EE9B4D',
    borderColor: '#EE9B4D',
  },
  scaleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  scaleButtonTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#EE9B4D',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  gridEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  trendContainer: {
    height: 120,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  trendBar: {
    width: 8,
    backgroundColor: '#EE9B4D',
    marginHorizontal: 4,
    borderRadius: 4,
  },
});

interface HealthMetrics {
  weight?: number;
  systolic?: number;
  diastolic?: number;
  heartRate?: number;
  energyLevel?: number;
  mentalClarity?: number;
  digestiveComfort?: number;
  skinClarity?: number;
  symptoms?: string[];
  notes?: string;
}

export default function HealthTrackingScreen() {
  const { user } = useAuth();
  const { logs, loading, logMetrics } = useHealthTracking(user?.id || null, 7);

  const [metrics, setMetrics] = useState<HealthMetrics>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogMetrics = async () => {
    if (!user) return;

    try {
      setIsSubmitting(true);
      await logMetrics({
        date: new Date().toISOString().split('T')[0] as any,
        ...metrics,
      });

      // Reset form
      setMetrics({});
      alert('Health metrics logged successfully!');
    } catch (error) {
      console.error('Failed to log metrics', error);
      alert('Failed to log metrics');
    } finally {
      setIsSubmitting(false);
    }
  };

  const lastLog = logs?.[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📊 Health Tracking</Text>
          <Text style={styles.headerSubtitle}>Log and monitor your daily health metrics</Text>
        </View>

        {/* Content */}
        <View style={styles.mainContent}>
          {/* Today's Metrics Summary */}
          {lastLog && (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={styles.sectionTitleEmoji}>⭐</Text>
                <Text style={styles.sectionTitle}>Today's Summary</Text>
              </View>

              <View style={styles.gridContainer}>
                {lastLog.weightKg && (
                  <View style={styles.gridItem}>
                    <Text style={styles.gridEmoji}>⚖️</Text>
                    <Text style={styles.gridLabel}>Weight</Text>
                    <Text style={styles.gridValue}>{lastLog.weightKg}</Text>
                    <Text style={styles.gridLabel}>kg</Text>
                  </View>
                )}
                {lastLog.energyLevel && (
                  <View style={styles.gridItem}>
                    <Text style={styles.gridEmoji}>⚡</Text>
                    <Text style={styles.gridLabel}>Energy</Text>
                    <Text style={styles.gridValue}>{lastLog.energyLevel}</Text>
                    <Text style={styles.gridLabel}>/10</Text>
                  </View>
                )}
              </View>

              {lastLog.restingHeartRate && (
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>💓 Resting Heart Rate</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={styles.metricValue}>{lastLog.restingHeartRate}</Text>
                    <Text style={styles.metricUnit}>bpm</Text>
                  </View>
                </View>
              )}

              {lastLog.bloodPressureSystolic && (
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>🩸 Blood Pressure</Text>
                  <Text style={styles.metricValue}>
                    {lastLog.bloodPressureSystolic}/{lastLog.bloodPressureDiastolic}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Log New Metrics */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitleEmoji}>📝</Text>
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Log Metrics</Text>
            </View>

            <View style={styles.inputSection}>
              {/* Weight */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>⚖️ Weight (kg)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter weight"
                  keyboardType="decimal-pad"
                  value={metrics.weight?.toString() || ''}
                  onChangeText={(text) => setMetrics({ ...metrics, weight: parseFloat(text) })}
                />
              </View>

              {/* Blood Pressure */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>🩸 Blood Pressure (Systolic)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter systolic pressure"
                  keyboardType="number-pad"
                  value={metrics.systolic?.toString() || ''}
                  onChangeText={(text) => setMetrics({ ...metrics, systolic: parseInt(text) })}
                />
              </View>

              {/* Heart Rate */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>💓 Resting Heart Rate (bpm)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter heart rate"
                  keyboardType="number-pad"
                  value={metrics.heartRate?.toString() || ''}
                  onChangeText={(text) => setMetrics({ ...metrics, heartRate: parseInt(text) })}
                />
              </View>

              {/* Energy Level */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>⚡ Energy Level (1-10)</Text>
                <View style={styles.scaleContainer}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.scaleButton,
                        metrics.energyLevel === level && styles.scaleButtonActive,
                      ]}
                      onPress={() => setMetrics({ ...metrics, energyLevel: level })}
                    >
                      <Text
                        style={[
                          styles.scaleButtonText,
                          metrics.energyLevel === level && styles.scaleButtonTextActive,
                        ]}
                      >
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Mental Clarity */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>🧠 Mental Clarity (1-10)</Text>
                <View style={styles.scaleContainer}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.scaleButton,
                        metrics.mentalClarity === level && styles.scaleButtonActive,
                      ]}
                      onPress={() => setMetrics({ ...metrics, mentalClarity: level })}
                    >
                      <Text
                        style={[
                          styles.scaleButtonText,
                          metrics.mentalClarity === level && styles.scaleButtonTextActive,
                        ]}
                      >
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Digestive Comfort */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>🫖 Digestive Comfort (1-10)</Text>
                <View style={styles.scaleContainer}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.scaleButton,
                        metrics.digestiveComfort === level && styles.scaleButtonActive,
                      ]}
                      onPress={() => setMetrics({ ...metrics, digestiveComfort: level })}
                    >
                      <Text
                        style={[
                          styles.scaleButtonText,
                          metrics.digestiveComfort === level && styles.scaleButtonTextActive,
                        ]}
                      >
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Notes */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>📌 Notes</Text>
                <TextInput
                  style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                  placeholder="Add any additional notes"
                  multiline
                  value={metrics.notes || ''}
                  onChangeText={(text) => setMetrics({ ...metrics, notes: text })}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleLogMetrics}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Saving...' : 'Save Metrics'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recent History */}
          {logs && logs.length > 1 && (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={styles.sectionTitleEmoji}>📋</Text>
                <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Recent History</Text>
              </View>

              {logs.slice(0, 7).map((log, index) => (
                <View key={index} style={styles.metricRow}>
                  <Text style={styles.metricLabel}>
                    {new Date(log.date).toLocaleDateString()}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {log.energyLevel && (
                      <Text style={styles.metricValue}>{log.energyLevel}⚡</Text>
                    )}
                    {log.weightKg && <Text style={styles.metricValue}>{log.weightKg}kg</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
