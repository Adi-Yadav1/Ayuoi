import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { TextInputField } from '@/components/Forms';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
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
    fontSize: 36,
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
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    color: '#6B7280',
    fontSize: 14,
  },
  termsText: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
  },
  errorText: {
    marginTop: 12,
    color: '#B91C1C',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🌿</Text>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Begin your personalized Ayurvedic wellness journey
          </Text>

          {/* Form */}
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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title={loading ? 'Creating Account...' : 'Create Account'}
              onPress={handleSignup}
              disabled={loading}
              style={{ marginTop: 8, marginBottom: 24 }}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
              </Text>
              <Button
                title="Log In"
                onPress={() => router.push('/(auth)/login')}
                variant="outline"
                size="small"
                style={{ marginTop: 8 }}
              />
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
