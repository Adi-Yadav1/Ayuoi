import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { TextInputField } from '@/components/Forms';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FDF2E8',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  signupLink: {
    marginBottom: 16,
  },
  signupText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  signupHighlight: {
    color: '#EE9B4D',
    fontWeight: '600',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  innerContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
});

export default function LoginScreen() {
  const [email, setEmail] = useState('adityayadav.gz1@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

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
      const message = err instanceof Error ? err.message : 'Login failed. Please check your email and password.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContent}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🌿</Text>
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Continue your Ayurvedic wellness journey
          </Text>

          {/* Form */}
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

            <Button
              title={loading ? 'Logging in...' : 'Log In'}
              onPress={handleLogin}
              disabled={loading}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.signupLink}>
              <Text style={styles.signupText}>
                Don&apos;t have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={[styles.signupText, styles.signupHighlight]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
