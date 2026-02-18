/**
 * TypeScript types derived from Prisma schema
 * This file contains all frontend-compatible interfaces for backend models
 */

// ──────────────────────────────────────────────
// ENUMS
// ──────────────────────────────────────────────

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum BodyFrame {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum BloodGroup {
  A_POSITIVE = 'A_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_POSITIVE = 'B_POSITIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
  O_POSITIVE = 'O_POSITIVE',
  O_NEGATIVE = 'O_NEGATIVE',
}

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHTLY_ACTIVE = 'LIGHTLY_ACTIVE',
  MODERATELY_ACTIVE = 'MODERATELY_ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE',
  EXTREMELY_ACTIVE = 'EXTREMELY_ACTIVE',
}

export enum SmokingStatus {
  NEVER = 'NEVER',
  FORMER = 'FORMER',
  CURRENT = 'CURRENT',
  OCCASIONAL = 'OCCASIONAL',
}

export enum AlcoholConsumption {
  NONE = 'NONE',
  OCCASIONAL = 'OCCASIONAL',
  MODERATE = 'MODERATE',
  HEAVY = 'HEAVY',
}

export enum DietType {
  VEGETARIAN = 'VEGETARIAN',
  VEGAN = 'VEGAN',
  EGGETARIAN = 'EGGETARIAN',
  NON_VEGETARIAN = 'NON_VEGETARIAN',
  PESCATARIAN = 'PESCATARIAN',
  SATTVIC = 'SATTVIC',
  LACTO_VEGETARIAN = 'LACTO_VEGETARIAN',
  RAW_FOOD = 'RAW_FOOD',
  AYURVEDIC = 'AYURVEDIC',
}

export enum CaffeineIntake {
  NONE = 'NONE',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
}

export enum SleepQuality {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  VERY_POOR = 'VERY_POOR',
}

export enum StressLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum DigestiveHealth {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export enum BowelRegularity {
  REGULAR = 'REGULAR',
  MOSTLY_REGULAR = 'MOSTLY_REGULAR',
  IRREGULAR = 'IRREGULAR',
  CONSTIPATED = 'CONSTIPATED',
  LOOSE = 'LOOSE',
}

export enum AppetiteLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  VARIABLE = 'VARIABLE',
}

export enum SkinType {
  DRY = 'DRY',
  OILY = 'OILY',
  COMBINATION = 'COMBINATION',
  NORMAL = 'NORMAL',
  SENSITIVE = 'SENSITIVE',
}

export enum HairType {
  DRY = 'DRY',
  OILY = 'OILY',
  NORMAL = 'NORMAL',
  THIN = 'THIN',
  THICK = 'THICK',
  CURLY = 'CURLY',
  STRAIGHT = 'STRAIGHT',
  WAVY = 'WAVY',
}

export enum PregnancyStatus {
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  NOT_PREGNANT = 'NOT_PREGNANT',
  PREGNANT = 'PREGNANT',
  POSTPARTUM = 'POSTPARTUM',
  TRYING_TO_CONCEIVE = 'TRYING_TO_CONCEIVE',
}

export enum DoshaType {
  VATA = 'VATA',
  PITTA = 'PITTA',
  KAPHA = 'KAPHA',
}

export enum Rasa {
  MADHURA = 'MADHURA',
  AMLA = 'AMLA',
  LAVANA = 'LAVANA',
  KATU = 'KATU',
  TIKTA = 'TIKTA',
  KASHAYA = 'KASHAYA',
}

export enum Virya {
  USHNA = 'USHNA',
  SHEETA = 'SHEETA',
}

export enum Vipaka {
  MADHURA_VIPAKA = 'MADHURA_VIPAKA',
  AMLA_VIPAKA = 'AMLA_VIPAKA',
  KATU_VIPAKA = 'KATU_VIPAKA',
}

export enum Season {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  MONSOON = 'MONSOON',
  AUTUMN = 'AUTUMN',
  EARLY_WINTER = 'EARLY_WINTER',
  LATE_WINTER = 'LATE_WINTER',
}

export enum MealType {
  EARLY_MORNING = 'EARLY_MORNING',
  BREAKFAST = 'BREAKFAST',
  MID_MORNING_SNACK = 'MID_MORNING_SNACK',
  LUNCH = 'LUNCH',
  AFTERNOON_SNACK = 'AFTERNOON_SNACK',
  EVENING_SNACK = 'EVENING_SNACK',
  DINNER = 'DINNER',
  BEDTIME = 'BEDTIME',
}

