import { Injectable } from '@nestjs/common';

export interface SchedulePtmDto {
  childId: string;
  mentorName: string;
  slotDate: string;
  slotTime: string;
  notes?: string;
}

export interface SendMessageDto {
  recipientId: string;
  message: string;
  childId?: string;
}

@Injectable()
export class ParentService {
  private children = [
    {
      id: 'ch_01',
      name: 'Alex Johnson',
      grade: 'Grade 7',
      avatar: 'AJ',
      track: 'Robotics & Microcontrollers',
      batch: 'Batch R-102 (Small 1:4)',
      mentor: 'Dr. Sarah Vance',
      streakDays: 14,
      stars: 480,
      capstoneProject: '4WD Autonomous Obstacle Avoidance Rover',
      capstoneProgress: 75,
      kitStatus: 'Delivered (Box v3.2 - Arduino Nano + 4WD Chassis + Sensors)',
      linesOfCode: 420,
    },
    {
      id: 'ch_02',
      name: 'Emma Johnson',
      grade: 'Grade 5',
      avatar: 'EJ',
      track: 'Python Arcade Game Dev & Speed Math',
      batch: 'Batch P-204 (Small 1:4)',
      mentor: 'Prof. Marcus Brody',
      streakDays: 9,
      stars: 310,
      capstoneProject: 'Space Dodger Arcade Pygame with High Scores',
      capstoneProgress: 45,
      kitStatus: 'In Transit (Expected Friday)',
      linesOfCode: 260,
    },
  ];

  private ptmBookings: any[] = [
    {
      id: 'ptm_01',
      childName: 'Alex Johnson',
      mentorName: 'Dr. Sarah Vance',
      date: 'Tomorrow, Oct 17',
      time: '6:30 PM - 6:45 PM',
      status: 'CONFIRMED',
      meetLink: 'https://meet.edusure.com/ptm-sarah-alex',
    },
  ];

  private messages: any[] = [
    {
      id: 'msg_01',
      sender: 'Dr. Sarah Vance (Robotics Mentor)',
      timestamp: 'Today, 4:15 PM',
      content:
        'Alex demonstrated outstanding troubleshooting on ultrasonic distance echo signals today! Pin D11/D12 wired accurately and rover evasion logic executed on the first attempt.',
      isMentor: true,
    },
  ];

  getChildren() {
    return {
      children: this.children,
      totalChildren: this.children.length,
    };
  }

  getLiveStatus(childId?: string) {
    return {
      activeSession: true,
      childName: 'Alex Johnson',
      mentor: 'Dr. Sarah Vance',
      batch: 'Batch R-102 (4 students)',
      status: 'IN_SESSION_ACTIVE',
      topic: 'Level 3: Ultrasonic Obstacle Radar & Motor Tuning',
      startedAt: '5:00 PM',
      endsAt: '5:45 PM',
      cameraState: 'DUAL_CAM_ACTIVE (Face + Breadboard)',
      canJoinObserverCall: true,
    };
  }

  getHardwareKits() {
    return {
      activeKits: [
        {
          id: 'kit_v32_alex',
          recipient: 'Alex Johnson',
          kitName: 'EduSure Robotic Kit v3.2 (Arduino + 4WD Chassis + Ultrasonic Radar)',
          status: 'DELIVERED',
          deliveryDate: 'Oct 12, 2026',
          courier: 'FedEx Express (Tracking #FX-894210)',
          itemsCount: 14,
          verifiedWorking: true,
        },
        {
          id: 'kit_iot_alex',
          recipient: 'Alex Johnson',
          kitName: 'Smart IoT Expansion Pack (ESP32 Wi-Fi + Soil Moisture + Relays)',
          status: 'PREPARING_DISPATCH',
          deliveryDate: 'Estimated Oct 24, 2026',
          courier: 'BlueDart Air',
          itemsCount: 8,
          verifiedWorking: false,
        },
      ],
    };
  }

  getProjects(childId?: string) {
    return {
      projects: [
        {
          title: '4WD Autonomous Obstacle Rover',
          status: '75% Complete',
          track: 'Robotics',
          tech: 'Arduino C++ & Ultrasonic HC-SR04',
          videoDemoAvailable: true,
          mentorRemark: 'Tested live in classroom. Motor steering tuned.',
        },
        {
          title: 'Smart Plant Self-Waterer',
          status: 'Completed ★★★',
          track: 'Applied Engineering',
          tech: 'Soil Hygrometer + 5V Water Pump',
          videoDemoAvailable: true,
          mentorRemark: 'Awarded Maker of the Month medal.',
        },
      ],
    };
  }

  schedulePtm(dto: SchedulePtmDto) {
    const newBooking = {
      id: `ptm_${Date.now()}`,
      childName: dto.childId === 'ch_02' ? 'Emma Johnson' : 'Alex Johnson',
      mentorName: dto.mentorName,
      date: dto.slotDate,
      time: dto.slotTime,
      status: 'CONFIRMED',
      meetLink: `https://meet.edusure.com/ptm-${Date.now()}`,
      notes: dto.notes,
    };
    this.ptmBookings.push(newBooking);
    return {
      message: '1-on-1 Parent-Teacher Meeting successfully scheduled',
      booking: newBooking,
    };
  }

  getPtmBookings() {
    return {
      bookings: this.ptmBookings,
    };
  }

  getMessages() {
    return {
      messages: this.messages,
    };
  }

  sendMessage(dto: SendMessageDto) {
    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'Parent (You)',
      timestamp: 'Just now',
      content: dto.message,
      isMentor: false,
    };
    this.messages.push(newMsg);
    return {
      message: 'Message dispatched to mentor',
      messageData: newMsg,
    };
  }
}
