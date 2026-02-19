# PQC Encryption Setup Guide

## Quick Start

### Step 1: Install Required Dependencies

```bash
# Install buffer for React Native crypto operations
npm install buffer

# Install PQC library (Choose ONE of the following)

# Option 1: @noble/post-quantum (Recommended)
npm install @noble/post-quantum

# Option 2: pqc-lite (Lightweight alternative)
npm install pqc-lite

# Option 3: liboqs-js (Full suite, larger size)
npm install liboqs-js

# Optional: For secure key storage in production
npx expo install expo-secure-store
```

### Step 2: Test the Implementation

Run the app and check console logs for PQC encryption operations:

```bash
npm start
```

You should see logs like:

```
[PQC] Prakriti data encrypted successfully
[PQC] Health profile encrypted successfully
```

### Step 3: Usage in Your Code

#### Encrypt Prakriti Data

```typescript
import { getEncryptedPrakritiResult } from "@/app/services/prakritiService";

const handleEncryptPrakriti = async (userId: string) => {
  const encrypted = await getEncryptedPrakritiResult(userId);
  console.log("Encrypted with:", encrypted?.algorithm);
};
```

#### Encrypt Health Profile

```typescript
import { getEncryptedHealthProfile } from "@/app/services/analyticsService";

const handleEncryptHealth = async (userId: string) => {
  const { profile, encrypted } = await getEncryptedHealthProfile(userId);
  console.log("Profile encrypted:", encrypted?.algorithm);
};
```

## What's Been Implemented

### ✅ Files Created

1. **`app/utils/pqcEncryption.ts`**
   - Core PQC encryption service
   - CRYSTALS-Kyber implementation (simulated)
   - Encrypt/decrypt functions
   - Key pair generation
   - Data integrity verification

2. **`app/utils/pqcExamples.ts`**
   - 10+ usage examples
   - Complete flow demonstrations
   - React component examples

3. **`PQC_DOCUMENTATION.md`**
   - Complete API reference
   - Security best practices
   - Production checklist
   - Troubleshooting guide

### ✅ Files Modified

1. **`app/services/prakritiService.ts`**
   - Added `getEncryptedPrakritiResult()`
   - Added `decryptPrakritiResult()`
   - Integrated PQC encryption for Prakriti data

2. **`app/services/analyticsService.ts`**
   - Added `getEncryptedHealthProfile()`
   - Added `saveEncryptedHealthProfile()`
   - Added `decryptHealthProfile()`
   - Type-safe enum mappings for backend data
   - Integrated PQC encryption for health profiles

## API Functions Available

### Prakriti Service

```typescript
// Get encrypted Prakriti result
const encrypted = await getEncryptedPrakritiResult(userId);

// Decrypt Prakriti result
const result = await decryptPrakritiResult(userId, encrypted);
```

### Analytics Service

```typescript
// Get encrypted health profile
const { profile, encrypted } = await getEncryptedHealthProfile(userId);

// Save and encrypt health profile
const { profile, encrypted } = await saveEncryptedHealthProfile(userId, data);

// Decrypt health profile
const profile = await decryptHealthProfile(userId, encrypted);
```

### Core Encryption

```typescript
import { pqcEncryption, initializePQC } from "@/app/utils/pqcEncryption";

// Initialize
await initializePQC(`user_${userId}`);

// Encrypt any data
const encrypted = await pqcEncryption.encrypt(anyData);

// Decrypt data
const decrypted = await pqcEncryption.decrypt(encrypted);

// Generate key pair
const { publicKey, privateKey } = await pqcEncryption.generateKeyPair();

// Hash data
const hash = await pqcEncryption.hash(dataString);

// Verify integrity
const isValid = await pqcEncryption.verifyIntegrity(data, hash);
```

## Testing Your Implementation

### Test 1: Encrypt and Decrypt Prakriti Data

```typescript
// In any component or screen
import { useAuth } from "@/app/context/AuthContext";
import {
  getEncryptedPrakritiResult,
  decryptPrakritiResult,
} from "@/app/services/prakritiService";

const { user } = useAuth();

// Encrypt
const encrypted = await getEncryptedPrakritiResult(user!.id);
console.log("✅ Encrypted:", encrypted);

// Decrypt
const decrypted = await decryptPrakritiResult(user!.id, encrypted!);
console.log("✅ Decrypted:", decrypted);
```

### Test 2: Encrypt Health Profile

```typescript
import { getEncryptedHealthProfile } from "@/app/services/analyticsService";

const { profile, encrypted } = await getEncryptedHealthProfile(user!.id);
console.log("✅ Health data encrypted");
console.log("Algorithm:", encrypted?.algorithm);
console.log("Timestamp:", new Date(encrypted?.timestamp || 0));
```

## Current Status

### ✅ Implemented Features

- [x] Core PQC encryption service
- [x] Prakriti data encryption
- [x] Health profile encryption
- [x] Type-safe enum mapping
- [x] Data integrity verification
- [x] Key pair generation
- [x] Comprehensive documentation
- [x] Usage examples

### ⚠️ Using Simulated Encryption

**IMPORTANT**: The current implementation uses **simulated** Kyber encryption for demonstration. This is a simple XOR cipher and is **NOT secure** for production use.

### 🔄 Next Steps for Production

1. **Install actual PQC library**:

   ```bash
   npm install @noble/post-quantum
   ```

2. **Replace simulation in `pqcEncryption.ts`**:

   ```typescript
   // Replace simulateKyberEncryption with:
   import { kyber768 } from "@noble/post-quantum";

   const { publicKey, secretKey } = kyber768.keygen();
   const ciphertext = kyber768.encrypt(publicKey, plaintext);
   const decrypted = kyber768.decrypt(secretKey, ciphertext);
   ```

3. **Implement secure key storage**:

   ```typescript
   import * as SecureStore from "expo-secure-store";

   // Store private key securely
   await SecureStore.setItemAsync("user_private_key", privateKey);
   ```

4. **Backend integration**:
   - Update backend to accept PQC encrypted payloads
   - Implement server-side decryption
   - Set up proper key exchange protocol

## Verification

To verify PQC encryption is working:

1. **Check console logs** - Look for `[PQC]` prefixed messages
2. **Test encryption/decryption** - Data should encrypt and decrypt correctly
3. **Verify algorithm** - Should show `CRYSTALS-Kyber-768`
4. **Check timestamps** - Each encryption should have a unique timestamp

## Troubleshooting

### Issue: "Encryption key not initialized"

**Fix**: Call `initializePQC()` before using encryption

### Issue: Module 'buffer' not found

**Fix**: `npm install buffer`

### Issue: Type errors in analyticsService

**Fix**: Already resolved with enum mapping functions

## Resources

- **PQC Documentation**: `PQC_DOCUMENTATION.md`
- **Usage Examples**: `app/utils/pqcExamples.ts`
- **Core Service**: `app/utils/pqcEncryption.ts`

## Support

For questions or issues:

1. Check `pqcExamples.ts` for usage patterns
2. Review `PQC_DOCUMENTATION.md`
3. Look for `[PQC]` logs in console

---

**Status**: ✅ PQC Encryption Ready for Testing  
**Algorithm**: CRYSTALS-Kyber-768 (Simulated)  
**Production Ready**: ⚠️ No (requires actual library implementation)  
**Development/Demo**: ✅ Yes
