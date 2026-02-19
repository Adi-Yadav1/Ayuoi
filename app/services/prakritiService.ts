import {
  DoeshaType,
  DoshaScore,
  PrakritiAssessmentAnswers,
  PrakritiResult,
} from "@/app/types";
import { EncryptedData, pqcEncryption } from "@/app/utils/pqcEncryption";

// Mock Prakriti Assessment Logic
const doshaMapping: { [key: string]: DoshaScore } = {
  lightSlim: { vata: 3, pitta: 0, kapha: 0 },
  mediumMusclular: { vata: 0, pitta: 3, kapha: 0 },
  heavyRobust: { vata: 0, pitta: 0, kapha: 3 },

  drySensitive: { vata: 2, pitta: 1, kapha: 0 },
  fairReddish: { vata: 0, pitta: 3, kapha: 0 },
  paleWhitish: { vata: 0, pitta: 0, kapha: 2 },

  thinDryWiry: { vata: 3, pitta: 0, kapha: 0 },
  fairFineStraight: { vata: 0, pitta: 3, kapha: 0 },
  thickCurlyOily: { vata: 0, pitta: 0, kapha: 3 },

  variableIrregular: { vata: 3, pitta: 0, kapha: 0 },
  sharpIncreased: { vata: 0, pitta: 3, kapha: 0 },
  lowOozing: { vata: 0, pitta: 0, kapha: 3 },

  delicateIrregular: { vata: 3, pitta: 0, kapha: 0 },
  efficient: { vata: 0, pitta: 3, kapha: 0 },
  slowGravy: { vata: 0, pitta: 0, kapha: 3 },

  lightRestless: { vata: 3, pitta: 0, kapha: 0 },
  fitfulInterrupted: { vata: 0, pitta: 3, kapha: 0 },
  heavyHeavy: { vata: 0, pitta: 0, kapha: 3 },

  poorlyDefined: { vata: 3, pitta: 0, kapha: 0 },
  mediumDefined: { vata: 0, pitta: 3, kapha: 0 },
  largeWellDefined: { vata: 0, pitta: 0, kapha: 3 },

  quickChanging: { vata: 3, pitta: 0, kapha: 0 },
  focusedIntense: { vata: 0, pitta: 3, kapha: 0 },
  calm: { vata: 0, pitta: 0, kapha: 3 },

  anxiousNervous: { vata: 3, pitta: 0, kapha: 0 },
  irritableImpatient: { vata: 0, pitta: 3, kapha: 0 },
  stable: { vata: 0, pitta: 0, kapha: 3 },

  coldWind: { vata: 3, pitta: 0, kapha: 0 },
  hotSun: { vata: 0, pitta: 3, kapha: 0 },
  coldDamp: { vata: 0, pitta: 0, kapha: 3 },

  irregularsporadic: { vata: 3, pitta: 0, kapha: 0 },
  moderate: { vata: 0, pitta: 3, kapha: 0 },
  minimalsedentary: { vata: 0, pitta: 0, kapha: 3 },

  looseflexible: { vata: 3, pitta: 0, kapha: 0 },
  moderate_flex: { vata: 0, pitta: 3, kapha: 0 },
  stiffrigid: { vata: 0, pitta: 0, kapha: 3 },
};

const doshaCharacteristics = {
  vata: [
    "Creative and imaginative",
    "Quick thinking and learning",
    "Tendency toward anxiety",
    "Active and energetic",
    "Enjoys variety and change",
    "Prone to dry skin and hair",
    "Light sleeper",
    "Irregular eating patterns",
    "Quick to react",
    "Excellent at communication",
  ],
  pitta: [
    "Sharp intellect and focus",
    "Strong digestion and metabolism",
    "Leadership qualities",
    "Perfectionistic tendencies",
    "Tendency toward irritability",
    "Ambitious and driven",
    "Good complexion",
    "Sensitive to heat",
    "Strong willpower",
    "Enjoys challenges",
  ],
  kapha: [
    "Calm and stable nature",
    "Strong immune system",
    "Good memory",
    "Loving and compassionate",
    "Slow to anger",
    "Tendency toward heaviness",
    "Oily and smooth skin",
    "Sound sleeper",
    "Strong physical frame",
    "Steady and reliable",
  ],
};

