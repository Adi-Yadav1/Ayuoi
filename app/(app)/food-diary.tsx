/**
 * Food Diary & Meal Tracking Screen
 * Log daily food intake with Ayurvedic analysis
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
  Modal,
  FlatList,
} from 'react-native';
import { useAuth } from '@/app/context/AuthContext';
import { useFoodDiary, useDailyNutrientLog } from '@/app/hooks/useApi';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Rasa, MealType } from '@/app/types/schema';

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
  nutritionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  nutritionItem: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  nutritionUnit: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  mealContainer: {
    marginBottom: 16,
  },
  mealTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    marginBottom: 12,
  },
  mealTypeButtonActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FBBF24',
  },
  mealTypeEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  mealTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#EE9B4D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  foodItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  foodItemEmoji: {
    fontSize: 24,
    marginRight: 12,
    width: 40,
  },
  foodItemInfo: {
    flex: 1,
  },
  foodItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  foodItemDetails: {
    fontSize: 12,
    color: '#6B7280',
  },
  foodItemCalories: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EE9B4D',
  },
  rasaBadge: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    marginRight: 6,
  },
  rasaBadgeText: {
    fontSize: 11,
    color: '#92400E',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#EF4444',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  ayurvedicSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  ayurvedicLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EA580C',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  rasaContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
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
  },
  mealTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mealTypeOption: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  mealTypeOptionActive: {
    backgroundColor: '#EE9B4D',
    borderColor: '#EE9B4D',
  },
  mealTypeOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
  },
  mealTypeOptionTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#EE9B4D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
});

const mealTypeEmojis: Record<MealType, string> = {
  EARLY_MORNING: '🌅',
  BREAKFAST: '🥣',
  MID_MORNING_SNACK: '☕',
  LUNCH: '🍛',
  AFTERNOON_SNACK: '🥤',
  EVENING_SNACK: '🍪',
  DINNER: '🍜',
  BEDTIME: '🥛',
};

const rasaEmojis: Record<Rasa, string> = {
  MADHURA: '🍯',
  AMLA: '🍋',
  LAVANA: '🧂',
  KATU: '🌶️',
  TIKTA: '🥬',
  KASHAYA: '🍂',
};

interface FoodEntry {
  foodName?: string;
  quantity?: number;
  calories?: number;
  rasa?: Rasa[];
  mealType?: MealType | null;
  notes?: string;
}

export default function FoodDiaryScreen() {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const { entries, totalCalories, addEntry, deleteEntry } = useFoodDiary(user?.id || null, today);
  const { nutrientLog } = useDailyNutrientLog(user?.id || null, today);

  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState<FoodEntry>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddFood = async () => {
    if (!newEntry?.foodName) {
      alert('Please enter food name');
      return;
    }

    try {
      setIsSubmitting(true);
      await addEntry({
        foodName: newEntry.foodName,
        quantityG: newEntry.quantity,
        calories: newEntry.calories,
        rasa: newEntry.rasa,
        mealType: selectedMealType === null ? undefined : selectedMealType,
        date: today,
        notes: newEntry.notes,
        source: 'MANUAL',
      });

      setNewEntry({});
      setSelectedMealType(null);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add food', error);
      alert('Failed to add food entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mealTypes = Object.keys(mealTypeEmojis) as MealType[];
  const groupedEntries = entries.reduce((acc, entry) => {
    const mealType = entry.mealType || 'OTHER';
    if (!acc[mealType]) acc[mealType] = [];
    acc[mealType].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  const calorieTarget = nutrientLog?.calorieTarget || 2000;
  const calorieCompliance = nutrientLog?.calorieCompliance || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍽️ Food Diary</Text>
          <Text style={styles.headerSubtitle}>Track your daily food intake with Ayurvedic insights</Text>
        </View>

        {/* Content */}
        <View style={styles.mainContent}>
          {/* Calorie Overview */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitleEmoji}>🔥</Text>
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Calorie Intake</Text>
            </View>

            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Consumed</Text>
                <Text style={styles.nutritionValue}>{Math.round(totalCalories)}</Text>
                <Text style={styles.nutritionUnit}>kcal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Target</Text>
                <Text style={styles.nutritionValue}>{calorieTarget}</Text>
                <Text style={styles.nutritionUnit}>kcal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Remaining</Text>
                <Text style={styles.nutritionValue}>
                  {Math.max(0, calorieTarget - totalCalories)}
                </Text>
                <Text style={styles.nutritionUnit}>kcal</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>{Math.round(calorieCompliance)}% of daily goal</Text>
              <ProgressBar progress={Math.min(calorieCompliance, 100)} color="primary" height={10} />
            </View>
          </View>

          {/* Meals by Type */}
          {mealTypes.map((mealType) => (
            groupedEntries[mealType] && groupedEntries[mealType].length > 0 && (
              <View key={mealType} style={styles.card}>
                <View style={styles.mealContainer}>
                  <View style={styles.mealTypeButton}>
                    <Text style={styles.mealTypeEmoji}>{mealTypeEmojis[mealType]}</Text>
                    <Text style={styles.mealTypeLabel}>
                      {mealType.replace(/_/g, ' ').charAt(0).toUpperCase() +
                        mealType.replace(/_/g, ' ').slice(1).toLowerCase()}
                    </Text>
                  </View>

                  {groupedEntries[mealType].map((entry, index) => (
                    <View key={index} style={styles.foodItem}>
                      <Text style={styles.foodItemEmoji}>🍴</Text>
                      <View style={styles.foodItemInfo}>
                        <Text style={styles.foodItemName}>{entry.foodName}</Text>
                        {entry.quantityG && (
                          <Text style={styles.foodItemDetails}>{entry.quantityG}g</Text>
                        )}
                        {entry.rasa && entry.rasa.length > 0 && (
                          <View style={styles.rasaContainer}>
                            {entry.rasa.map((r, i) => (
                              <View key={i} style={styles.rasaBadge}>
                                <Text style={styles.rasaBadgeText}>{rasaEmojis[r]}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.foodItemCalories}>
                          {entry.calories || 0}
                        </Text>
                        <Text style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>kcal</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteEntry(entry.id)}
                      >
                        <Text style={styles.deleteButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )
          ))}

          {/* Add Food Button */}
          <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
            <Text style={styles.addButtonText}>+ Add Food Entry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Food Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Food</Text>

            {/* Meal Type Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Select Meal Type</Text>
              <View style={styles.mealTypeGrid}>
                {mealTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.mealTypeOption,
                      selectedMealType === type && styles.mealTypeOptionActive,
                    ]}
                    onPress={() => setSelectedMealType(type)}
                  >
                    <Text style={{ fontSize: 20 }}>{mealTypeEmojis[type]}</Text>
                    <Text
                      style={[
                        styles.mealTypeOptionText,
                        selectedMealType === type && styles.mealTypeOptionTextActive,
                      ]}
                    >
                      {type.split('_')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Food Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Food Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter food name"
                value={newEntry.foodName || ''}
                onChangeText={(text) => setNewEntry({ ...newEntry, foodName: text })}
              />
            </View>

            {/* Quantity */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Quantity (grams)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter quantity"
                keyboardType="number-pad"
                value={newEntry.quantity?.toString() || ''}
                onChangeText={(text) => setNewEntry({ ...newEntry, quantity: parseFloat(text) })}
              />
            </View>

            {/* Calories */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Calories (kcal)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter calories"
                keyboardType="number-pad"
                value={newEntry.calories?.toString() || ''}
                onChangeText={(text) => setNewEntry({ ...newEntry, calories: parseFloat(text) })}
              />
            </View>

            {/* Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                style={[styles.textInput, { height: 60, textAlignVertical: 'top' }]}
                placeholder="Add notes"
                multiline
                value={newEntry.notes || ''}
                onChangeText={(text) => setNewEntry({ ...newEntry, notes: text })}
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddFood}
              disabled={isSubmitting}
            >
              <Text style={styles.addButtonText}>{isSubmitting ? 'Saving...' : 'Add Food'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
