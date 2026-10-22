// Messaging Service for EduSure
// Handles real-time messaging and notifications

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  replyTo?: Message | null;
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  type: 'one-to-one' | 'group' | 'class' | 'announcement';
  name?: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: string;
  }>;
  lastMessage?: Message;
  isArchived: boolean;
  createdAt: Date;
}

class MessagingService {
  private socket: any = null;
  private eventHandlers: Map<string, Function[]> = new Map();

  connect(token: string) {
    // Will be initialized with Socket.IO client
    console.log('Connecting messaging service with token');
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, handler: Function) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  emit(event: string, data?: any) {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }

  async sendMessage(conversationId: string, content: string, fileUrl?: string): Promise<Message> {
    // API call to send message
    const response = await fetch('/api/messaging/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, content, fileUrl }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    return response.json();
  }

  async createConversation(type: string, participantIds: string[], name?: string): Promise<Conversation> {
    const response = await fetch('/api/messaging/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, participantIds, name }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create conversation');
    }
    
    return response.json();
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    const response = await fetch(`/api/messaging/conversations?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch conversations');
    }
    
    return response.json();
  }

  async markAsRead(conversationId: string, messageId: string): Promise<void> {
    await fetch('/api/messaging/messages/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, messageId }),
    });
  }
}

// Singleton instance
export const messagingService = new MessagingService();

export default messagingService;