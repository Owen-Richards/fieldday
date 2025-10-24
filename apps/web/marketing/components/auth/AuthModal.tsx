import React, { useState } from 'react';
import { OtpInput } from './OtpInput';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
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
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

      if (tab === 'phone') {
        const response = await fetch(`${apiBase}/auth/otp/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: identifier }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to send OTP');
        }

        setStep('verify');
        setResendTimer(30);
      } else {
        const response = await fetch(`${apiBase}/auth/magic/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to send magic link');
        }

        setStep('verify');
        setResendTimer(30);
      }
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
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const body = tab === 'phone' ? { phone: identifier, code } : { email: identifier, code };

      const response = await fetch(`${apiBase}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Invalid code');
      }

      const result = await response.json();
      localStorage.setItem('accessToken', result.data.accessToken);

      onSuccess?.();
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6">No passwords. Takes under 20 seconds.</p>

        {step === 'request' && (
          <>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('phone')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  tab === 'phone'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Sign in with phone"
              >
                📱 Phone
              </button>
              <button
                onClick={() => setTab('email')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  tab === 'email'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Sign in with email"
              >
                ✉️ Email
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-2">
                  {tab === 'phone' ? 'Phone Number' : 'Email Address'}
                </label>
                <input
                  id="identifier"
                  type={tab === 'phone' ? 'tel' : 'email'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={tab === 'phone' ? '+1 555 123 4567' : 'you@example.com'}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                  aria-required="true"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm" role="alert">
                  {error}
                </div>
              )}

              <button
                onClick={handleRequest}
                disabled={loading || !identifier}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? '⏳ Sending...' : `Send ${tab === 'phone' ? 'Code' : 'Magic Link'}`}
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <button
                disabled
                className="w-full py-3 border rounded-lg font-medium text-gray-400 cursor-not-allowed"
              >
                🍎 Sign in with Apple (Coming Soon)
              </button>
              <button
                disabled
                className="w-full py-3 border rounded-lg font-medium text-gray-400 cursor-not-allowed"
              >
                🔍 Sign in with Google (Coming Soon)
              </button>
            </div>
          </>
        )}

        {step === 'verify' && tab === 'phone' && (
          <>
            <p className="mb-6">Enter the 6-digit code sent to {identifier}</p>

            <OtpInput length={6} onComplete={handleVerify} disabled={loading} />

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm" role="alert">
                {error}
              </div>
            )}

            <button
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="mt-4 text-blue-600 hover:underline disabled:text-gray-400"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </button>
          </>
        )}

        {step === 'verify' && tab === 'email' && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✉️</div>
            <h3 className="text-lg font-semibold mb-2">Check your email!</h3>
            <p className="text-gray-600">
              We sent a magic link to {identifier}. Click the link to sign in.
            </p>

            <button
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="mt-6 text-blue-600 hover:underline disabled:text-gray-400"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Link'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
