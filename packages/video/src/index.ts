// Video Service Layer for EduSure (LiveKit integration)
// Handles live video classrooms and session management

export interface LiveKitConfig {
  url: string;
  apiKey: string;
  apiSecret: string;
}

export interface SessionRoom {
  name: string;
  sid: string;
  numParticipants: number;
  maxParticipants: number;
}

export interface Participant {
  identity: string;
  name: string;
  joinedAt?: number;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isScreenSharing: boolean;
}

class VideoService {
  private config: LiveKitConfig | null = null;

  constructor() {
    this.config = null;
  }

  initialize(config: LiveKitConfig) {
    this.config = config;
  }

  private ensureConfig(): LiveKitConfig {
    if (!this.config) {
      throw new Error('Video service not initialized');
    }
    return this.config;
  }

  async createRoom(roomName: string, maxParticipants: number = 100): Promise<SessionRoom> {
    const config = this.ensureConfig();
    
    const response = await fetch(`${config.url}/api/createRoom`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: roomName,
        maxParticipants,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create room: ${response.status}`);
    }

    const data = await response.json();
    return {
      name: data.name,
      sid: data.sid,
      numParticipants: 0,
      maxParticipants,
    };
  }

  async deleteRoom(roomName: string): Promise<void> {
    const config = this.ensureConfig();
    
    const response = await fetch(`${config.url}/api/deleteRoom`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room: roomName }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete room: ${response.status}`);
    }
  }

  async getRoom(roomName: string): Promise<SessionRoom | null> {
    const config = this.ensureConfig();
    
    const response = await fetch(
      `${config.url}/api/room/list?names=${encodeURIComponent(roomName)}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get room: ${response.status}`);
    }

    const data = await response.json();
    const rooms = data.rooms || [];
    if (rooms.length === 0) {
      return null;
    }

    const room = rooms[0];
    return {
      name: room.name,
      sid: room.sid,
      numParticipants: room.numParticipants,
      maxParticipants: room.maxParticipants,
    };
  }

  async generateJoinToken(
    roomName: string,
    participantName: string,
    participantIdentity: string,
    isHost: boolean = false
  ): Promise<string> {
    const config = this.ensureConfig();
    
    const response = await fetch(`${config.url}/api/createToken`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: participantIdentity,
        name: participantName,
        room: roomName,
        canPublish: isHost,
        canSubscribe: true,
        canPublishData: isHost,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate token: ${response.status}`);
    }

    const data = await response.json();
    return data.token;
  }

  async getParticipants(roomName: string): Promise<Participant[]> {
    const config = this.ensureConfig();
    
    const response = await fetch(
      `${config.url}/api/participant/list?room=${encodeURIComponent(roomName)}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get participants: ${response.status}`);
    }

    const data = await response.json();
    return data.participants.map((p: any) => ({
      identity: p.identity,
      name: p.name,
      joinedAt: p.joinedAt,
      isAudioMuted: p.isAudioMuted,
      isVideoMuted: p.isVideoMuted,
      isScreenSharing: p.isScreenSharing,
    }));
  }

  async endSession(roomName: string): Promise<void> {
    const config = this.ensureConfig();
    
    const response = await fetch(`${config.url}/api/room/removeParticipant`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room: roomName,
        identity: 'host',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to end session: ${response.status}`);
    }
  }
}

// Singleton instance
export const videoService = new VideoService();

// Initialize if config is available
if (process.env.LIVEKIT_URL && process.env.LIVEKIT_API_KEY && process.env.LIVEKIT_API_SECRET) {
  videoService.initialize({
    url: process.env.LIVEKIT_URL,
    apiKey: process.env.LIVEKIT_API_KEY,
    apiSecret: process.env.LIVEKIT_API_SECRET,
  });
}

export default videoService;