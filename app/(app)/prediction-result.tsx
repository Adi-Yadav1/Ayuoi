import React, { useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EC',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E2A24',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B5E4B',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF0DE',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F2D2B5',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2A24',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E58B3A',
  },
  listItem: {
    marginBottom: 10,
  },
  listLabel: {
    fontSize: 12,
    color: '#6B5E4B',
    marginBottom: 2,
  },
  listValue: {
    fontSize: 14,
    color: '#2E2A24',
    fontWeight: '600',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#E6F6EA',
    borderWidth: 1,
    borderColor: '#D8F2DE',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#2E2A24',
    fontWeight: '600',
  },
});

type ParsedResult = {
  success?: boolean;
  message?: string;
  data?: {
    prediction?: {
      inputData?: Record<string, string>;
      prakritiType?: string;
      imbalanceType?: string;
      imbalances?: string[];
    };
    prakritiType?: string;
    imbalanceType?: string;
    imbalances?: string[];
  };
  prediction?: {
    inputData?: Record<string, string>;
    prakritiType?: string;
    imbalanceType?: string;
    imbalances?: string[];
  };
  prakritiType?: string;
  imbalanceType?: string;
  imbalances?: string[];
};

export default function PredictionResultScreen() {
  const { type, data } = useLocalSearchParams<{ type?: string; data?: string }>();

  const parsed = useMemo<ParsedResult | null>(() => {
    if (!data || typeof data !== 'string') return null;
    try {
      return JSON.parse(data) as ParsedResult;
    } catch {
      return null;
    }
  }, [data]);

  const prediction = parsed?.data?.prediction || parsed?.prediction;
  const inputData = prediction?.inputData || {};
  const prakritiType = parsed?.data?.prakritiType || prediction?.prakritiType || parsed?.prakritiType;
  const imbalanceType = parsed?.data?.imbalanceType || prediction?.imbalanceType || parsed?.imbalanceType;
  const imbalances = parsed?.data?.imbalances || prediction?.imbalances || parsed?.imbalances || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {type === 'dosha' ? 'Dosha Prediction' : 'Prakriti Prediction'}
        </Text>
        <Text style={styles.subtitle}>Results for your latest assessment</Text>

        {type === 'dosha' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Imbalance Type</Text>
            <Text style={styles.valueText}>{imbalanceType || 'Not available'}</Text>
            {imbalances.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.cardTitle}>Imbalances</Text>
                {imbalances.map((item) => (
                  <Text key={item} style={styles.listValue}>{item}</Text>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Prakriti Type</Text>
            <Text style={styles.valueText}>{prakritiType || 'Not available'}</Text>
          </View>
        )}

        {Object.keys(inputData).length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Submitted Inputs</Text>
            {Object.entries(inputData).map(([key, value]) => (
              <View key={key} style={styles.listItem}>
                <Text style={styles.listLabel}>{key.replace(/_/g, ' ')}</Text>
                <Text style={styles.listValue}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
