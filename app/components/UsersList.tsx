
'use client';

import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  avatar: string;
  status?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isTyping?: boolean;
  // Add other fields as needed
};

type UsersListProps = {
  currentUser: User;
  onUserSelect: (user: User) => void;
  onLogout: () => void;
  selectedUser: User | null;
};


export default function UsersList({ currentUser, onUserSelect, onLogout, selectedUser }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<any[]>([]);


  useEffect(() => {
    // Mock users data
    const mockUsers = [
      {
        id: 1,
        name: 'Sarah Wilson',
        avatar: `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20woman%20with%20brown%20hair%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit%2C%20business%20casual%20attire&width=100&height=100&seq=user1&orientation=squarish`,
        status: 'online',
        lastMessage: 'Hey! How are you doing?',
        lastMessageTime: '2 min ago',
        unreadCount: 2,
        isTyping: false
      },
      {
        id: 2,
        name: 'Mike Johnson',
        avatar: `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20man%20with%20short%20hair%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit%2C%20business%20casual%20attire&width=100&height=100&seq=user2&orientation=squarish`,
        status: 'online',
        lastMessage: 'Can we schedule a meeting?',
        lastMessageTime: '5 min ago',
        unreadCount: 0,
        isTyping: true
      },
      {
        id: 3,
        name: 'Emma Davis',
        avatar: `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20woman%20with%20blonde%20hair%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit%2C%20business%20casual%20attire&width=100&height=100&seq=user3&orientation=squarish`,
        status: 'offline',
        lastMessage: 'Thanks for your help!',
        lastMessageTime: '1 hour ago',
        unreadCount: 0,
        isTyping: false
      },
      {
        id: 4,
        name: 'Alex Chen',
        avatar: `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Asian%20man%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit%2C%20business%20casual%20attire&width=100&height=100&seq=user4&orientation=squarish`,
        status: 'online',
        lastMessage: 'Let\'s catch up soon!',
        lastMessageTime: '3 hours ago',
        unreadCount: 1,
        isTyping: false
      },
      {
        id: 5,
        name: 'Lisa Garcia',
        avatar: `https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Hispanic%20woman%20smiling%2C%20clean%20background%2C%20modern%20portrait%20photography%2C%20high%20quality%2C%20well-lit%2C%20business%20casual%20attire&width=100&height=100&seq=user5&orientation=squarish`,
        status: 'offline',
        lastMessage: 'See you tomorrow!',
        lastMessageTime: '1 day ago',
        unreadCount: 0,
        isTyping: false
      }
    ];

    const mockGroups = [
      {
        id: 101,
        name: 'Team Alpha',
        avatar: `https://readdy.ai/api/search-image?query=Modern%20group%20chat%20icon%20with%20multiple%20people%20silhouettes%2C%20blue%20and%20purple%20gradient%20background%2C%20clean%20minimal%20design%2C%20professional%20team%20collaboration%20symbol&width=100&height=100&seq=group1&orientation=squarish`,
        members: 5,
        lastMessage: 'Mike: Great work everyone!',
        lastMessageTime: '30 min ago',
        unreadCount: 3,
        isGroup: true
      },
      {
        id: 102,
        name: 'Project Beta',
        avatar: `https://readdy.ai/api/search-image?query=Modern%20group%20chat%20icon%20with%20multiple%20people%20silhouettes%2C%20green%20gradient%20background%2C%20clean%20minimal%20design%2C%20professional%20team%20collaboration%20symbol&width=100&height=100&seq=group2&orientation=squarish`,
        members: 8,
        lastMessage: 'Sarah: Meeting at 3 PM',
        lastMessageTime: '2 hours ago',
        unreadCount: 0,
        isGroup: true
      }
    ];

    setUsers(mockUsers);
    setGroups(mockGroups);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onlineUsers = filteredUsers.filter(user => user.status === 'online');
  const offlineUsers = filteredUsers.filter(user => user.status === 'offline');

  return (
    <div className="flex flex-col h-full relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full bg-repeat opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Subtle%20geometric%20pattern%2C%20minimalist%20design%2C%20light%20blue%20and%20white%20colors%2C%20small%20repeating%20shapes%2C%20modern%20texture%20background%2C%20very%20light%20opacity%20suitable%20for%20overlay&width=200&height=200&seq=pattern-bg&orientation=squarish')`
          }}
        ></div>
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-white/50 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold bg-green-600 bg-clip-text text-transparent">
            Chats
          </h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowCreateGroup(true)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer"
            >
              <i className="ri-group-line text-lg"></i>
            </button>
            <button 
              onClick={onLogout}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
            >
              <i className="ri-logout-box-r-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/80 text-sm transition-all"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {/* Groups */}
        {filteredGroups.length > 0 && (
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Groups</h3>
            {filteredGroups.map(group => (
              <div
                key={group.id}
                onClick={() => onUserSelect(group)}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all mb-2 backdrop-blur-sm ${
                  selectedUser?.id === group.id 
                    ? 'bg-green-600 text-white shadow-lg transform scale-[1.02]' 
                    : 'hover:bg-white/60 bg-white/30'
                }`}
              >
                <div className="relative">
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50"
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium truncate ${
                      selectedUser?.id === group.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {group.name}
                    </h3>
                    <span className={`text-xs ${
                      selectedUser?.id === group.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {group.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      selectedUser?.id === group.id ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {group.lastMessage}
                    </p>
                    {group.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center shadow-lg">
                        {group.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Online</h3>
            {onlineUsers.map(user => (
              <div
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all mb-2 backdrop-blur-sm ${
                  selectedUser?.id === user.id 
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg transform scale-[1.02]' 
                    : 'hover:bg-white/60 bg-white/30'
                }`}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full ring-2 ring-green-200"></div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium truncate ${
                      selectedUser?.id === user.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user.name}
                    </h3>
                    <span className={`text-xs ${
                      selectedUser?.id === user.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {user.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      selectedUser?.id === user.id ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {user.isTyping ? (
                        <span className="text-blue-600 italic">typing...</span>
                      ) : (
                        user.lastMessage
                      )}
                    </p>
                    {(user.unreadCount ?? 0) > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center shadow-lg">
                        {user.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Offline Users */}
        {offlineUsers.length > 0 && (
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Offline</h3>
            {offlineUsers.map(user => (
              <div
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all mb-2 backdrop-blur-sm ${
                  selectedUser?.id === user.id 
                    ? 'bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-lg transform scale-[1.02]' 
                    : 'hover:bg-white/60 bg-white/30'
                }`}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 opacity-80"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium truncate ${
                      selectedUser?.id === user.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user.name}
                    </h3>
                    <span className={`text-xs ${
                      selectedUser?.id === user.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {user.lastMessageTime}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${
                    selectedUser?.id === user.id ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {user.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
