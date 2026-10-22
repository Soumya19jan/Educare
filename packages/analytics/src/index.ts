// Analytics Service for EduSure
// Tracks and analyzes user engagement, performance metrics, and learning analytics

export interface Metric {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface DashboardData {
  totalStudents: number;
  totalTeachers: number;
  activeCourses: number;
  completionRate: number;
  averageGrade: number;
  attendanceRate: number;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  courseProgress: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  averageScore: number;
  attendanceRate: number;
  lastActive: Date;
}

class AnalyticsService {
  async getDashboardData(institutionId: string): Promise<DashboardData> {
    const response = await fetch(`/api/analytics/dashboard?institutionId=${institutionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    
    return response.json();
  }

  async getMetric(metricName: string, params: Record<string, any>): Promise<Metric> {
    const queryParams = new URLSearchParams({ metric: metricName, ...params }).toString();
    const response = await fetch(`/api/analytics/metrics?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch metric');
    }
    
    return response.json();
  }

  async getTimeSeriesData(
    metricName: string,
    startDate: Date,
    endDate: Date,
    interval: 'hour' | 'day' | 'week' | 'month' = 'day'
  ): Promise<TimeSeriesData[]> {
    const response = await fetch(
      `/api/analytics/timeseries?metric=${metricName}&start=${startDate.toISOString()}&end=${endDate.toISOString()}&interval=${interval}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch time series data');
    }
    
    return response.json();
  }

  async getStudentProgress(courseId: string): Promise<StudentProgress[]> {
    const response = await fetch(`/api/analytics/student-progress?courseId=${courseId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch student progress');
    }
    
    return response.json();
  }

  async getCourseAnalytics(courseId: string): Promise<any> {
    const response = await fetch(`/api/analytics/course/${courseId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch course analytics');
    }
    
    return response.json();
  }

  async getTeacherAnalytics(teacherId: string): Promise<any> {
    const response = await fetch(`/api/analytics/teacher/${teacherId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch teacher analytics');
    }
    
    return response.json();
  }

  async getEngagementMetrics(institutionId: string, dateRange: { start: Date; end: Date }): Promise<any> {
    const response = await fetch('/api/analytics/engagement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ institutionId, dateRange }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch engagement metrics');
    }
    
    return response.json();
  }

  async getLearningInsights(studentId: string): Promise<any> {
    const response = await fetch(`/api/analytics/insights?studentId=${studentId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch learning insights');
    }
    
    return response.json();
  }

  async trackEvent(eventName: string, properties: Record<string, any>): Promise<void> {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, properties, timestamp: new Date().toISOString() }),
    });
  }

  async getPopularContent(institutionId: string, limit: number = 10): Promise<any[]> {
    const response = await fetch(`/api/analytics/popular-content?institutionId=${institutionId}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular content');
    }
    
    return response.json();
  }

  async getCompletionRates(courseId: string): Promise<{ completed: number; inProgress: number; notStarted: number }> {
    const response = await fetch(`/api/analytics/completion-rates?courseId=${courseId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch completion rates');
    }
    
    return response.json();
  }
}

// Singleton instance
export const analyticsService = new AnalyticsService();

export default analyticsService;