import { Injectable } from '@nestjs/common';

export interface AwardStarsDto {
  studentId: string;
  studentName: string;
  starsCount: number;
  reason: string;
}

export interface PostNoteDto {
  batchId: string;
  studentId?: string;
  parentNote: string;
  dispatchWhatsApp: boolean;
}

@Injectable()
export class TeacherService {
  private batches = [
    {
      id: 'batch_r102',
      name: 'Batch R-102: Robotics & Microcontrollers',
      track: 'Robotics',
      level: 'Level 3 (Ultrasonic Radar & Rover Assembly)',
      schedule: 'Mon, Wed, Fri • 5:00 PM - 5:45 PM',
      isLiveNow: true,
      studentsCount: 4,
      maxCapacity: 4,
      students: [
        { id: 'st_01', name: 'Alex Johnson', stars: 4, hardwareStatus: 'Pin D11/D12 Wired', codeStatus: 'Compiled OK' },
        { id: 'st_02', name: 'Maya Patel', stars: 5, hardwareStatus: 'Servo Calibrated', codeStatus: 'Tests Passing' },
        { id: 'st_03', name: 'Liam Chen', stars: 3, hardwareStatus: 'Assembling Motor Shield', codeStatus: 'Syntax Debug' },
        { id: 'st_04', name: 'Sophia Rossi', stars: 6, hardwareStatus: 'Rover Rolling Smoothly', codeStatus: 'Tuning PID' },
      ],
    },
    {
      id: 'batch_p204',
      name: 'Batch P-204: Python AI & Game Dev',
      track: 'Programming',
      level: 'Level 2 (Object-Oriented Pygame)',
      schedule: 'Tue, Thu • 4:00 PM - 4:45 PM',
      isLiveNow: false,
      studentsCount: 4,
      maxCapacity: 4,
      students: [
        { id: 'st_05', name: 'Emma Johnson', stars: 5, hardwareStatus: 'N/A (Code Track)', codeStatus: 'Pygame Loop 60fps' },
        { id: 'st_06', name: 'Noah Davis', stars: 4, hardwareStatus: 'N/A (Code Track)', codeStatus: 'Collision Math' },
        { id: 'st_07', name: 'Zoe Martinez', stars: 4, hardwareStatus: 'N/A (Code Track)', codeStatus: 'High-score Pickle' },
        { id: 'st_08', name: 'Ethan Hunt', stars: 3, hardwareStatus: 'N/A (Code Track)', codeStatus: 'Sprite Animation' },
      ],
    },
  ];

  private teacherProfile = {
    id: 'tch_vance',
    name: 'Dr. Sarah Vance',
    title: 'Senior Robotics & STEM Mentor',
    activeBatchesCount: 4,
    totalStudents: 16,
    hoursTaughtMonth: 34,
    rating: 4.96,
    totalEarningsMonth: '₹42,500',
    hourlyRate: '₹1,250 / hr',
    nextPayoutDate: 'Oct 31, 2026',
  };

  getBatches() {
    return {
      batches: this.batches,
      totalBatches: this.batches.length,
    };
  }

  getStudents(batchId?: string) {
    if (batchId) {
      const b = this.batches.find((item) => item.id === batchId);
      return { students: b?.students || [] };
    }
    return {
      students: this.batches.flatMap((b) => b.students),
    };
  }

  getProfileAndPayouts() {
    return {
      profile: this.teacherProfile,
    };
  }

  awardStars(dto: AwardStarsDto) {
    // Find student and add stars
    for (const b of this.batches) {
      const s = b.students.find((st) => st.id === dto.studentId);
      if (s) {
        s.stars += dto.starsCount;
        return {
          message: `Awarded ${dto.starsCount} stars to ${dto.studentName}`,
          newTotalStars: s.stars,
          reason: dto.reason,
        };
      }
    }
    return {
      message: `Awarded ${dto.starsCount} stars to ${dto.studentName}`,
      newTotalStars: 5,
      reason: dto.reason,
    };
  }

  postNote(dto: PostNoteDto) {
    return {
      message: 'Post-session parent report successfully dispatched',
      dispatchSummary: {
        batchId: dto.batchId,
        parentNote: dto.parentNote,
        deliveredViaWhatsApp: dto.dispatchWhatsApp,
        timestamp: new Date().toISOString(),
      },
    };
  }

  getTelemetry() {
    return {
      telemetry: {
        activeSensorReadings: {
          ultrasonic_distance_cm: 18.4,
          sg90_servo_angle: 90,
          motor_state: 'CRUISE_FORWARD',
          voltage_5v_bus: 4.92,
        },
        tutorAudioVideoBitrate: '980 kbps (1080p60)',
        activeStudentsStreamCount: 4,
      },
    };
  }
}
