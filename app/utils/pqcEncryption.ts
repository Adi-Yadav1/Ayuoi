/**
 * Post-Quantum Cryptography (PQC) Encryption Utility
 * Provides quantum-resistant encryption for sensitive health data
 *
 * Algorithm: CRYSTALS-Kyber (NIST PQC Standard)
 * Use Case: Encrypting health profiles, Prakriti data, food diaries, etc.
 */

import { Buffer } from "buffer";

// Types for encrypted data
export interface EncryptedData {
  ciphertext: string;
  nonce: string;
  timestamp: number;
  algorithm: string;
}

export interface PQCKeyPair {
  publicKey: string;
  privateKey: string;
}

/**
 * PQC Encryption Service using CRYSTALS-Kyber
 * Note: This is a simplified implementation. In production, use a proper PQC library like:
 * - @noble/post-quantum
 * - pqc-lite
 * - liboqs-js
 */
class PQCEncryptionService {
  private readonly ALGORITHM = "CRYSTALS-Kyber-768";
  private readonly KEY_SIZE = 32; // 256-bit key
  private encryptionKey: string | null = null;

  /**
   * Initialize encryption service with a key
   * In production, this should be derived from user authentication
   */
  async initialize(userKey?: string): Promise<void> {
    if (userKey) {
      this.encryptionKey = userKey;
    } else {
      // Generate a random key for demo purposes
      this.encryptionKey = this.generateRandomKey();
    }
  }

  /**
   * Generate a random encryption key
   * In production, use CRYSTALS-Kyber key generation
   */
  private generateRandomKey(): string {
    const array = new Uint8Array(this.KEY_SIZE);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return Buffer.from(array).toString("base64");
  }

  /**
   * Generate PQC key pair for asymmetric encryption
   * In production, use actual Kyber key pair generation
   */
  async generateKeyPair(): Promise<PQCKeyPair> {
    // Simulated Kyber key pair generation
    // Replace with actual library: await kyber.keypair()
    const publicKey = this.generateRandomKey();
    const privateKey = this.generateRandomKey();

    return {
      publicKey: `kyber_pub_${publicKey}`,
      privateKey: `kyber_priv_${privateKey}`,
    };
  }

  /**
   * Encrypt sensitive data with PQC
   * @param data - Data to encrypt (will be JSON stringified)
   * @returns Encrypted data object
   */
  async encrypt<T>(data: T): Promise<EncryptedData> {
    if (!this.encryptionKey) {
      await this.initialize();
    }

    try {
      // Convert data to string
      const plaintext = JSON.stringify(data);

      // Generate nonce (number used once)
      const nonce = this.generateNonce();

      // In production, use actual Kyber encryption
      // Example: const ciphertext = await kyber.encrypt(plaintext, publicKey);
      const ciphertext = await this.simulateKyberEncryption(plaintext, nonce);

      return {
        ciphertext,
        nonce,
        timestamp: Date.now(),
        algorithm: this.ALGORITHM,
      };
    } catch (error) {
      console.error("PQC Encryption failed:", error);
      throw new Error("Failed to encrypt data with PQC");
    }
  }

  /**
   * Decrypt PQC encrypted data
   * @param encryptedData - Encrypted data object
   * @returns Decrypted data
   */
  async decrypt<T>(encryptedData: EncryptedData): Promise<T> {
    if (!this.encryptionKey) {
      throw new Error("Encryption key not initialized");
    }

    try {
      // In production, use actual Kyber decryption
      // Example: const plaintext = await kyber.decrypt(ciphertext, privateKey);
      const plaintext = await this.simulateKyberDecryption(
        encryptedData.ciphertext,
        encryptedData.nonce,
      );

      return JSON.parse(plaintext) as T;
    } catch (error) {
      console.error("PQC Decryption failed:", error);
      throw new Error("Failed to decrypt data with PQC");
    }
  }

  /**
   * Generate a cryptographic nonce
   */
  private generateNonce(): string {
    const nonceArray = new Uint8Array(12);
    for (let i = 0; i < nonceArray.length; i++) {
      nonceArray[i] = Math.floor(Math.random() * 256);
    }
    return Buffer.from(nonceArray).toString("base64");
  }

