/**
 * PQC (Post-Quantum Cryptography) Integration Examples
 *
 * This file demonstrates how to use PQC encryption for health data
 * in your Ayurvedic wellness application.
 */

import {
    decryptHealthData,
    EncryptedData,
    encryptHealthData,
    initializePQC,
    pqcEncryption,
} from "@/app/utils/pqcEncryption";

import {
    decryptPrakritiResult,
    getEncryptedPrakritiResult,
} from "@/app/services/prakritiService";

import {
    decryptHealthProfile,
    getEncryptedHealthProfile,
    saveEncryptedHealthProfile,
} from "@/app/services/analyticsService";

import { HealthProfile } from "@/app/types";

// ============================================================================
// EXAMPLE 1: Encrypt and Store Prakriti Assessment Results
// ============================================================================

export const exampleEncryptPrakritiResult = async (userId: string) => {
  try {
    console.log("=== Encrypting Prakriti Result ===");

    // Get encrypted Prakriti result
    const encryptedResult = await getEncryptedPrakritiResult(userId);

    if (encryptedResult) {
      console.log("✅ Prakriti result encrypted successfully");
      console.log("Algorithm:", encryptedResult.algorithm);
      console.log(
        "Timestamp:",
        new Date(encryptedResult.timestamp).toISOString(),
      );

      // Store encrypted data locally or send to backend
      // await AsyncStorage.setItem(`prakriti_${userId}`, JSON.stringify(encryptedResult));

      return encryptedResult;
    }
  } catch (error) {
    console.error("❌ Error encrypting Prakriti result:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 2: Decrypt Stored Prakriti Results
// ============================================================================

export const exampleDecryptPrakritiResult = async (
  userId: string,
  encryptedData: EncryptedData,
) => {
  try {
    console.log("=== Decrypting Prakriti Result ===");

    // Decrypt the Prakriti result
    const result = await decryptPrakritiResult(userId, encryptedData);

    if (result) {
      console.log("✅ Prakriti result decrypted successfully");
      console.log("Primary Dosha:", result.primaryDosha);
      console.log("Scores:", result.scores);

      return result;
    }
  } catch (error) {
    console.error("❌ Error decrypting Prakriti result:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 3: Encrypt Health Profile Before Transmission
// ============================================================================

export const exampleEncryptHealthProfile = async (userId: string) => {
  try {
    console.log("=== Encrypting Health Profile ===");

    // Get encrypted health profile
    const { profile, encrypted } = await getEncryptedHealthProfile(userId);

    if (profile && encrypted) {
      console.log("✅ Health profile encrypted successfully");
      console.log("User ID:", profile.userId);
      console.log("Encryption Algorithm:", encrypted.algorithm);

      // Send encrypted data to backend API
      // await apiClient.sendEncryptedHealthProfile(encrypted);

      return { profile, encrypted };
    }
  } catch (error) {
    console.error("❌ Error encrypting health profile:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 4: Decrypt Received Health Profile
// ============================================================================

export const exampleDecryptHealthProfile = async (
  userId: string,
  encryptedData: EncryptedData,
) => {
  try {
    console.log("=== Decrypting Health Profile ===");

    // Decrypt the health profile
    const profile = await decryptHealthProfile(userId, encryptedData);

    if (profile) {
      console.log("✅ Health profile decrypted successfully");
      console.log("Age:", profile.age);
      console.log("Health Conditions:", profile.healthConditions);

      return profile;
    }
  } catch (error) {
    console.error("❌ Error decrypting health profile:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 5: Generic Encryption for Any Health Data
// ============================================================================

export const exampleEncryptGenericHealthData = async <T>(
  userId: string,
  data: T,
): Promise<EncryptedData> => {
  try {
    console.log("=== Encrypting Generic Health Data ===");

    // Initialize with user-specific key
    await initializePQC(`generic_${userId}`);

    // Encrypt the data
    const encrypted = await encryptHealthData(data);

    console.log("✅ Data encrypted successfully");
    console.log("Algorithm:", encrypted.algorithm);

    return encrypted;
  } catch (error) {
    console.error("❌ Error encrypting data:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 6: Generic Decryption for Any Health Data
// ============================================================================

export const exampleDecryptGenericHealthData = async <T>(
  userId: string,
  encryptedData: EncryptedData,
): Promise<T> => {
  try {
    console.log("=== Decrypting Generic Health Data ===");

    // Initialize with same user-specific key
    await initializePQC(`generic_${userId}`);

    // Decrypt the data
    const data = await decryptHealthData<T>(encryptedData);

    console.log("✅ Data decrypted successfully");

    return data;
  } catch (error) {
    console.error("❌ Error decrypting data:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 7: Save and Retrieve Encrypted Health Profile (Complete Flow)
// ============================================================================

export const exampleCompleteHealthProfileFlow = async (
  userId: string,
  profileData: Partial<HealthProfile>,
) => {
  try {
    console.log("=== Complete Health Profile Encryption Flow ===");

    // STEP 1: Save and encrypt health profile
    console.log("Step 1: Saving and encrypting...");
    const { profile, encrypted } = await saveEncryptedHealthProfile(
      userId,
      profileData,
    );

    console.log("✅ Profile saved and encrypted");
    console.log("Profile ID:", profile.id);

    // STEP 2: Store encrypted data (simulated)
    const encryptedString = JSON.stringify(encrypted);
    console.log("Encrypted data size:", encryptedString.length, "bytes");

    // STEP 3: Retrieve and decrypt
    console.log("Step 2: Decrypting...");
    const decryptedProfile = await decryptHealthProfile(userId, encrypted);

    if (decryptedProfile) {
      console.log("✅ Profile decrypted successfully");
      console.log("Age:", decryptedProfile.age);
      console.log("Activity Level:", decryptedProfile.activityLevel);

      return decryptedProfile;
    }
  } catch (error) {
    console.error("❌ Error in complete flow:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 8: Verify Data Integrity with PQC Hash
// ============================================================================

export const exampleVerifyDataIntegrity = async (userId: string, data: any) => {
  try {
    console.log("=== Verifying Data Integrity ===");

    await initializePQC(`verify_${userId}`);

    // Generate hash
    const dataString = JSON.stringify(data);
    const hash = await pqcEncryption.hash(dataString);

    console.log("✅ Data hash generated:", hash);

    // Verify integrity (simulate)
    const isValid = await pqcEncryption.verifyIntegrity(dataString, hash);

    console.log("Data integrity check:", isValid ? "✅ VALID" : "❌ INVALID");

    return { hash, isValid };
  } catch (error) {
    console.error("❌ Error verifying integrity:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 9: Encrypt Food Diary Entries
// ============================================================================

export const exampleEncryptFoodDiary = async (
  userId: string,
  foodEntries: any[],
) => {
  try {
    console.log("=== Encrypting Food Diary ===");

    await initializePQC(`food_diary_${userId}`);

    // Encrypt all food entries
    const encrypted = await pqcEncryption.encrypt(foodEntries);

    console.log("✅ Food diary encrypted");
    console.log("Entries count:", foodEntries.length);
    console.log("Algorithm:", encrypted.algorithm);

    return encrypted;
  } catch (error) {
    console.error("❌ Error encrypting food diary:", error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 10: Generate PQC Key Pair for User
// ============================================================================

export const exampleGenerateUserKeyPair = async (userId: string) => {
  try {
    console.log("=== Generating PQC Key Pair ===");

    await initializePQC(userId);

    // Generate quantum-resistant key pair
    const keyPair = await pqcEncryption.generateKeyPair();

    console.log("✅ Key pair generated");
    console.log(
      "Public Key (truncated):",
      keyPair.publicKey.substring(0, 50) + "...",
    );
    console.log(
      "Private Key (truncated):",
      keyPair.privateKey.substring(0, 50) + "...",
    );

    // Store keys securely
    // Note: Private key should NEVER be sent to backend
    // await SecureStore.setItemAsync(`${userId}_public_key`, keyPair.publicKey);
    // await SecureStore.setItemAsync(`${userId}_private_key`, keyPair.privateKey);

    return keyPair;
  } catch (error) {
    console.error("❌ Error generating key pair:", error);
    throw error;
  }
};

// ============================================================================
// USAGE IN REACT COMPONENT
// ============================================================================

/*
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '@/app/context/AuthContext';
import { exampleEncryptPrakritiResult, exampleDecryptPrakritiResult } from './pqcExamples';

export const HealthDataScreen = () => {
  const { user } = useAuth();
  const [encrypted, setEncrypted] = useState(null);
  const [decrypted, setDecrypted] = useState(null);

  const handleEncrypt = async () => {
    if (user?.id) {
      const result = await exampleEncryptPrakritiResult(user.id);
      setEncrypted(result);
    }
  };

  const handleDecrypt = async () => {
    if (user?.id && encrypted) {
      const result = await exampleDecryptPrakritiResult(user.id, encrypted);
      setDecrypted(result);
    }
  };

  return (
    <View>
      <Button title="Encrypt Prakriti Data" onPress={handleEncrypt} />
      <Button title="Decrypt Prakriti Data" onPress={handleDecrypt} />
      
      {encrypted && <Text>Data encrypted with {encrypted.algorithm}</Text>}
      {decrypted && <Text>Primary Dosha: {decrypted.primaryDosha}</Text>}
    </View>
  );
};
*/

// ============================================================================
// PRODUCTION CHECKLIST
// ============================================================================

/*
BEFORE PRODUCTION:

1. ✅ Install proper PQC library:
   npm install @noble/post-quantum

2. ✅ Replace simulation in pqcEncryption.ts with real Kyber implementation

3. ✅ Implement secure key storage:
   - Use expo-secure-store for key storage
   - Never store private keys on backend
   - Implement key rotation policy

4. ✅ Backend integration:
   - Ensure backend can handle encrypted payloads
   - Implement proper key exchange protocol
   - Add PQC signature verification

5. ✅ Testing:
   - Test encryption/decryption on all health data types
   - Performance testing with large datasets
   - Security audit of key management

6. ✅ Monitoring:
   - Log encryption operations (without sensitive data)
   - Monitor decryption failures
   - Track algorithm usage

7. ✅ Documentation:
   - Update API documentation
   - Create security guidelines for team
   - Document key rotation procedures
*/
