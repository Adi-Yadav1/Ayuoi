// import React, { useState } from 'react';
// import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
// import { router } from 'expo-router';
// import { TextInputField } from '@/components/Forms';
// import { Button } from '@/components/ui/Button';
// import { useAuth } from '@/app/context/AuthContext';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFAF5',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//     alignItems: 'center',
//   },
//   logoContainer: {
//     width: 80,
//     height: 80,
//     backgroundColor: '#FDF2E8',
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 32,
//   },
//   logoText: {
//     fontSize: 36,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: '#6B7280',
//     textAlign: 'center',
//     marginBottom: 32,
//     fontSize: 16,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   loginContainer: {
//     alignItems: 'center',
//   },
//   loginText: {
//     color: '#6B7280',
//     fontSize: 14,
//   },
//   termsText: {
//     color: '#9CA3AF',
//     fontSize: 12,
//     textAlign: 'center',
//     marginTop: 32,
//   },
//   errorText: {
//     marginTop: 12,
//     color: '#B91C1C',
//     textAlign: 'center',
//     fontSize: 13,
//   },
// });

// export default function SignupScreen() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { signUp } = useAuth();

//   const handleSignup = async () => {
//     if (!name || !email || !password) {
//       alert('Please fill in all fields');
//       return;
//     }

//     if (password.length < 6) {
//       alert('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       await signUp(email.trim(), name.trim(), password);
//       router.replace('/(app)/(tabs)/home');
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Signup failed. Try again.';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         <View style={styles.contentContainer}>
//           {/* Logo */}
//           <View style={styles.logoContainer}>
//             <Text style={styles.logoText}>🌿</Text>
//           </View>

//           <Text style={styles.title}>Create Account</Text>
//           <Text style={styles.subtitle}>
//             Begin your personalized Ayurvedic wellness journey
//           </Text>

//           {/* Form */}
//           <View style={styles.formContainer}>
//             <TextInputField
//               label="Full Name"
//               placeholder="John Doe"
//               value={name}
//               onChangeText={setName}
//             />

//             <TextInputField
//               label="Email Address"
//               placeholder="you@example.com"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />

//             <TextInputField
//               label="Password"
//               placeholder="Create a password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />

//             <Button
//               title={loading ? 'Creating Account...' : 'Create Account'}
//               onPress={handleSignup}
//               disabled={loading}
//               style={{ marginTop: 8, marginBottom: 24 }}
//             />

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             <View style={styles.loginContainer}>
//               <Text style={styles.loginText}>
//                 Already have an account?{' '}
//               </Text>
//               <Button
//                 title="Log In"
//                 onPress={() => router.push('/(auth)/login')}
//                 variant="outline"
//                 size="small"
//                 style={{ marginTop: 8 }}
//               />
//             </View>

//             {/* Terms */}
//             <Text style={styles.termsText}>
//               By signing up, you agree to our Terms of Service and Privacy Policy
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { TextInputField } from '@/components/Forms';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
  },

  // Decorative background blobs
  blobTop: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FDE8CC',
    opacity: 0.6,
  },
  blobMid: {
    position: 'absolute',
    top: 180,
    right: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FDF2E8',
    opacity: 0.8,
  },
  blobBottom: {
    position: 'absolute',
    bottom: -40,
    left: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FAECD8',
    opacity: 0.5,
  },

  scrollContent: {
    flexGrow: 1,
  },

  innerContent: {
    paddingHorizontal: 28,
    paddingTop: 56,
    paddingBottom: 40,
    flex: 1,
  },

  // Header section
  headerSection: {
    alignItems: 'flex-start',
    marginBottom: 36,
  },
  logoWrapper: {
    width: 68,
    height: 68,
    backgroundColor: '#FDE8CC',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#EE9B4D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
  logoText: {
    fontSize: 36,
  },
  badge: {
    backgroundColor: '#FDE8CC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#C97B2E',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  titleAccent: {
    color: '#EE9B4D',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 280,
  },

  // Steps indicator
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 6,
  },
  stepDot: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EE9B4D',
  },
  stepDotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0E6DA',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3E9DC',
    marginBottom: 24,
  },

  formContainer: {
    gap: 4,
  },

  // Error
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 8,
  },
  errorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },

  // CTA button area
  ctaButton: {
    marginTop: 8,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F0E6DA',
  },
  dividerText: {
    color: '#C4B5A5',
    fontSize: 13,
    fontWeight: '500',
  },

  // Login link
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginText: {
    color: '#9CA3AF',
    fontSize: 15,
  },
  loginHighlight: {
    color: '#EE9B4D',
    fontWeight: '700',
    fontSize: 15,
  },

  // Terms
  termsContainer: {
    marginTop: 28,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  termsText: {
    color: '#C4B5A5',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsHighlight: {
    color: '#EE9B4D',
    fontWeight: '600',
  },

  // Benefits row
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 32,
  },
  benefitItem: {
    alignItems: 'center',
    gap: 4,
  },
  benefitIcon: {
    fontSize: 18,
  },
  benefitLabel: {
    fontSize: 11,
    color: '#C4B5A5',
    fontWeight: '500',
  },
});

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await signUp(email.trim(), name.trim(), password);
      router.replace('/(app)/(tabs)/home');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed. Try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative background */}
      <View style={styles.blobTop} />
      <View style={styles.blobMid} />
      <View style={styles.blobBottom} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.innerContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Free to Join</Text>
            </View>

            <Text style={styles.title}>
              Create{'\n'}
              <Text style={styles.titleAccent}>Account</Text>
            </Text>
            <Text style={styles.subtitle}>
              Begin your personalized Ayurvedic wellness journey today
            </Text>
          </View>

          {/* Step indicator */}
          <View style={styles.stepsRow}>
            <View style={styles.stepDot} />
            <View style={styles.stepDotInactive} />
            <View style={styles.stepDotInactive} />
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <View style={styles.formContainer}>
              <TextInputField
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
              />

              <TextInputField
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <TextInputField
                label="Password"
                placeholder="Create a password (min. 6 chars)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.ctaButton}>
              <Button
                title={loading ? 'Creating Account...' : 'Create Account'}
                onPress={handleSignup}
                disabled={loading}
              />
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <View style={styles.errorDot} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginHighlight}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsRow}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🌿</Text>
              <Text style={styles.benefitLabel}>Personalized</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🔒</Text>
              <Text style={styles.benefitLabel}>Private</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>✨</Text>
              <Text style={styles.benefitLabel}>Free</Text>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsHighlight}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsHighlight}>Privacy Policy</Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}