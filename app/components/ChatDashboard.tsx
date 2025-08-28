'use client';

import { useState, useEffect } from 'react';
import UsersList from './UsersList';
import ChatInterface from './ChatInterface';
import ProfilePanel from './ProfilePanel';

import type { User } from '../types/User';

type ChatDashboardProps = {
  user: User;
  onLogout: () => void;
};

export default function ChatDashboard({ user, onLogout }: ChatDashboardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    ...user,
    status: user.status || '', // Ensure status is always a string
  });
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser({
      ...user,
      status: user.status || '', // Ensure status is always a string
    });
    if (isMobile) {
      setShowProfile(false);
    }
  };

  const handleUserUpdate = (updatedData: { name: string; avatar?: string; status?: string; about?: string }) => {
    const updatedUser: User = {
      ...currentUser,
      name: updatedData.name,
      avatar: updatedData.avatar ?? currentUser.avatar,
      status: updatedData.status ?? currentUser.status,
      statusMessage: updatedData.status,
      about: updatedData.about
    };
    setCurrentUser(updatedUser);

    if (selectedUser && selectedUser.name === currentUser.name) {
      setSelectedUser({
        ...selectedUser,
        name: updatedData.name,
        avatar: updatedData.avatar ?? selectedUser.avatar,
        status: updatedData.status ?? selectedUser.status,
        statusMessage: updatedData.status,
        about: updatedData.about
      });
    }
  };

  return (
    <div className="flex h-full w-full">
      <UsersList
        currentUser={currentUser}
        onUserSelect={handleUserSelect}
        onLogout={onLogout}
        selectedUser={selectedUser}
      />

      {/* Chat Interface - Shows when user is selected */}
      {selectedUser && !showProfile && (
        <div className={`${isMobile ? 'w-full' : 'flex-1'} flex flex-col`}>
          <ChatInterface 
            currentUser={currentUser}
            selectedUser={selectedUser}
            onShowProfile={handleShowProfile}
            onBack={() => setSelectedUser(null)}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Profile Panel - Desktop: always visible when user selected, Mobile: overlay */}
      {selectedUser && !isMobile && (
        <div className="w-80 border-l border-white/50 bg-white/80 backdrop-blur-xl shadow-xl">
          {selectedUser && (
            <ProfilePanel 
              user={selectedUser}
              currentUser={{ fullName: currentUser.name }}
              onClose={() => setShowProfile(false)}
              onUserUpdate={handleUserUpdate}
              isMobile={false}
            />
          )}
        </div>
      )}

      {/* Mobile Profile Overlay */}
      {showProfile && isMobile && selectedUser && (
        <div className="w-full bg-white/95 backdrop-blur-xl">
          <ProfilePanel 
            user={selectedUser}
            currentUser={{ fullName: currentUser.name }}
            onClose={() => setShowProfile(false)}
            onUserUpdate={handleUserUpdate}
            isMobile={true}
          />
        </div>
      )}

      {/* Empty State - Desktop only */}
      {!selectedUser && !isMobile && (
        <div 
          className="flex-1 flex items-center justify-center relative"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Abstract%20geometric%20pattern%20with%20soft%20gradients%2C%20modern%20minimalist%20background%20design%2C%20blue%20and%20purple%20tones%2C%20subtle%20geometric%20shapes%2C%20clean%20contemporary%20wallpaper%2C%20peaceful%20atmosphere&width=800&height=600&seq=empty-bg&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/40"></div>
          <div className="text-center relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-chat-3-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to ChatConnect</h3>
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}