const doshaRecommendations = {
  vata: [
    "Establish regular meal times",
    "Eat warm, nourishing foods",
    "Include more healthy fats and oils",
    "Avoid excessive raw foods",
    "Practice grounding activities like yoga and meditation",
    "Ensure adequate rest and sleep",
    "Stay warm during cold seasons",
  ],
  pitta: [
    "Cool foods and drinks recommended",
    "Avoid very spicy foods",
    "Include bitter and sweet tastes",
    "Practice calming activities",
    "Take breaks from intense activities",
    "Avoid excessive heat exposure",
    "Balance work with relaxation",
  ],
  kapha: [
    "Stimulating and warming foods",
    "Regular physical exercise",
    "Avoid heavy and oily foods",
    "Eat lighter portions",
    "Vary your routine regularly",
    "Include spices in meals",
    "Stay mentally stimulated",
  ],
};

const doshaFeedingHabits = {
  vata: [
    "Eat at regular times to balance irregular digestion",
    "Warm liquids improve nutrient absorption",
    "Sesame oil and ghee are beneficial",
    "Slow, mindful eating promotes better digestion",
    "Avoid eating on the run or standing",
  ],
  pitta: [
    "Eat moderate portions at moderate temperatures",
    "Cooling herbs like cilantro and mint are beneficial",
    "Coconut oil supports digestion",
    "Avoid excessive salt and fried foods",
    "Take breaks between intense activities and meals",
  ],
  kapha: [
    "Lighter meals and smaller portions recommended",
    "Stimulating spices aid digestion",
    "Mustard oil and other warming oils beneficial",
    "Regular exercise improves digestion",
    "Variety in foods prevents boredom and stagnation",
  ],
};

export const assessPrakriti = (
  answers: PrakritiAssessmentAnswers,
): PrakritiResult => {
  // Calculate Dosha scores based on answers
  let totalScore: DoshaScore = { vata: 0, pitta: 0, kapha: 0 };

  // Map answers to dosha values and aggregate
  const answerKeys = Object.values(answers) as string[];
  answerKeys.forEach((answer) => {
    if (doshaMapping[answer]) {
      totalScore.vata += doshaMapping[answer].vata;
      totalScore.pitta += doshaMapping[answer].pitta;
      totalScore.kapha += doshaMapping[answer].kapha;
    }
  });

  // Normalize scores
  const total = totalScore.vata + totalScore.pitta + totalScore.kapha;
  const normalizedScore: DoshaScore = {
    vata: Math.round((totalScore.vata / total) * 100),
    pitta: Math.round((totalScore.pitta / total) * 100),
    kapha: Math.round((totalScore.kapha / total) * 100),
  };

  // Determine primary and secondary dosha
  const sorted = Object.entries(normalizedScore).sort((a, b) => b[1] - a[1]);
  const primaryDosha = sorted[0][0] as any;
  const secondaryDosha = sorted[1][0] as any;

  return {
    id: Math.random().toString(36).substr(2, 9),
    userId: "user_1",
    primaryDosha,
    secondaryDosha,
    scores: normalizedScore,
    characteristics: doshaCharacteristics[primaryDosha as DoeshaType],
    recommendations: doshaRecommendations[primaryDosha as DoeshaType],
    feedingHabits: doshaFeedingHabits[primaryDosha as DoeshaType],
    createdAt: new Date().toISOString(),
  };
};

