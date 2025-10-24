import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { OtpInput } from './OtpInput';
import { authService } from '../../services/auth';

interface SignInScreenProps {
  onSuccess: () => void;
}

export function SignInScreen({ onSuccess }: SignInScreenProps) {
  const [tab, setTab] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleRequest = async () => {
    setError('');
    setLoading(true);

    try {
      await authService.requestOtp(identifier);
      setStep('verify');
      setResendTimer(30);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    setError('');
    setLoading(true);

    try {
      await authService.verifyOtp(identifier, code);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    await handleRequest();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>No passwords. Takes under 20 seconds.</Text>

      {step === 'request' && (
        <>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, tab === 'phone' && styles.tabActive]}
              onPress={() => setTab('phone')}
              accessibilityLabel="Sign in with phone"
            >
              <Text style={[styles.tabText, tab === 'phone' && styles.tabTextActive]}>
                📱 Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === 'email' && styles.tabActive]}
              onPress={() => setTab('email')}
              accessibilityLabel="Sign in with email"
            >
              <Text style={[styles.tabText, tab === 'email' && styles.tabTextActive]}>
                ✉️ Email
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{tab === 'phone' ? 'Phone Number' : 'Email Address'}</Text>
            <TextInput
              style={styles.input}
              value={identifier}
              onChangeText={setIdentifier}
              placeholder={tab === 'phone' ? '+1 555 123 4567' : 'you@example.com'}
              keyboardType={tab === 'phone' ? 'phone-pad' : 'email-address'}
              autoCapitalize="none"
              editable={!loading}
              accessibilityLabel={tab === 'phone' ? 'Phone number' : 'Email address'}
            />
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, (!identifier || loading) && styles.buttonDisabled]}
            onPress={handleRequest}
            disabled={!identifier || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send {tab === 'phone' ? 'Code' : 'Magic Link'}</Text>
            )}
          </TouchableOpacity>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton} disabled>
              <Text style={styles.socialButtonText}>🍎 Sign in with Apple (Coming Soon)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} disabled>
              <Text style={styles.socialButtonText}>🔍 Sign in with Google (Coming Soon)</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === 'verify' && (
        <>
          <Text style={styles.verifyText}>Enter the 6-digit code sent to {identifier}</Text>

          <OtpInput length={6} onComplete={handleVerify} disabled={loading} />

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={handleResend}
            disabled={resendTimer > 0}
            style={styles.resendButton}
          >
            <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  tabTextActive: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  socialButtons: {
    gap: 12,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    opacity: 0.5,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  verifyText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  resendButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  resendTextDisabled: {
    color: '#9ca3af',
  },
});
