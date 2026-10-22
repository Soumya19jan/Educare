/**
 * EduSure Distributed Microservices Configuration
 * Configured for separate deployment on Google Cloud Run & local development.
 */

export const API_ENDPOINTS = {
  // 1. Auth Backend Service (Cloud Run / Local: 4001)
  auth: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:4001',

  // 2. Parent Companion Backend Service (Cloud Run / Local: 4002)
  parent: process.env.NEXT_PUBLIC_PARENT_SERVICE_URL || 'http://localhost:4002',

  // 3. Teacher Workstation Backend Service (Cloud Run / Local: 4003)
  teacher: process.env.NEXT_PUBLIC_TEACHER_SERVICE_URL || 'http://localhost:4003',

  // 4. Student Maker Space Backend Service (Cloud Run / Local: 4004)
  student: process.env.NEXT_PUBLIC_STUDENT_SERVICE_URL || 'http://localhost:4004',
};

// Generic fetch wrapper with resilience & fallback
async function fetchService<T>(url: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      console.warn(`[Microservice Warning] ${url} returned status ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[Microservice Connection Fallback] Could not reach ${url}. Using local state.`);
    return null;
  }
}

// 1. Auth Service Client
export const authServiceClient = {
  login: async (email: string, password: string) => {
    return fetchService(`${API_ENDPOINTS.auth}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  register: async (data: { email: string; password: string; firstName: string; lastName: string; role: string }) => {
    return fetchService(`${API_ENDPOINTS.auth}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  health: async () => fetchService(`${API_ENDPOINTS.auth}/health`),
};

// 2. Parent Service Client
export const parentServiceClient = {
  getChildren: async () => fetchService(`${API_ENDPOINTS.parent}/api/parent/children`),
  getLiveStatus: async (childId?: string) =>
    fetchService(`${API_ENDPOINTS.parent}/api/parent/live-status${childId ? `?childId=${childId}` : ''}`),
  getHardwareKits: async () => fetchService(`${API_ENDPOINTS.parent}/api/parent/hardware-kits`),
  getProjects: async (childId?: string) =>
    fetchService(`${API_ENDPOINTS.parent}/api/parent/projects${childId ? `?childId=${childId}` : ''}`),
  schedulePtm: async (data: { childId: string; mentorName: string; slotDate: string; slotTime: string; notes?: string }) => {
    return fetchService(`${API_ENDPOINTS.parent}/api/parent/schedule-ptm`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  health: async () => fetchService(`${API_ENDPOINTS.parent}/health`),
};

// 3. Teacher Service Client
export const teacherServiceClient = {
  getBatches: async () => fetchService(`${API_ENDPOINTS.teacher}/api/teacher/batches`),
  getStudents: async (batchId?: string) =>
    fetchService(`${API_ENDPOINTS.teacher}/api/teacher/students${batchId ? `?batchId=${batchId}` : ''}`),
  getPayouts: async () => fetchService(`${API_ENDPOINTS.teacher}/api/teacher/payouts`),
  awardStars: async (data: { studentId: string; studentName: string; starsCount: number; reason: string }) => {
    return fetchService(`${API_ENDPOINTS.teacher}/api/teacher/award-stars`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  postNote: async (data: { batchId: string; parentNote: string; dispatchWhatsApp: boolean }) => {
    return fetchService(`${API_ENDPOINTS.teacher}/api/teacher/post-note`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  health: async () => fetchService(`${API_ENDPOINTS.teacher}/health`),
};

// 4. Student Service Client
export const studentServiceClient = {
  getDashboard: async () => fetchService(`${API_ENDPOINTS.student}/api/student/dashboard`),
  runCode: async (code: string, language: 'python' | 'cpp' | 'arduino' = 'python') => {
    return fetchService(`${API_ENDPOINTS.student}/api/student/run-code`, {
      method: 'POST',
      body: JSON.stringify({ code, language }),
    });
  },
  getCircuitSim: async (distanceCm = 18) =>
    fetchService(`${API_ENDPOINTS.student}/api/student/circuit-sim?distanceCm=${distanceCm}`),
  getQuiz: async () => fetchService(`${API_ENDPOINTS.student}/api/student/quiz`),
  submitQuiz: async (questionId: number, selectedOption: number) => {
    return fetchService(`${API_ENDPOINTS.student}/api/student/submit-quiz`, {
      method: 'POST',
      body: JSON.stringify({ questionId, selectedOption }),
    });
  },
  health: async () => fetchService(`${API_ENDPOINTS.student}/health`),
};
