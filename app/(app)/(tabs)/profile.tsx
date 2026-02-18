import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { getPrakritiResultAsync } from '@/app/services/prakritiService';
import { getHealthProfile } from '@/app/services/analyticsService';
import { Card, Section, Button, Loader } from '@/components/ui/Button';
import { PrakritiResult, HealthProfile } from '@/app/types';
import { useAuth } from '@/app/context/AuthContext';

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    color: '#6B7280',
    marginTop: 4,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#FEF3C7',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  doshaContainer: {
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doshaEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  doshaInfo: {
    flex: 1,
  },
  doshaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'capitalize',
  },
  doshaSecondary: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  doshaDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: {
    color: '#374151',
  },
  scoreValueVata: {
    fontWeight: 'bold',
    color: '#A0AEC0',
  },
  scoreValuePitta: {
    fontWeight: 'bold',
    color: '#FF9F43',
  },
  scoreValueKapha: {
    fontWeight: 'bold',
    color: '#48BB78',
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  healthLabel: {
    color: '#6B7280',
  },
  healthValue: {
    fontWeight: 'bold',
    color: '#111827',
  },
  prefTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  prefTagText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  allergyContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 16,
  },
  allergyTitle: {
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 8,
  },
  allergyText: {
    color: '#7F1D1D',
    fontSize: 14,
  },
  settingButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  settingButtonText: {
    fontWeight: 'bold',
    color: '#111827',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  versionText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  versionCopyright: {
    color: '#D1D5DB',
    fontSize: 12,
    marginTop: 8,
  },
});

export default function ProfileScreen() {
  const { user } = useAuth();
  const [prakriti, setPrakriti] = useState<PrakritiResult | null>(null);
  const [health, setHealth] = useState<HealthProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const [prakritiData, healthData] = await Promise.all([
        getPrakritiResultAsync('user_1'),
        getHealthProfile('user_1')
      ]);
      setPrakriti(prakritiData);
      setHealth(healthData);
    } catch (error) {
      console.error('Error loading profile:', error);
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
          <View style={styles.headerContainer}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Profile</Text>
              <Text style={styles.subtitle}>Your wellness summary</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>

          {/* User Info */}
          <Section title="User Information">
            <Card>
              <View>
                <View style={styles.healthRow}>
                  <Text style={styles.healthLabel}>Name</Text>
                  <Text style={styles.healthValue}>{user?.username || 'User'}</Text>
                </View>
                <View style={styles.healthRow}>
                  <Text style={styles.healthLabel}>Email</Text>
                  <Text style={[styles.healthValue, { fontSize: 12 }]}>{user?.email || 'Not available'}</Text>
                </View>
                <View style={[styles.healthRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                  <Text style={styles.healthLabel}>Member Since</Text>
                  <Text style={styles.healthValue}>
                    {user?.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })
                      : 'Jan 2024'
                    }
                  </Text>
                </View>
              </View>
            </Card>
          </Section>

          {/* Prakriti Summary */}
          {prakriti && (
            <Section title="Your Prakriti">
              <Card style={styles.doshaContainer}>
                <View style={{ marginRight: 16 }}>
                  <Text style={styles.doshaEmoji}>
                    {prakriti.primaryDosha === 'vata' && '💨'}
                    {prakriti.primaryDosha === 'pitta' && '🔥'}
                    {prakriti.primaryDosha === 'kapha' && '💧'}
                  </Text>
                </View>
                <View style={styles.doshaInfo}>
                  <Text style={styles.doshaName}>{prakriti.primaryDosha}</Text>
                  <Text style={styles.doshaSecondary}>Secondary: {prakriti.secondaryDosha}</Text>
                  <Text style={styles.doshaDate}>
                    Determined {new Date(prakriti.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </Card>

              <Card>
                <View>
                  <Text style={{ fontWeight: '600', color: '#111827', marginBottom: 12 }}>Dosha Scores</Text>
                  <View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLabel}>Vata</Text>
                      <Text style={styles.scoreValueVata}>{prakriti.scores.vata}%</Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLabel}>Pitta</Text>
                      <Text style={styles.scoreValuePitta}>{prakriti.scores.pitta}%</Text>
                    </View>
                    <View style={[styles.scoreRow, { marginBottom: 0 }]}>
                      <Text style={styles.scoreLabel}>Kapha</Text>
                      <Text style={styles.scoreValueKapha}>{prakriti.scores.kapha}%</Text>
                    </View>
                  </View>
                </View>
              </Card>

              <Button
                title="View Detailed Prakriti Report"
                variant="outline"
                style={{ marginTop: 16 }}
                onPress={() => alert('Detailed report view coming soon!')}
              />
            </Section>
          )}

          {/* Health Profile */}
          {health && (
            <Section title="Health Profile">
              <Card style={{ marginBottom: 16 }}>
                <View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Age</Text>
                    <Text style={styles.healthValue}>{health.age} years</Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Height</Text>
                    <Text style={styles.healthValue}>{health.height} cm</Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Weight</Text>
                    <Text style={styles.healthValue}>{health.weight} kg</Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Activity Level</Text>
                    <Text style={[styles.healthValue, { textTransform: 'capitalize' }]}>
                      {health.activityLevel}
                    </Text>
                  </View>
                  <View style={styles.healthRow}>
                    <Text style={styles.healthLabel}>Sleep Pattern</Text>
                    <Text style={[styles.healthValue, { textTransform: 'capitalize' }]}>
                      {health.sleepPattern}
                    </Text>
                  </View>
                  <View style={[styles.healthRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Text style={styles.healthLabel}>Stress Level</Text>
                    <Text style={[styles.healthValue, { textTransform: 'capitalize' }]}>
                      {health.stressLevel}
                    </Text>
                  </View>
                </View>
              </Card>

              {health.dietaryPreferences.length > 0 && (
                <Card style={{ marginBottom: 16 }}>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: '#111827', marginBottom: 8 }}>Dietary Preferences</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {health.dietaryPreferences.map((pref, idx) => (
                        <View key={idx} style={styles.prefTag}>
                          <Text style={styles.prefTagText}>{pref}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Card>
              )}

              {health.allergies.length > 0 && (
                <Card style={styles.allergyContainer}>
                  <View>
                    <Text style={styles.allergyTitle}>Allergies</Text>
                    <Text style={styles.allergyText}>{health.allergies.join(', ')}</Text>
                  </View>
                </Card>
              )}
            </Section>
          )}

          {/* Settings */}
          <Section title="Settings">
            <View>
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.settingButton, { marginBottom: 0 }]}>
                <Text style={styles.settingButtonText}>About</Text>
              </TouchableOpacity>
            </View>
          </Section>

          {/* Logout */}
          <Button
            title="🚪 Log Out"
            variant="outline"
            style={{ marginTop: 32, marginBottom: 32, borderColor: '#FCA5A5' }}
            onPress={() => {
              router.replace('/(auth)/login');
            }}
          />

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Veda v1.0.0</Text>
            <Text style={styles.versionCopyright}>© 2024 Ayurvedic Wellness</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
