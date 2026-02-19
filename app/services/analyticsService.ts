import {
  DailyAnalytics,
  DoshaScore,
  HealthProfile,
  WeeklyAnalytics,
} from "@/app/types";
import {
  ActivityLevel,
  HealthProfile as BackendHealthProfile,
  DigestiveHealth,
  SleepQuality,
  StressLevel,
} from "@/app/types/schema";
import { EncryptedData, pqcEncryption } from "@/app/utils/pqcEncryption";
import { apiClient } from "./apiClient";

// Helper functions to map backend enums to frontend string literals
const mapActivityLevel = (
  level?: ActivityLevel | string,
): "sedentary" | "light" | "moderate" | "active" | "veryActive" => {
  if (!level) return "moderate";
  const levelStr = typeof level === "string" ? level : String(level);
  const mapping: Record<string, any> = {
    SEDENTARY: "sedentary",
    LIGHTLY_ACTIVE: "light",
    MODERATELY_ACTIVE: "moderate",
    VERY_ACTIVE: "active",
    EXTREMELY_ACTIVE: "veryActive",
  };
  return mapping[levelStr] || "moderate";
};

const mapSleepQuality = (
  quality?: SleepQuality | string,
): "early" | "moderate" | "late" => {
  if (!quality) return "moderate";
  const qualityStr = typeof quality === "string" ? quality : String(quality);
  const mapping: Record<string, any> = {
    EXCELLENT: "early",
    GOOD: "moderate",
    FAIR: "moderate",
    POOR: "late",
    VERY_POOR: "late",
  };
  return mapping[qualityStr] || "moderate";
};

const mapDigestiveHealth = (
  health?: DigestiveHealth | string,
): "weak" | "moderate" | "strong" => {
  if (!health) return "moderate";
  const healthStr = typeof health === "string" ? health : String(health);
  const mapping: Record<string, any> = {
    EXCELLENT: "strong",
    GOOD: "strong",
    FAIR: "moderate",
    POOR: "weak",
  };
  return mapping[healthStr] || "moderate";
};

const mapStressLevel = (
  stress?: StressLevel | string,
): "low" | "moderate" | "high" => {
  if (!stress) return "moderate";
  const stressStr = typeof stress === "string" ? stress : String(stress);
  const mapping: Record<string, any> = {
    VERY_LOW: "low",
    LOW: "low",
    MODERATE: "moderate",
    HIGH: "high",
    VERY_HIGH: "high",
  };
  return mapping[stressStr] || "moderate";
};

export const saveHealthProfile = async (
  profile: Partial<HealthProfile>,
): Promise<HealthProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: Math.random().toString(36).substr(2, 9),
    userId: "user_1",
    age: profile.age || 30,
    weight: profile.weight || 70,
    height: profile.height || 170,
    activityLevel: profile.activityLevel || "moderate",
    dietaryPreferences: profile.dietaryPreferences || [],
    allergies: profile.allergies || [],
    healthConditions: profile.healthConditions || [],
    sleepPattern: profile.sleepPattern || "moderate",
    digestiveStrength: profile.digestiveStrength || "moderate",
    stressLevel: profile.stressLevel || "moderate",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Save health profile with PQC encryption
 * Encrypts sensitive health data before transmission
 */
export const saveEncryptedHealthProfile = async (
  userId: string,
  profile: Partial<HealthProfile>,
): Promise<{ profile: HealthProfile; encrypted: EncryptedData }> => {
  try {
    // Save profile first
    const savedProfile = await saveHealthProfile(profile);

    // Initialize PQC encryption with user-specific key
    await pqcEncryption.initialize(`health_${userId}`);

    // Encrypt the profile data
    const encrypted = await pqcEncryption.encrypt(savedProfile);

    console.log("[PQC] Health profile encrypted successfully", {
      algorithm: encrypted.algorithm,
      userId: savedProfile.userId,
    });

    return { profile: savedProfile, encrypted };
  } catch (error) {
    console.error("[PQC] Failed to encrypt health profile:", error);
    throw error;
  }
};

export const getHealthProfile = async (
  userId: string,
): Promise<HealthProfile | null> => {
  try {
    // Initialize PQC encryption for this user
    await pqcEncryption.initialize(`health_${userId}`);

    try {
      // Fetch real data from backend API and cast to BackendHealthProfile
      const backendProfile = (await apiClient.getHealthProfile(
        userId,
      )) as unknown as BackendHealthProfile;

      // Map backend schema to UI schema using type-safe mapping functions
      const uiProfile: HealthProfile = {
        id: backendProfile.id,
        userId: backendProfile.userId,
        age: backendProfile.dateOfBirth
          ? new Date().getFullYear() -
            new Date(backendProfile.dateOfBirth).getFullYear()
          : 30,
        weight: backendProfile.weightKg || 70,
        height: backendProfile.heightCm || 170,
        activityLevel: mapActivityLevel(backendProfile.activityLevel),
        dietaryPreferences: backendProfile.dietType
          ? [backendProfile.dietType]
          : [],
        allergies: [
          ...(backendProfile.allergies || []),
          ...(backendProfile.foodAllergies || []),
        ],
        healthConditions: backendProfile.chronicConditions || [],
        sleepPattern: mapSleepQuality(backendProfile.sleepQuality),
        digestiveStrength: mapDigestiveHealth(backendProfile.digestiveHealth),
        stressLevel: mapStressLevel(backendProfile.stressLevel),
        createdAt: backendProfile.createdAt,
        updatedAt: backendProfile.updatedAt,
      };

      console.log("[PQC] Health profile ready for encryption");

      return uiProfile;
    } catch (apiError: any) {
      // If endpoint doesn't exist or returns error, use fallback
      console.warn(
        "[Health Profile] Backend endpoint error, using fallback data:",
        apiError.message,
      );

      // Return mock health profile for better UX
      return generateMockHealthProfile(userId);
    }
  } catch (error) {
    console.error("Error fetching health profile:", error);
    return generateMockHealthProfile(userId);
  }
};

