
'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

type User = {
  id: number;
  name: string;
  avatar: string;
  status?: string;
  isGroup?: boolean;
  members?: number;
};

type ChatInterfaceProps = {
  currentUser: User;
  selectedUser: User;
  onShowProfile: () => void;
  onBack: () => void;
  isMobile: boolean;
};

type Message = {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
  type: string;
  fileUrl?: string | null;
};

export default function ChatInterface({ currentUser, selectedUser, onShowProfile, onBack, isMobile }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mockMessages: { [key: string]: Message[] } = {
      '1': [
        { id: 1, senderId: 1, text: 'Hey! How are you doing?', timestamp: new Date(Date.now() - 120000), type: 'text' },
        { id: 2, senderId: currentUser.id, text: 'I\'m doing great! Thanks for asking. How about you?', timestamp: new Date(Date.now() - 60000), type: 'text' },
        { id: 3, senderId: 1, text: 'I\'m good too! Just finished a great project.', timestamp: new Date(Date.now() - 30000), type: 'text' }
      ],
      '2': [
        { id: 4, senderId: 2, text: 'Can we schedule a meeting?', timestamp: new Date(Date.now() - 300000), type: 'text' },
        { id: 5, senderId: currentUser.id, text: 'Sure! What time works for you?', timestamp: new Date(Date.now() - 180000), type: 'text' },
        { id: 6, senderId: 2, text: 'How about 3 PM tomorrow?', timestamp: new Date(Date.now() - 60000), type: 'text' }
      ],
      '3': [
        { id: 7, senderId: 3, text: 'Thanks for your help!', timestamp: new Date(Date.now() - 3600000), type: 'text' },
        { id: 8, senderId: currentUser.id, text: 'You\'re welcome! Anytime.', timestamp: new Date(Date.now() - 3500000), type: 'text' }
      ]
    };

    setMessages(mockMessages[selectedUser.id.toString()] || []);
  }, [selectedUser.id, currentUser.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      text: message.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMessage = {
        id: Date.now() + 1,
        senderId: selectedUser.id,
        text: 'Thanks for your message!',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 2000);
  };

  const handleFileUpload = (type: string) => {
    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      text: `Shared a ${type}`,
      timestamp: new Date(),
      type: type,
      fileUrl: type === 'image' 
        ? `https://readdy.ai/api/search-image?query=Beautiful%20landscape%20photo%20with%20mountains%20and%20lake%2C%20nature%20photography%2C%20scenic%20view%2C%20high%20quality&width=300&height=200&seq=shared-${Date.now()}&orientation=landscape`
        : null
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl shadow-xl relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Subtle%20chat%20bubble%20pattern%20background%2C%20very%20light%20blue%20and%20white%20colors%2C%20minimalist%20messaging%20theme%2C%20soft%20geometric%20shapes%2C%20modern%20communication%20design%2C%20ultra%20light%20opacity&width=400&height=400&seq=chat-pattern&orientation=squarish')`
        }}
      ></div>

      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-white/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={onBack}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50 mr-2 cursor-pointer transition-all"
              >
                <i className="ri-arrow-left-line text-lg"></i>
              </button>
            )}
            <div className="relative">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/60"
              />
              {selectedUser.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full ring-2 ring-green-200 animate-pulse"></div>
              )}
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">{selectedUser.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedUser.isGroup ? `${selectedUser.members} members` : 
                 selectedUser.status === 'online' ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 cursor-pointer transition-all">
              <i className="ri-phone-line text-lg"></i>
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 cursor-pointer transition-all">
              <i className="ri-vidicon-line text-lg"></i>
            </button>
            <button 
              onClick={onShowProfile}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 cursor-pointer transition-all"
            >
              <i className="ri-information-line text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUser.id}
            user={msg.senderId === currentUser.id ? currentUser : selectedUser}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-2">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/50"
            />
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-4 py-3 border-t border-white/50 bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm relative z-10">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <button
                type="button"
                onClick={() => handleFileUpload('image')}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 cursor-pointer transition-all"
              >
                <i className="ri-image-line text-lg"></i>
              </button>
              <button
                type="button"
                onClick={() => handleFileUpload('video')}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-purple-600 rounded-full hover:bg-purple-50 cursor-pointer transition-all"
              >
                <i className="ri-video-line text-lg"></i>
              </button>
              <button
                type="button"
                onClick={() => handleFileUpload('voice')}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 rounded-full hover:bg-green-50 cursor-pointer transition-all"
              >
                <i className="ri-mic-line text-lg"></i>
              </button>
            </div>
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm bg-white/80 backdrop-blur-sm transition-all"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-10 h-10 bg-green-600 text-white rounded-full hover:from-green-700 hover:to-blue-700 transition-all flex items-center justify-center cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <i className="ri-send-plane-fill text-lg"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
