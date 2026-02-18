/**
 * Utility functions for Ayurvedic calculations and helpers
 */

import { DoshaType, Rasa, DoshaProfile } from '@/app/types/schema';

// ──────────────────────────────────────────────
// DOSHA CALCULATIONS
// ──────────────────────────────────────────────

export const getDoshaEmoji = (dosha?: DoshaType): string => {
  if (!dosha) return '🌿';
  switch (dosha.toUpperCase()) {
    case 'VATA':
      return '💨';
    case 'PITTA':
      return '🔥';
    case 'KAPHA':
      return '💧';
    default:
      return '🌿';
  }
};

export const getDoshaColor = (dosha?: DoshaType): string => {
  if (!dosha) return '#9CA3AF';
  switch (dosha.toUpperCase()) {
    case 'VATA':
      return '#A0AEC0';
    case 'PITTA':
      return '#FF9F43';
    case 'KAPHA':
      return '#48BB78';
    default:
      return '#9CA3AF';
  }
};

export const getDoshaDescription = (dosha?: DoshaType): string => {
  if (!dosha) return 'Determining your constitution...';
  switch (dosha.toUpperCase()) {
    case 'VATA':
      return 'Air & Space - Creative, Quick, Flexible';
    case 'PITTA':
      return 'Fire & Water - Driven, Intelligent, Intense';
    case 'KAPHA':
      return 'Water & Earth - Calm, Steady, Grounded';
    default:
      return 'Your unique constitution';
  }
};

export const getPrimaryDosha = (vata: number, pitta: number, kapha: number): DoshaType => {
  if (vata >= pitta && vata >= kapha) return DoshaType.VATA;
  if (pitta >= vata && pitta >= kapha) return DoshaType.PITTA;
  return DoshaType.KAPHA;
};

export const isImbalanced = (profile: DoshaProfile): boolean => {
  if (!profile) return false;

  const prakritiDoshas = [profile.prakritiVata, profile.prakritiPitta, profile.prakritiKapha];
  const vikritiDoshas = [profile.vikritiVata, profile.vikritiPitta, profile.vikritiKapha];

  // Calculate differences
  const differences = prakritiDoshas.map((prakti, idx) => Math.abs(prakti - vikritiDoshas[idx]));
  const maxDifference = Math.max(...differences);

  // If any dosha has changed by more than 15 points, consider it imbalanced
  return maxDifference > 15;
};

// ──────────────────────────────────────────────
// RASA (TASTE) HELPERS
// ──────────────────────────────────────────────

export const getRasaEmoji = (rasa: Rasa): string => {
  switch (rasa) {
    case 'MADHURA':
      return '🍯';
    case 'AMLA':
      return '🍋';
    case 'LAVANA':
      return '🧂';
    case 'KATU':
      return '🌶️';
    case 'TIKTA':
      return '🥬';
    case 'KASHAYA':
      return '🍂';
    default:
      return '🌿';
  }
};

export const getRasaLabel = (rasa: Rasa): string => {
  switch (rasa) {
    case 'MADHURA':
      return 'Sweet';
    case 'AMLA':
      return 'Sour';
    case 'LAVANA':
      return 'Salty';
    case 'KATU':
      return 'Pungent';
    case 'TIKTA':
      return 'Bitter';
    case 'KASHAYA':
      return 'Astringent';
    default:
      return 'Unknown';
  }
};

// ──────────────────────────────────────────────
// NUTRITION CALCULATIONS
// ──────────────────────────────────────────────

export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const calculateCalorieNeeds = (
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'MALE' | 'FEMALE',
  activityLevel: string,
): number => {
  // Harris-Benedict Formula
  let bmr: number;
  if (gender === 'MALE') {
    bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }

  let activityMultiplier = 1.2;
  switch (activityLevel) {
    case 'SEDENTARY':
      activityMultiplier = 1.2;
      break;
    case 'LIGHTLY_ACTIVE':
      activityMultiplier = 1.375;
      break;
    case 'MODERATELY_ACTIVE':
      activityMultiplier = 1.55;
      break;
    case 'VERY_ACTIVE':
      activityMultiplier = 1.725;
      break;
    case 'EXTREMELY_ACTIVE':
      activityMultiplier = 1.9;
      break;
  }

  return Math.round(bmr * activityMultiplier);
};