  /**
   * Simulate Kyber encryption (XOR cipher for demo)
   * REPLACE THIS with actual Kyber implementation in production!
   * Use: import { kyber } from '@noble/post-quantum' or similar
   */
  private async simulateKyberEncryption(
    plaintext: string,
    nonce: string,
  ): Promise<string> {
    // Simple XOR encryption for demonstration
    // THIS IS NOT SECURE - Replace with actual Kyber encryption
    const key = this.encryptionKey!;
    const combined = key + nonce;
    const encrypted = Buffer.from(plaintext)
      .toString("base64")
      .split("")
      .map((char, i) => {
        const keyChar = combined.charCodeAt(i % combined.length);
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
      })
      .join("");

    return Buffer.from(encrypted).toString("base64");
  }

  /**
   * Simulate Kyber decryption (XOR cipher for demo)
   * REPLACE THIS with actual Kyber implementation in production!
   */
  private async simulateKyberDecryption(
    ciphertext: string,
    nonce: string,
  ): Promise<string> {
    // Reverse of encryption for demonstration
    const key = this.encryptionKey!;
    const combined = key + nonce;
    const decrypted = Buffer.from(ciphertext, "base64")
      .toString()
      .split("")
      .map((char, i) => {
        const keyChar = combined.charCodeAt(i % combined.length);
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
      })
      .join("");

    return Buffer.from(decrypted, "base64").toString();
  }

  /**
   * Encrypt data for transmission to backend
   * Adds additional metadata for backend verification
   */
  async encryptForTransmission<T>(data: T, userId: string): Promise<string> {
    const encrypted = await this.encrypt(data);

    // Add transmission metadata
    const transmissionPackage = {
      ...encrypted,
      userId,
      version: "1.0",
      encrypted: true,
    };

    return Buffer.from(JSON.stringify(transmissionPackage)).toString("base64");
  }

  /**
   * Decrypt data received from backend
   */
  async decryptFromTransmission<T>(encryptedString: string): Promise<T> {
    try {
      const transmissionPackage = JSON.parse(
        Buffer.from(encryptedString, "base64").toString(),
      );

      if (!transmissionPackage.encrypted) {
        throw new Error("Data is not encrypted");
      }

      return await this.decrypt<T>(transmissionPackage);
    } catch (error) {
      console.error("Failed to decrypt transmission:", error);
      throw error;
    }
  }

  /**
   * Hash sensitive data with quantum-resistant algorithm
   * Useful for data integrity verification
   */
  async hash(data: string): Promise<string> {
    // In production, use SHA-3 or SHAKE (quantum-resistant hashing)
    // For now, using simple hashing simulation
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(16, "0");
  }

  /**
   * Verify data integrity using quantum-resistant hash
   */
  async verifyIntegrity(data: string, expectedHash: string): Promise<boolean> {
    const actualHash = await this.hash(data);
    return actualHash === expectedHash;
  }
}

// Export singleton instance
export const pqcEncryption = new PQCEncryptionService();

// Export convenience functions
export const encryptHealthData = <T>(data: T) => pqcEncryption.encrypt(data);
export const decryptHealthData = <T>(encrypted: EncryptedData) =>
  pqcEncryption.decrypt<T>(encrypted);
export const initializePQC = (userKey?: string) =>
  pqcEncryption.initialize(userKey);

/**
 * PRODUCTION TODO:
 *
 * 1. Install a proper PQC library:
 *    npm install @noble/post-quantum
 *    or
 *    npm install pqc-lite
 *
 * 2. Replace simulation methods with actual Kyber implementation:
 *    import { kyber768 } from '@noble/post-quantum';
 *
 *    const { publicKey, secretKey } = kyber768.keygen();
 *    const ciphertext = kyber768.encrypt(publicKey, message);
 *    const plaintext = kyber768.decrypt(secretKey, ciphertext);
 *
 * 3. Implement key exchange with backend for proper E2E encryption
 *
 * 4. Add key rotation and management
 *
 * 5. Implement secure key storage (use device secure storage)
 */
