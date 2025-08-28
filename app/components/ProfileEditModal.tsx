'use client';

import { useState } from 'react';

interface ProfileEditModalProps {
  user: {
    fullName?: string;
    name?: string;
    status?: string;
    about?: string;
    avatar: string;
  };
  onClose: () => void;
  onSave: (formData: {
    name: string;
    status: string;
    about: string;
    avatar: string;
  }) => void;
}

export default function ProfileEditModal({ user, onClose, onSave }: ProfileEditModalProps) {
  const [formData, setFormData] = useState({
    name: user.fullName || user.name || '',
    status: user.status || 'Available',
    about: user.about || 'Love connecting with people and sharing great moments.',
    avatar: user.avatar
  });

  const statusOptions = [
    { value: 'Available', label: 'Available', color: 'from-green-500 to-green-600' },
    { value: 'Busy', label: 'Busy', color: 'from-red-500 to-red-600' },
    { value: 'Away', label: 'Away', color: 'from-yellow-500 to-yellow-600' },
    { value: 'Do not disturb', label: 'Do not disturb', color: 'from-purple-500 to-purple-600' }
  ];

  const avatarOptions = [
    `https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20friendly%20person%20smiling%2C%20clean%20modern%20background%2C%20high%20quality%20photography%2C%20business%20casual%20attire%2C%20warm%20lighting&width=120&height=120&seq=avatar1&orientation=squarish`,
    `https://readdy.ai/api/search-image?query=Portrait%20photo%20of%20a%20confident%20professional%2C%20modern%20studio%20lighting%2C%20clean%20background%2C%20business%20attire%2C%20approachable%20expression%2C%20high%20resolution&width=120&height=120&seq=avatar2&orientation=squarish`,
    `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20person%20with%20a%20genuine%20smile%2C%20contemporary%20portrait%20photography%2C%20neutral%20background%2C%20casual%20professional%20look&width=120&height=120&seq=avatar3&orientation=squarish`,
    `https://readdy.ai/api/search-image?query=Modern%20professional%20portrait%20photo%2C%20clean%20studio%20background%2C%20person%20in%20business%20casual%20clothing%2C%20confident%20friendly%20expression%2C%20high%20quality&width=120&height=120&seq=avatar4&orientation=squarish`,
    `https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20with%20natural%20lighting%2C%20modern%20background%2C%20person%20wearing%20contemporary%20attire%2C%20warm%20welcoming%20smile&width=120&height=120&seq=avatar5&orientation=squarish`,
    `https://readdy.ai/api/search-image?query=Clean%20professional%20portrait%20photo%2C%20minimalist%20background%2C%20person%20in%20modern%20business%20attire%2C%20confident%20approachable%20expression%2C%20studio%20quality&width=120&height=120&seq=avatar6&orientation=squarish`
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5 rounded-2xl"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Subtle%20edit%20profile%20pattern%20background%2C%20very%20light%20blue%20and%20purple%20colors%2C%20minimalist%20design%2C%20soft%20geometric%20shapes%2C%20modern%20user%20interface%20theme%2C%20ultra%20light%20opacity&width=400&height=600&seq=edit-pattern&orientation=portrait')`
          }}
        ></div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm relative z-10 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Profile
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-white/50 cursor-pointer transition-all"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 relative z-10">
          {/* Avatar Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <img
                    src={formData.avatar}
                    alt="Current avatar"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => handleInputChange('avatar', avatar)}
                  className={`relative rounded-xl overflow-hidden transition-all cursor-pointer ${
                    formData.avatar === avatar 
                      ? 'ring-4 ring-blue-500 transform scale-105' 
                      : 'ring-2 ring-gray-200 hover:ring-blue-300'
                  }`}
                >
                  <img
                    src={avatar}
                    alt={`Avatar option ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  {formData.avatar === avatar && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange('status', option.value)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all cursor-pointer ${
                    formData.status === option.value
                      ? 'bg-blue-50 ring-2 ring-blue-500'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${option.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                  {formData.status === option.value && (
                    <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
            <textarea
              value={formData.about}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  handleInputChange('about', e.target.value);
                }
              }}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all resize-none"
              placeholder="Tell others about yourself..."
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">Share a bit about yourself</span>
              <span className={`text-xs ${formData.about.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                {formData.about.length}/500
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/50 bg-gray-50/80 backdrop-blur-sm rounded-b-2xl relative z-10">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer whitespace-nowrap shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}