export const calculateMacroTargets = (
  calorieTarget: number,
): { protein: number; carbs: number; fat: number } => {
  return {
    protein: Math.round((calorieTarget * 0.3) / 4), // 30% = 4 cal/g
    carbs: Math.round((calorieTarget * 0.45) / 4), // 45% = 4 cal/g
    fat: Math.round((calorieTarget * 0.25) / 9), // 25% = 9 cal/g
  };
};

// ──────────────────────────────────────────────
// DATE & TIME HELPERS
// ──────────────────────────────────────────────

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 5) return '🌙 Late Night';
  if (hour < 12) return '🌅 Good Morning';
  if (hour < 17) return '☀️ Good Afternoon';
  if (hour < 21) return '🌆 Good Evening';
  return '🌙 Good Night';
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatTime = (time: string): string => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const m = minutes || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${m} ${ampm}`;
};

export const getDateRange = (days: number): { start: Date; end: Date } => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return { start, end };
};

// ──────────────────────────────────────────────
// SEASON HELPERS
// ──────────────────────────────────────────────

export const getCurrentSeason = (): string => {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'SPRING'; // March-May
  if (month >= 6 && month <= 8) return 'SUMMER'; // June-Aug
  if (month >= 9 && month <= 10) return 'MONSOON'; // Sept-Oct
  if (month === 11) return 'AUTUMN'; // Nov
  if (month === 12) return 'EARLY_WINTER'; // Dec
  return 'LATE_WINTER'; // Jan-Feb
};

// ──────────────────────────────────────────────
// COMPLIANCE CALCULATIONS
// ──────────────────────────────────────────────

export const calculateCompliance = (actual: number, target: number): number => {
  if (target === 0) return 100;
  return Math.min(Math.round((actual / target) * 100), 100);
};

export const calculateAdhereanceScore = (mealsConsumed: number, mealPlanned: number): number => {
  if (mealPlanned === 0) return 0;
  return Math.round((mealsConsumed / mealPlanned) * 100);
};

// ──────────────────────────────────────────────
// DATA VALIDATION
// ──────────────────────────────────────────────

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

export const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// ──────────────────────────────────────────────
// ARRAY & OBJECT HELPERS
// ──────────────────────────────────────────────

export const groupBy = <T, K extends keyof any>(arr: T[], key: (item: T) => K): Record<K, T[]> => {
  return arr.reduce(
    (result, item) => {
      const k = key(item);
      if (!result[k]) {
        result[k] = [];
      }
      result[k].push(item);
      return result;
    },
    {} as Record<K, T[]>,
  );
};

export const unique = <T>(arr: T[], key?: (item: T) => any): T[] => {
  if (key) {
    return arr.filter((item, index, self) => index === self.findIndex((t) => key(t) === key(item)));
  }
  return [...new Set(arr)];
};

// ──────────────────────────────────────────────
// FOOD PAIRING HELPERS
// ──────────────────────────────────────────────

export const isDoshaFriendly = (
  doshaEffect: number | undefined,
  dosha: DoshaType,
): boolean => {
  if (doshaEffect === undefined) return true;
  // Positive effect is good (1), negative (-1) or neutral (0) is okay
  return doshaEffect >= 0;
};

export const getDoshaFriendlyStatus = (effect: number | undefined): string => {
  if (effect === undefined) return 'Neutral';
  if (effect > 0) return 'Balancing';
  if (effect === 0) return 'Neutral';
  return 'Aggravating';
};

export const getGunasLabel = (qualities: string[]): string => {
  if (!qualities || qualities.length === 0) return 'Balanced';
  return qualities.map((q) => q.charAt(0).toUpperCase() + q.slice(1).toLowerCase()).join(', ');
};
