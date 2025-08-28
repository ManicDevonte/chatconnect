export type User = {
  id: number;
  name: string;
  avatar: string;
  status: string; // required!
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isTyping?: boolean;
  isGroup?: boolean;
  members?: number;
};