export const getPrakritiResultAsync = async (
  userId: string,
): Promise<PrakritiResult | null> => {
  try {
    // Initialize PQC encryption with user-specific key
    await pqcEncryption.initialize(`prakriti_${userId}`);

    // Import apiClient
    const { apiClient } = await import("./apiClient");

    try {
      // Try to get dosha profile from backend
      const doshaProfile = await apiClient.getDoshaProfile(userId);

      // Map backend DoshaProfile to UI PrakritiResult
      const scores: DoshaScore = {
        vata: doshaProfile.prakritiVata || 0,
        pitta: doshaProfile.prakritiPitta || 0,
        kapha: doshaProfile.prakritiKapha || 0,
      };

      // Determine primary and secondary dosha from scores
      const doshaEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const primaryDosha = (doshaProfile.prakritiType?.toLowerCase() ||
        doshaEntries[0][0]) as DoeshaType;
      const secondaryDosha = doshaEntries[1][0] as DoeshaType;

      const result: PrakritiResult = {
        id: doshaProfile.id,
        userId: doshaProfile.userId,
        primaryDosha,
        secondaryDosha,
        scores,
        characteristics: doshaCharacteristics[primaryDosha],
        recommendations: doshaRecommendations[primaryDosha],
        feedingHabits: doshaFeedingHabits[primaryDosha],
        createdAt: doshaProfile.createdAt,
      };

      return result;
    } catch (apiError: any) {
      // If endpoint doesn't exist or other API error, use mock data
      console.warn(
        "[Prakriti] Backend endpoint not available, using fallback data:",
        apiError.message,
      );

      // Fallback to mock data for demonstration
      return generateMockPrakritiResult(userId);
    }
  } catch (error) {
    console.error("Error fetching Prakriti data:", error);
    // Return mock data instead of null for better UX
    return generateMockPrakritiResult(userId);
  }
};

/**
 * Generate mock Prakriti result when backend data is unavailable
 * This ensures the app continues to function even without backend
 */
const generateMockPrakritiResult = (userId: string): PrakritiResult => {
  // Generate consistent mock data based on userId hash
  const hash = userId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const doshaIndex = hash % 3;

  const doshaTypes: DoeshaType[] = ["vata", "pitta", "kapha"];
  const primaryDosha = doshaTypes[doshaIndex];
  const secondaryDosha = doshaTypes[(doshaIndex + 1) % 3];

  // Generate realistic-looking scores
  const primaryScore = 40 + (hash % 20);
  const secondaryScore = 25 + (hash % 15);
  const tertiaryScore = 100 - primaryScore - secondaryScore;

  const scores: DoshaScore = {
    [primaryDosha]: primaryScore,
    [secondaryDosha]: secondaryScore,
    [doshaTypes[(doshaIndex + 2) % 3]]: tertiaryScore,
  } as DoshaScore;

  return {
    id: `mock_prakriti_${userId}`,
    userId,
    primaryDosha,
    secondaryDosha,
    scores,
    characteristics: doshaCharacteristics[primaryDosha],
    recommendations: doshaRecommendations[primaryDosha],
    feedingHabits: doshaFeedingHabits[primaryDosha],
    createdAt: new Date().toISOString(),
  };
};

/**
 * Get encrypted Prakriti result for secure storage/transmission
 * Uses PQC encryption to protect sensitive health data
 */
export const getEncryptedPrakritiResult = async (
  userId: string,
): Promise<EncryptedData | null> => {
  try {
    const result = await getPrakritiResultAsync(userId);
    if (!result) return null;

    // Initialize PQC encryption
    await pqcEncryption.initialize(`prakriti_${userId}`);

    // Encrypt the Prakriti result with quantum-resistant encryption
    const encrypted = await pqcEncryption.encrypt(result);

    console.log("[PQC] Prakriti data encrypted successfully", {
      algorithm: encrypted.algorithm,
      timestamp: encrypted.timestamp,
    });

    return encrypted;
  } catch (error) {
    console.error("[PQC] Failed to encrypt Prakriti data:", error);
    throw error;
  }
};

/**
 * Decrypt Prakriti result from encrypted storage
 */
export const decryptPrakritiResult = async (
  userId: string,
  encryptedData: EncryptedData,
): Promise<PrakritiResult | null> => {
  try {
    // Initialize PQC encryption with same key
    await pqcEncryption.initialize(`prakriti_${userId}`);

    // Decrypt the data
    const result = await pqcEncryption.decrypt<PrakritiResult>(encryptedData);

    console.log("[PQC] Prakriti data decrypted successfully");

    return result;
  } catch (error) {
    console.error("[PQC] Failed to decrypt Prakriti data:", error);
    return null;
  }
};
