// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  createdAt: string;
}

// Dosha Types
export type DoeshaType = "vata" | "pitta" | "kapha";

export interface DoshaScore {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface PrakritiResult {
  id: string;
  userId: string;
  primaryDosha: DoeshaType;
  secondaryDosha: DoeshaType;
  scores: DoshaScore;
  characteristics: string[];
  recommendations: string[];
  feedingHabits: string[];
  createdAt: string;
}

// Health Profile Types
export interface HealthProfile {
  id: string;
  userId: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "veryActive";
  dietaryPreferences: string[];
  allergies: string[];
  healthConditions: string[];
  sleepPattern: "early" | "moderate" | "late";
  digestiveStrength: "weak" | "moderate" | "strong";
  stressLevel: "low" | "moderate" | "high";
  createdAt: string;
  updatedAt: string;
}

// Meal Plan Types
export interface MealItem {
  id: string;
  name: string;
  description: string;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  dosha: DoeshaType[];
  benefits: string[];
  cautions: string[];
  season: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  dosha: DoeshaType;
  meals: MealItem[];
  createdAt: string;
  validUntil: string;
}

// Food Tracking Types
export interface RecognizedFood {
  id: string;
  name: string;
  category: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  dosha: DoshaScore;
  doshaImpact: {
    [key in DoeshaType]: "balancing" | "aggravating";
  };
  servingSize: string;
  servingUnit: "g" | "ml" | "cup" | "tbsp";
}

export interface FoodEntry {
  id: string;
  userId: string;
  food: RecognizedFood;
  imageUrl: string;
  servingSize: number;
  servingUnit: string;
  timestamp: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

// Dietary Suggestion Types
export interface DietarySuggestion {
  id: string;
  title: string;
  description: string;
  dosha: DoeshaType;
  category: "food" | "timing" | "lifestyle" | "digestion";
  priority: "low" | "medium" | "high";
  actionableSteps: string[];
  alternatives: string[];
}

// Analytics Types
export interface DailyAnalytics {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  doshaBalance: DoshaScore;
  aggregatingFoods: string[];
  balancingFoods: string[];
}

export interface WeeklyAnalytics {
  weekStart: string;
  weekEnd: string;
  averageCalories: number;
  doshaBalance: DoshaScore;
  mealConsistency: number;
  foodDiversity: number;
  suggestions: DietarySuggestion[];
}

// Form Input Types
export interface PrakritiAssessmentAnswers {
  bodyType: string;
  skinType: string;
  hairType: string;
  appetite: string;
  digestion: string;
  sleepQuality: string;
  sleepDuration: string;
  temperament: string;
  emotionalState: string;
  preferredTemperature: string;
  physicalActivity: string;
  flexibility: string;
}

// Health Profile Form
export interface HealthProfileForm {
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  sleepPattern: string;
  digestiveStrength: string;
  stressLevel: string;
  dietaryPreferences: string[];
  allergies: string;
  healthConditions: string;
}

// ──────────────────────────────────────────────
// DOCTOR TYPES
// ──────────────────────────────────────────────

export type BookingStatus = "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  description?: string;
  education?: string;
  qualification?: string;
  languages: string[];
  bio?: string;
  imageUrl?: string;
  phone?: string;
  email?: string;
  gender?: string;
  location?: string;
  consultationFee: number;
  experienceYears: number;
  rating: number;
  totalRatings: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorSlot {
  id: string;
  doctorId: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  isBooked: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  doctorId: string;
  slotId: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  doctor?: Doctor;
  slot?: DoctorSlot;
}

export interface DoctorListResponse {
  doctors: Doctor[];
  specialties: string[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DoctorDetailsResponse {
  doctor: Doctor;
  slots: DoctorSlot[];
  availableDates: string[];
}

export interface SlotsResponse {
  slots: DoctorSlot[];
}
