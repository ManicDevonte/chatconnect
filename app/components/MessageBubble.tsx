
'use client';

type Message = {
  type: 'text' | 'image' | 'video' | 'voice';
  text?: string;
  fileUrl?: string;
  timestamp: string | number | Date;
};

type User = {
  name: string;
  avatar: string;
};

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  user: User;
}

export default function MessageBubble({ message, isOwn, user }: MessageBubbleProps) {
  const formatTime = (timestamp: string | number | Date) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start space-x-2 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isOwn && (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover ring-2 ring-white/50 flex-shrink-0"
        />
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'text-right' : ''}`}>
        <div
          className={`inline-block px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm ${
            isOwn
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-white/90 text-gray-900 border border-white/50'
          }`}
        >
          {message.type === 'image' && message.fileUrl && (
            <div className="mb-2">
              <img
                src={message.fileUrl}
                alt="Shared image"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          )}
          
          {message.type === 'video' && (
            <div className={`flex items-center space-x-2 ${isOwn ? 'text-white/90' : 'text-blue-600'}`}>
              <i className="ri-video-line text-lg"></i>
              <span className="text-sm">Video message</span>
            </div>
          )}
          
          {message.type === 'voice' && (
            <div className={`flex items-center space-x-2 ${isOwn ? 'text-white/90' : 'text-green-600'}`}>
              <i className="ri-mic-line text-lg"></i>
              <span className="text-sm">Voice message</span>
            </div>
          )}
          
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        
        <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${isOwn ? 'justify-end' : ''}`}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && (
            <div className="flex items-center space-x-1">
              <i className="ri-check-double-line text-blue-500"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