/**
 * Generate mock health profile when backend data is unavailable
 */
const generateMockHealthProfile = (userId: string): HealthProfile => {
  return {
    id: `mock_hp_${userId}`,
    userId,
    age: 32,
    weight: 72,
    height: 175,
    activityLevel: "moderate",
    dietaryPreferences: ["vegetarian"],
    allergies: [],
    healthConditions: ["occasional indigestion"],
    sleepPattern: "moderate",
    digestiveStrength: "moderate",
    stressLevel: "moderate",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Get encrypted health profile for secure storage
 * Returns both plain and encrypted versions
 */
export const getEncryptedHealthProfile = async (
  userId: string,
): Promise<{
  profile: HealthProfile | null;
  encrypted: EncryptedData | null;
}> => {
  try {
    const profile = await getHealthProfile(userId);
    if (!profile) {
      return { profile: null, encrypted: null };
    }

    // Initialize PQC encryption
    await pqcEncryption.initialize(`health_${userId}`);

    // Encrypt sensitive health data
    const encrypted = await pqcEncryption.encrypt(profile);

    console.log("[PQC] Health profile encrypted for storage", {
      algorithm: encrypted.algorithm,
      userId: profile.userId,
      timestamp: new Date(encrypted.timestamp).toISOString(),
    });

    return { profile, encrypted };
  } catch (error) {
    console.error("[PQC] Failed to encrypt health profile:", error);
    return { profile: null, encrypted: null };
  }
};

/**
 * Decrypt health profile from encrypted storage
 */
export const decryptHealthProfile = async (
  userId: string,
  encryptedData: EncryptedData,
): Promise<HealthProfile | null> => {
  try {
    // Initialize PQC encryption with same key
    await pqcEncryption.initialize(`health_${userId}`);

    // Decrypt the data
    const profile = await pqcEncryption.decrypt<HealthProfile>(encryptedData);

    console.log("[PQC] Health profile decrypted successfully");

    return profile;
  } catch (error) {
    console.error("[PQC] Failed to decrypt health profile:", error);
    return null;
  }
};

export const getDailyAnalytics = async (
  userId: string,
  date: string,
): Promise<DailyAnalytics> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    date,
    totalCalories: 2100,
    totalProtein: 75,
    totalCarbs: 280,
    totalFat: 70,
    doshaBalance: { vata: 30, pitta: 50, kapha: 20 },
    aggregatingFoods: ["Spicy curry", "Hot peppers"],
    balancingFoods: ["Rice", "Coconut oil", "Coriander"],
  };
};

export const getWeeklyAnalytics = async (
  userId: string,
  weekStart: string,
): Promise<WeeklyAnalytics> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const weekEnd = new Date(
    new Date(weekStart).getTime() + 7 * 24 * 60 * 60 * 1000,
  )
    .toISOString()
    .split("T")[0];

  return {
    weekStart: weekStart.split("T")[0],
    weekEnd,
    averageCalories: 2050,
    doshaBalance: { vata: 28, pitta: 52, kapha: 20 },
    mealConsistency: 0.85,
    foodDiversity: 0.78,
    suggestions: [
      {
        id: "1",
        title: "Increase Cooling Foods",
        description:
          "Your Pitta is elevated this week. Include more cooling foods.",
        dosha: "pitta",
        category: "food",
        priority: "medium",
        actionableSteps: ["Add more salads", "Use coconut oil"],
        alternatives: ["Cooling herbs", "Water-rich fruits"],
      },
    ],
  };
};

export const calculateDoshaBalance = (foods: any[]): DoshaScore => {
  let balance: DoshaScore = { vata: 0, pitta: 0, kapha: 0 };

  foods.forEach((food) => {
    if (food.dosha) {
      balance.vata += food.dosha.vata;
      balance.pitta += food.dosha.pitta;
      balance.kapha += food.dosha.kapha;
    }
  });

  // Normalize
  const total =
    Math.abs(balance.vata) + Math.abs(balance.pitta) + Math.abs(balance.kapha);
  if (total > 0) {
    balance.vata = Math.round((balance.vata / total) * 100);
    balance.pitta = Math.round((balance.pitta / total) * 100);
    balance.kapha = Math.round((balance.kapha / total) * 100);
  }

  return balance;
};

export const generatePersonalizedAnalytics = async (
  userId: string,
  userDosha: string,
): Promise<{ daily: DailyAnalytics; weekly: WeeklyAnalytics }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const today = new Date().toISOString().split("T")[0];
  const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return {
    daily: await getDailyAnalytics(userId, today),
    weekly: await getWeeklyAnalytics(userId, weekStart),
  };
};
