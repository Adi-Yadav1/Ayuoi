// import React, { useState } from 'react';
// import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
// import { router } from 'expo-router';
// import { TextInputField } from '@/components/Forms';
// import { Button } from '@/components/ui/Button';
// import { useAuth } from '@/app/context/AuthContext';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFAF5',
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
//     fontSize: 40,
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
//   divider: {
//     alignItems: 'center',
//     marginVertical: 24,
//   },
//   dividerText: {
//     color: '#9CA3AF',
//     fontSize: 14,
//   },
//   signupLink: {
//     marginBottom: 16,
//   },
//   signupText: {
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   signupHighlight: {
//     color: '#EE9B4D',
//     fontWeight: '600',
//   },
//   errorText: {
//     color: '#DC2626',
//     fontSize: 14,
//     marginTop: 8,
//     marginBottom: 16,
//   },
//   innerContent: {
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//   },
// });

// export default function LoginScreen() {
//   const [email, setEmail] = useState('adityayadav.gz1@gmail.com');
//   const [password, setPassword] = useState('123456');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { signIn } = useAuth();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       await signIn(email.trim(), password);
//       router.replace('/(app)/(tabs)/home');
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Login failed. Please check your email and password.';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.innerContent}>
//           {/* Logo */}
//           <View style={styles.logoContainer}>
//             <Text style={styles.logoText}>🌿</Text>
//           </View>

//           <Text style={styles.title}>Welcome Back</Text>
//           <Text style={styles.subtitle}>
//             Continue your Ayurvedic wellness journey
//           </Text>

//           {/* Form */}
//           <View style={styles.formContainer}>
//             <TextInputField
//               label="Email Address"
//               placeholder="demo@example.com"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />

//             <TextInputField
//               label="Password"
//               placeholder="Enter your password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />

//             <Button
//               title={loading ? 'Logging in...' : 'Log In'}
//               onPress={handleLogin}
//               disabled={loading}
//             />

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             <View style={styles.signupLink}>
//               <Text style={styles.signupText}>
//                 Don&apos;t have an account?{' '}
//               </Text>
//               <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
//                 <Text style={[styles.signupText, styles.signupHighlight]}>Sign Up</Text>
//               </TouchableOpacity>
//             </View>
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
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { TextInputField } from '@/components/Forms';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
  },

  // Decorative background blobs
  blobTop: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FDE8CC',
    opacity: 0.6,
  },
  blobMid: {
    position: 'absolute',
    top: 120,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FDF2E8',
    opacity: 0.8,
  },
  blobBottom: {
    position: 'absolute',
    bottom: -40,
    right: -30,
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
    marginBottom: 40,
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
    maxWidth: 260,
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

  // Forgot password
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: -8,
    marginBottom: 8,
  },
  forgotText: {
    color: '#EE9B4D',
    fontSize: 13,
    fontWeight: '600',
  },

  // Login button area
  loginBtn: {
    marginTop: 8,
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

  // Signup
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  signupText: {
    color: '#9CA3AF',
    fontSize: 15,
  },
  signupHighlight: {
    color: '#EE9B4D',
    fontWeight: '700',
    fontSize: 15,
  },

  // Trust indicators
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 32,
  },
  trustItem: {
    alignItems: 'center',
    gap: 4,
  },
  trustIcon: {
    fontSize: 18,
  },
  trustLabel: {
    fontSize: 11,
    color: '#C4B5A5',
    fontWeight: '500',
  },
});

export default function LoginScreen() {
  const [email, setEmail] = useState('adityayadav.gz1@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  // Fade-in animation
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

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await signIn(email.trim(), password);
      router.replace('/(app)/(tabs)/home');
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your email and password.';
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
              <Text style={styles.badgeText}>Ayurvedic Wellness</Text>
            </View>

            <Text style={styles.title}>
              Welcome{'\n'}
              <Text style={styles.titleAccent}>Back</Text>
            </Text>
            <Text style={styles.subtitle}>
              Continue your wellness journey where you left off
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <View style={styles.formContainer}>
              <TextInputField
                label="Email Address"
                placeholder="demo@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <TextInputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginBtn}>
              <Button
                title={loading ? 'Logging in...' : 'Log In'}
                onPress={handleLogin}
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

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.signupHighlight}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Trust indicators */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🔒</Text>
              <Text style={styles.trustLabel}>Secure</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🌱</Text>
              <Text style={styles.trustLabel}>Natural</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✨</Text>
              <Text style={styles.trustLabel}>Holistic</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
