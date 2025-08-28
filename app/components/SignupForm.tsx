'use client';

import { useState } from 'react';

type SignupFormProps = {
  onLogin: (...args: any[]) => void;
  onSwitchToSignin: () => void;
};

export default function SignupForm({ onLogin, onSwitchToSignin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowOTP(true);
      setLoading(false);
    }, 1000);
  };

  const handleOTPVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp === '123456') {
      const userData = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        avatar: `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20friendly%20person%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit%2C%20business%20casual%20attire&width=100&height=100&seq=avatar-${Date.now()}&orientation=squarish`,
        status: 'online'
      };
      onLogin(userData);
    } else {
      alert('Invalid OTP. Please use 123456 for demo.');
    }
  };

  if (showOTP) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Verify Your Email
          </h3>
          <p className="text-gray-600 text-sm">
            We've sent a verification code to {formData.email}
          </p>
        </div>

        <form onSubmit={handleOTPVerification} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest bg-white/80 backdrop-blur-sm"
              placeholder="123456"
              maxLength={6}
              required
            />
            <p className="text-xs text-blue-600 mt-1 bg-blue-50 px-2 py-1 rounded">Demo OTP: 123456</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Verify & Create Account
          </button>
        </form>

        <button
          onClick={() => setShowOTP(false)}
          className="w-full text-gray-600 hover:text-gray-800 text-sm cursor-pointer bg-gray-50 py-2 rounded-lg transition-all"
        >
          ← Back to signup
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignin}
          className="text-green-600 hover:text-green-700 font-medium cursor-pointer"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