export enum FoodCategory {
  GRAINS_CEREALS = 'GRAINS_CEREALS',
  VEGETABLES = 'VEGETABLES',
  FRUITS = 'FRUITS',
  LEGUMES_PULSES = 'LEGUMES_PULSES',
  DAIRY = 'DAIRY',
  NUTS_SEEDS = 'NUTS_SEEDS',
  OILS_FATS = 'OILS_FATS',
  SPICES_HERBS = 'SPICES_HERBS',
  BEVERAGES = 'BEVERAGES',
  SWEETENERS = 'SWEETENERS',
  MEAT_POULTRY = 'MEAT_POULTRY',
  SEAFOOD = 'SEAFOOD',
  EGGS = 'EGGS',
  CONDIMENTS = 'CONDIMENTS',
  FERMENTED = 'FERMENTED',
  SUPERFOODS = 'SUPERFOODS',
  AYURVEDIC_HERBS = 'AYURVEDIC_HERBS',
  PREPARED_DISHES = 'PREPARED_DISHES',
}

export enum AgniType {
  SAMA = 'SAMA',
  VISHAMA = 'VISHAMA',
  TIKSHNA = 'TIKSHNA',
  MANDA = 'MANDA',
}

export enum Intensity {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum MoodLevel {
  VERY_HAPPY = 'VERY_HAPPY',
  HAPPY = 'HAPPY',
  NEUTRAL = 'NEUTRAL',
  SAD = 'SAD',
  VERY_SAD = 'VERY_SAD',
  ANXIOUS = 'ANXIOUS',
  ANGRY = 'ANGRY',
  CALM = 'CALM',
  ENERGETIC = 'ENERGETIC',
  TIRED = 'TIRED',
}

export enum RecommendationType {
  DIET = 'DIET',
  EXERCISE = 'EXERCISE',
  YOGA = 'YOGA',
  MEDITATION = 'MEDITATION',
  LIFESTYLE = 'LIFESTYLE',
  SLEEP = 'SLEEP',
  STRESS_MANAGEMENT = 'STRESS_MANAGEMENT',
  SEASONAL = 'SEASONAL',
  HERBAL_REMEDY = 'HERBAL_REMEDY',
  DETOX = 'DETOX',
  GENERAL_WELLNESS = 'GENERAL_WELLNESS',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// ──────────────────────────────────────────────
// USER & AUTHENTICATION
// ──────────────────────────────────────────────

export interface User {
  id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  isProfileComplete: boolean;
  avatarUrl?: string;
  lastLoginAt?: string;
  loginCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// ──────────────────────────────────────────────
// HEALTH PROFILE
// ──────────────────────────────────────────────

export interface HealthProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;

  // Physical
  heightCm: number;
  weightKg: number;
  bmi?: number;
  bodyFrame?: BodyFrame;
  waistCm?: number;
  hipCm?: number;
  chestCm?: number;

  // Vitals
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  restingHeartRate?: number;
  bodyTemperature?: number;

  // Medical
  bloodGroup?: BloodGroup;
  allergies: string[];
  medications: string[];
  chronicConditions: string[];

  // Lifestyle
  occupation?: string;
  activityLevel?: ActivityLevel;
  smokingStatus?: SmokingStatus;
  alcoholConsumption?: AlcoholConsumption;
  dietType?: DietType;
  foodAllergies: string[];
  foodIntolerances: string[];

  // Sleep & Stress
  averageSleepHours?: number;
  sleepQuality?: SleepQuality;
  usualBedtime?: string;
  usualWakeTime?: string;
  stressLevel?: StressLevel;

  // Digestive
  digestiveHealth?: DigestiveHealth;
  bowelRegularity?: BowelRegularity;
  appetiteLevel?: AppetiteLevel;

  // Skin & Hair
  skinType?: SkinType;
  hairType?: HairType;
  skinConditions: string[];

  // Goals
  healthGoals: string[];
  targetWeightKg?: number;
  targetTimelineWeeks?: number;

  // Images
  profileImageUrl?: string;
  bodyImageUrl?: string;

  createdAt: string;
  updatedAt: string;
}

// ──────────────────────────────────────────────
// PRAKRITI & DOSHA
// ──────────────────────────────────────────────

export interface PrakritiAssessment {
  id: string;
  userId: string;
  assessmentType: 'INITIAL' | 'PERIODIC' | 'SEASONAL' | 'FOLLOW_UP';
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';
  startedAt: string;
  completedAt?: string;

  vataScore?: number;
  pittaScore?: number;
  kaphaScore?: number;
  primaryDosha?: DoshaType;
  secondaryDosha?: DoshaType;
  prakritiType?: string;

  confidence?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DoshaProfile {
  id: string;
  userId: string;
  prakritiVata: number;
  prakritiPitta: number;
  prakritiKapha: number;
  prakritiType?: string;

  vikritiVata: number;
  vikritiPitta: number;
  vikritiKapha: number;
  vikritiType?: string;

  agniType?: AgniType;
  isImbalanced: boolean;
  lastAssessedAt?: string;

  createdAt: string;
  updatedAt: string;
}

// ──────────────────────────────────────────────
// FOOD & NUTRITION
// ──────────────────────────────────────────────

export interface FoodItem {
  id: string;
  name: string;
  nameHindi?: string;
  category: FoodCategory;
  imageUrl?: string;

  // Nutrition per 100g
  caloriesKcal?: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  fiberG?: number;
  sugarG?: number;

