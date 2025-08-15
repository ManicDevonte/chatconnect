
'use client';

import { useState } from 'react';
import AuthSection from './components/AuthSection';
import ChatDashboard from './components/ChatDashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
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

  return <ChatDashboard user={user} onLogout={handleLogout} />;
}
