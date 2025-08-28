
'use client';

import { useState } from 'react';
import ProfileEditModal from './ProfileEditModal';

type User = {
  name: string;
  avatar: string;
  status: string;
  isGroup?: boolean;
  members?: number;
  about?: string;
  statusMessage?: string;
};

type CurrentUser = {
  fullName: string;
};

type ProfilePanelProps = {
  user: User;
  currentUser: CurrentUser;
  onClose: () => void;
  isMobile?: boolean;
  onUserUpdate?: (updatedData: User) => void;
};

export default function ProfilePanel({ user, currentUser, onClose, isMobile, onUserUpdate }: ProfilePanelProps) {
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      url: `https://readdy.ai/api/search-image?query=Beautiful%20sunset%20landscape%20photo%2C%20golden%20hour%20lighting%2C%20nature%20photography%2C%20scenic%20mountain%20view%2C%20peaceful%20atmosphere&width=150&height=150&seq=media1&orientation=squarish`,
      timestamp: '2 days ago'
    },
    {
      id: 2,
      type: 'image',
      url: `https://readdy.ai/api/search-image?query=Coffee%20shop%20interior%20photo%2C%20cozy%20atmosphere%2C%20warm%20lighting%2C%20modern%20cafe%20design%2C%20people%20working%20on%20laptops&width=150&height=150&seq=media2&orientation=squarish`,
      timestamp: '1 week ago'
    },
    {
      id: 3,
      type: 'video',
      thumbnail: `https://readdy.ai/api/search-image?query=Video%20thumbnail%20showing%20a%20presentation%20screen%2C%20business%20meeting%2C%20professional%20environment%2C%20modern%20office%20setting&width=150&height=150&seq=media3&orientation=squarish`,
      timestamp: '2 weeks ago'
    },
    {
      id: 4,
      type: 'image',
      url: `https://readdy.ai/api/search-image?query=Team%20photo%20of%20young%20professionals%20smiling%2C%20group%20shot%2C%20office%20environment%2C%20diverse%20team%2C%20casual%20business%20attire&width=150&height=150&seq=media4&orientation=squarish`,
      timestamp: '1 month ago'
    }
  ];

  const handleProfileSave = (updatedData: User) => {
    if (onUserUpdate) {
      onUserUpdate(updatedData);
    }
  };

  return (
    <div className="h-full bg-white/90 backdrop-blur-xl flex flex-col relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Subtle%20user%20profile%20pattern%20background%2C%20very%20light%20purple%20and%20blue%20colors%2C%20minimalist%20design%2C%20soft%20geometric%20shapes%2C%20modern%20user%20interface%20theme%2C%20ultra%20light%20opacity&width=300&height=600&seq=profile-pattern&orientation=portrait')`
        }}
      ></div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-white/50 bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Contact Info
          </h2>
          <div className="flex items-center space-x-2">
            {/* Edit Profile Button - Only show for current user */}
            {user.name === currentUser.fullName && (
              <button
                onClick={() => setShowEditModal(true)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 cursor-pointer transition-all"
                title="Edit Profile"
              >
                <i className="ri-edit-line text-lg"></i>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-white/50 cursor-pointer transition-all"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {/* Profile Header */}
        <div className="px-4 py-6 text-center border-b border-white/50 bg-gradient-to-b from-green-50/40 to-green-50/40">
          <div className="relative inline-block">
            <div className="p-1 bg-green-600 rounded-full">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-white"
              />
            </div>
            {user.status === 'online' && (
              <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full ring-2 ring-green-200 animate-pulse"></div>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h3>
          <p className="text-sm text-gray-500">
            {user.isGroup ? `${user.members} members` : user.status === 'online' ? 'Online' : 'Last seen recently'}
          </p>
          {/* Status indicator for current user */}
          {user.name === currentUser.fullName && user.statusMessage && (
            <div className="mt-2 px-3 py-1 bg-blue-100 text-green-700 rounded-full text-xs inline-block">
              {user.statusMessage}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-4 border-b border-white/50">
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center p-3 rounded-xl hover:bg-white/60 transition-all cursor-pointer bg-white/30 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2">
                <i className="ri-phone-line text-white text-lg"></i>
              </div>
              <span className="text-xs text-gray-600">Call</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl hover:bg-white/60 transition-all cursor-pointer bg-white/30 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2">
                <i className="ri-vidicon-line text-white text-lg"></i>
              </div>
              <span className="text-xs text-gray-600">Video</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl hover:bg-white/60 transition-all cursor-pointer bg-white/30 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                <i className="ri-search-line text-white text-lg"></i>
              </div>
              <span className="text-xs text-gray-600">Search</span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 py-4 border-b border-white/50 bg-white/30 backdrop-blur-sm mx-4 my-2 rounded-xl">
          <h4 className="text-sm font-medium text-gray-900 mb-3">About</h4>
          <p className="text-sm text-gray-600">
            {user.isGroup 
              ? `Group created on ${new Date().toLocaleDateString()}. Welcome to ${user.name}!`
              : user.about || "Love connecting with people and sharing great moments. Always up for a good conversation!"
            }
          </p>
        </div>

        {/* Media Gallery */}
        <div className="px-4 py-4 border-b border-white/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900">Media & Files</h4>
            <button
              onClick={() => setShowMediaGallery(!showMediaGallery)}
              className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 px-3 py-1 rounded-full transition-all"
            >
              {showMediaGallery ? 'Show Less' : 'View All'}
            </button>
          </div>
          
          <div className={`grid grid-cols-3 gap-2 ${showMediaGallery ? '' : 'max-h-32 overflow-hidden'}`}>
            {mediaItems.map(item => (
              <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer ring-2 ring-white/50 hover:ring-blue-300 transition-all">
                <img
                  src={item.type === 'video' ? item.thumbnail : item.url}
                  alt="Shared media"
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <i className="ri-play-fill text-white text-sm"></i>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Group Members (if group) */}
        {user.isGroup && (
          <div className="px-4 py-4 border-b border-white/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">Members ({user.members})</h4>
              <button className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 px-3 py-1 rounded-full transition-all">
                Add Member
              </button>
            </div>
            
            <div className="space-y-3">
              {[ 'Sarah Wilson', 'Mike Johnson', 'Emma Davis', 'Alex Chen', 'Lisa Garcia'].map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-white/40 backdrop-blur-sm">
                  <img
                    src={`https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20person%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit&width=40&height=40&seq=member-${index}&orientation=squarish`}
                    alt={member}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{member}</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                  {member === currentUser.fullName && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">You</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="px-4 py-4">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/60 transition-all cursor-pointer bg-white/30 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <i className="ri-volume-mute-line text-white text-sm"></i>
                </div>
                <span className="text-sm text-gray-900">Mute Notifications</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/60 transition-all cursor-pointer bg-white/30 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <i className="ri-star-line text-white text-sm"></i>
                </div>
                <span className="text-sm text-gray-900">Starred Messages</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-all cursor-pointer bg-white/30 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <i className="ri-delete-bin-line text-white text-sm"></i>
                </div>
                <span className="text-sm text-red-600">
                  {user.isGroup ? 'Leave Group' : 'Delete Chat'}
                </span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <ProfileEditModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
}