  // Ayurvedic
  rasa: Rasa[];
  virya?: Virya;
  vipaka?: Vipaka;
  vataEffect?: number;
  pittaEffect?: number;
  kaphaEffect?: number;

  isSattvic: boolean;
  bestSeasons: Season[];

  servingSizeG?: number;
  isActive: boolean;
  createdAt: string;
}

export interface UserFoodDiary {
  id: string;
  userId: string;
  date: string;
  mealType: MealType;
  foodName: string;
  quantityG?: number;
  servings: number;
  calories?: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  rasa: Rasa[];
  isSattvic?: boolean;
  source: 'MANUAL' | 'IMAGE_RECOGNITION' | 'MEAL_PLAN' | 'BARCODE_SCAN';
  notes?: string;
  createdAt: string;
}

export interface DailyNutrientLog {
  id: string;
  userId: string;
  date: string;

  totalCalories: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
  totalFiberG: number;

  calorieTarget?: number;
  calorieCompliance?: number;

  sattvicMealCount: number;
  doshaBalanceScore?: number;

  createdAt: string;
  updatedAt: string;
}

// ──────────────────────────────────────────────
// MEAL PLANNING
// ──────────────────────────────────────────────

export interface Meal {
  id: string;
  mealPlanId: string;
  date: string;
  mealType: MealType;
  name?: string;
  scheduledTime?: string;
  isConsumed: boolean;

  totalCalories?: number;
  totalProteinG?: number;
  totalCarbsG?: number;
  totalFatG?: number;

  createdAt: string;
  updatedAt: string;
}

export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  planType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
  startDate: string;
  endDate: string;
  targetCalories?: number;
  targetProteinG?: number;
  targetCarbsG?: number;
  targetFatG?: number;
  targetDosha?: DoshaType;
  season?: Season;
  isAyurvedic: boolean;
  isAiGenerated: boolean;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

// ──────────────────────────────────────────────
// HEALTH TRACKING
// ──────────────────────────────────────────────

export interface HealthTrackingLog {
  id: string;
  userId: string;
  date: string;

  weightKg?: number;
  bmi?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  restingHeartRate?: number;

  digestiveComfort?: number;
  bowelMovements?: number;
  bloating?: number;
  acidity?: number;

  energyLevel?: number;
  mentalClarity?: number;
  overallWellbeing?: number;
  painLevel?: number;

  skinClarity?: number;

  symptoms: string[];
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface WaterIntakeLog {
  id: string;
  userId: string;
  date: string;
  amountMl: number;
  time?: string;
  waterType?: string;
  createdAt: string;
}

export interface SleepLog {
  id: string;
  userId: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  durationHours: number;
  quality: number;
  deepSleepHours?: number;
  notes?: string;
  createdAt: string;
}

export interface ExerciseLog {
  id: string;
  userId: string;
  date: string;
  exerciseType: string;
  durationMinutes: number;
  intensity?: Intensity;
  caloriesBurned?: number;
  notes?: string;
  createdAt: string;
}

export interface MoodLog {
  id: string;
  userId: string;
  date: string;
  mood: MoodLevel;
  emotions: string[];
  triggers: string[];
  notes?: string;
  createdAt: string;
}

// ──────────────────────────────────────────────
// DAILY ROUTINES (Dinacharya)
// ──────────────────────────────────────────────

export interface DinacharyaLog {
  id: string;
  userId: string;
  date: string;

  wakeUpTime?: string;
  tongueScraping: boolean;
  oilPulling: boolean;
  nasya: boolean;
  abhyanga: boolean;
  morningExercise: boolean;
  morningMeditation: boolean;

  breakfastTime?: string;
  lunchTime?: string;
  dinnerTime?: string;

  eveningWalk: boolean;
  eveningMeditation: boolean;
  bedtimeRoutine: boolean;
  bedtime?: string;

  adherenceScore?: number;
  completedItems: number;
  totalItems: number;

  createdAt: string;
}

// ──────────────────────────────────────────────
// RECOMMENDATIONS & WELLNESS
// ──────────────────────────────────────────────

export interface Recommendation {
  id: string;
  userId: string;
  type: RecommendationType;
  category: string;
  title: string;
  description: string;
  priority: Priority;
  doshaTarget?: DoshaType;
  season?: Season;
  isRead: boolean;
  isFollowed?: boolean;
  createdAt: string;
}

export interface WellnessProgress {
  id: string;
  userId: string;
  periodStart: string;
  periodEnd: string;
  periodType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

  overallScore?: number;
  nutritionScore?: number;
  activityScore?: number;
  sleepScore?: number;
  stressScore?: number;
  digestiveScore?: number;
  doshaBalanceScore?: number;

  avgCalorieIntake?: number;
  avgWaterIntakeMl?: number;
  avgSleepHours?: number;
  totalExerciseMinutes?: number;

  insights?: Record<string, unknown>;
  suggestions: string[];

  createdAt: string;
}
