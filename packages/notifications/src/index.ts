// Notifications Service for EduSure
// Handles push notifications, email, and SMS

export interface Notification {
  id: string;
  userId: string;
  type: 'class_reminder' | 'assignment_due' | 'grade_posted' | 'feedback_received' |
        'attendance_alert' | 'payment_due' | 'system_update' | 'message' | 'announcement';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  readAt?: Date;
  channels: ('in_app' | 'email' | 'sms' | 'push')[];
  relatedEntity?: {
    type: string;
    id: string;
  };
  createdAt: Date;
}

export interface NotificationPreferences {
  userId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
  types: Record<string, boolean>;
}

class NotificationService {
  async sendNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send notification');
    }
    
    return response.json();
  }

  async sendBulkNotifications(notifications: Omit<Notification, 'id' | 'createdAt' | 'read'>[]): Promise<void> {
    await fetch('/api/notifications/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notifications),
    });
  }

  async getUserNotifications(userId: string, limit: number = 50, offset: number = 0): Promise<Notification[]> {
    const response = await fetch(`/api/notifications?userId=${userId}&limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    
    return response.json();
  }

  async markAsRead(notificationId: string): Promise<void> {
    await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await fetch(`/api/notifications/read-all?userId=${userId}`, {
      method: 'POST',
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    const response = await fetch(`/api/notifications/unread-count?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get unread count');
    }
    
    const data = await response.json();
    return data.count;
  }

  async updatePreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await fetch(`/api/notifications/preferences?userId=${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }
    
    return response.json();
  }

  async getPreferences(userId: string): Promise<NotificationPreferences> {
    const response = await fetch(`/api/notifications/preferences?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch preferences');
    }
    
    return response.json();
  }

  // Helper methods for common notification types
  async notifyAssignmentDue(studentId: string, assignmentId: string, assignmentTitle: string, dueDate: Date): Promise<void> {
    await this.sendNotification({
      userId: studentId,
      type: 'assignment_due',
      title: 'Assignment Due Soon',
      message: `Your assignment "${assignmentTitle}" is due on ${dueDate.toLocaleDateString()}`,
      priority: 'high',
      channels: ['in_app', 'email', 'push'],
      relatedEntity: { type: 'assignment', id: assignmentId },
      createdAt: new Date(),
    });
  }

  async notifyGradePosted(studentId: string, assessmentId: string, assessmentTitle: string, grade: number): Promise<void> {
    await this.sendNotification({
      userId: studentId,
      type: 'grade_posted',
      title: 'Grade Posted',
      message: `Your grade for "${assessmentTitle}" has been posted: ${grade}/100`,
      priority: 'medium',
      channels: ['in_app', 'email'],
      relatedEntity: { type: 'assessment', id: assessmentId },
      createdAt: new Date(),
    });
  }

  async notifyClassReminder(studentId: string, sessionId: string, sessionTitle: string, startTime: Date): Promise<void> {
    await this.sendNotification({
      userId: studentId,
      type: 'class_reminder',
      title: 'Class Starting Soon',
      message: `Your class "${sessionTitle}" starts at ${startTime.toLocaleTimeString()}`,
      priority: 'high',
      channels: ['in_app', 'push'],
      relatedEntity: { type: 'session', id: sessionId },
      createdAt: new Date(),
    });
  }
}

// Singleton instance
export const notificationService = new NotificationService();

export default notificationService;