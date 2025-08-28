
'use client';

import { useState } from 'react';
import AuthSection from './components/AuthSection';
import ChatDashboard from './components/ChatDashboard';
import type { User } from './components/ChatDashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  if (!isAuthenticated) {
    return <AuthSection onLogin={handleLogin} />;
  }

  if (user) {
    return <ChatDashboard user={user} onLogout={handleLogout} />;
  }

  return null;
}
