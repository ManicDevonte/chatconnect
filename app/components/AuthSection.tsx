
'use client';

import { useState } from 'react';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';

type AuthSectionProps = {
  onLogin: (...args: any[]) => void;
};

export default function AuthSection({ onLogin }: AuthSectionProps) {
  const [isSignup, setIsSignup] = useState(true);


  return (
    <div className="min-h-screen flex">
      {/* Left Column - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Group%20of%20diverse%20young%20people%20chatting%20and%20laughing%20together%20in%20a%20modern%20coffee%20shop%20with%20warm%20lighting%2C%20casual%20conversation%2C%20smartphones%20visible%2C%20social%20connection%2C%20vibrant%20atmosphere%2C%20contemporary%20interior%20design%2C%20natural%20lighting%20streaming%20through%20large%20windows%2C%20cozy%20ambient%20lighting%2C%20wooden%20tables%20and%20plants&width=800&height=1200&seq=auth-hero&orientation=portrait')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-4xl font-bold mb-4">Connect with Friends</h2>
            <p className="text-xl">Real-time messaging made simple and secure</p>
          </div>
        </div>
      </div>

      {/* Right Column - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Pacifico, serif' }}>
              ChatConnect
            </h1>
            <p className="text-gray-600">Join the conversation</p>
          </div>

          <div className="flex mb-6 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSignup ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                !isSignup ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            {isSignup ? (
              <SignupForm onLogin={onLogin} onSwitchToSignin={() => setIsSignup(false)} />
            ) : (
              <SigninForm onLogin={onLogin} onSwitchToSignup={() => setIsSignup(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
