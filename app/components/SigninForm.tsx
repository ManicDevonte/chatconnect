'use client';

import { useState } from 'react';

type SigninFormProps = {
  onLogin: (...args: any[]) => void;
  onSwitchToSignup: () => void;
};

export default function SigninForm({ onLogin, onSwitchToSignup }: SigninFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        fullName: 'John Doe',
        email: formData.email,
        avatar: `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20friendly%20person%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit%2C%20business%20casual%20attire&width=100&height=100&seq=avatar-signin&orientation=squarish`,
        status: 'online'
      };
      onLogin(userData);
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 backdrop-blur-sm transition-all"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 backdrop-blur-sm transition-all"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-green-600 cursor-pointer" />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <button type="button" className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
