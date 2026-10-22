import { Injectable } from '@nestjs/common';

export interface RunCodeDto {
  code: string;
  language: 'python' | 'cpp' | 'arduino';
}

export interface SubmitQuizDto {
  questionId: number;
  selectedOption: number;
  answerTimeSeconds?: number;
}

@Injectable()
export class StudentService {
  private studentState = {
    id: 'st_01',
    name: 'Alex Johnson',
    streakDays: 14,
    stars: 380,
    rankInBatch: 2,
    batch: {
      id: 'batch_r102',
      name: 'Batch R-102 (Robotics & STEM)',
      mentor: 'Dr. Sarah Vance',
      nextClassTime: '5:00 PM Today (in 10 mins)',
      peersCount: 3,
    },
    capstoneProject: {
      name: '4WD Autonomous Obstacle Rover',
      completionPercentage: 75,
      currentMilestone: 'Ultrasonic Distance Radar & Motor Driver H-Bridge',
      linesOfCode: 420,
    },
    hardwareKit: {
      name: 'EduSure Robotic Kit v3.2',
      status: 'DELIVERED',
      componentsCount: 14,
      boxVersion: 'v3.2',
    },
  };

  private sprintQuestions = [
    {
      id: 1,
      q: 'Ultrasonic sound speed is 340 m/s. Return time is 2ms. Distance = ?',
      hint: 'Distance = (Speed × Time) ÷ 2 = (340 × 0.002) ÷ 2 = 34cm!',
      options: [17, 34, 68, 85],
      correctAnswer: 34,
      subject: 'Applied Physics & Acoustics',
    },
    {
      id: 2,
      q: 'In Python, what is the output of len(["rover", "servo", "motor"])?',
      hint: 'Count the items in the list!',
      options: [2, 3, 4, 15],
      correctAnswer: 3,
      subject: 'Python Syntax',
    },
    {
      id: 3,
      q: 'Ohm’s Law: V = 5V, R = 250Ω. What is current I in mA?',
      hint: 'I = V ÷ R = 5 ÷ 250 = 0.02A (20mA)!',
      options: [10, 20, 25, 50],
      correctAnswer: 20,
      subject: 'Circuit Electronics',
    },
  ];

  getDashboard() {
    return {
      student: this.studentState,
    };
  }

  runCode(dto: RunCodeDto) {
    const isEvasion = dto.code.includes('steer') || dto.code.includes('turn') || dto.code.includes('distance');
    
    // Simulate real execution on virtual Arduino / Python runtime
    const logs = [
      `>>> Executing ${dto.language.toUpperCase()} in sandbox container...`,
      isEvasion
        ? `>>> [ROVER_I2C] Signal dispatched to SG90 Servo pin D9`
        : `>>> [TERMINAL] Code executed with 0 syntax errors`,
      isEvasion
        ? `>>> [SENSOR] Ultrasonic echo verified: 18cm obstacle detected. Steering angle: 45°`
        : `>>> [OUTPUT] Process finished with exit code 0`,
      `✓ Verification assertions passed (+15 builder score)`,
    ];

    this.studentState.stars += 15;
    this.studentState.capstoneProject.linesOfCode += 8;

    return {
      success: true,
      output: logs.join('\n'),
      executionTimeMs: 120,
      newScore: this.studentState.stars,
    };
  }

  getCircuitSim(distanceCm = 18) {
    const motorState = distanceCm < 20 ? 'TURNING_RIGHT' : 'FORWARD';
    const servoAngle = distanceCm < 20 ? 45 : 90;

    return {
      circuitState: {
        board: 'Arduino Nano V3 (Online)',
        sensorDistanceCm: distanceCm,
        motorState,
        servoAngle,
        pinMapping: {
          D9: 'SG90 Micro Servo (PWM Control)',
          D11: 'HC-SR04 Trigger Pin (Output)',
          D12: 'HC-SR04 Echo Pin (Input)',
          IN1_IN4: 'L298N Motor Driver H-Bridge',
        },
        powerRail: '5.0V DC Active (0.24A)',
      },
    };
  }

  getQuizQuestions() {
    return {
      questions: this.sprintQuestions.map(({ id, q, hint, options, subject }) => ({
        id,
        q,
        hint,
        options,
        subject,
      })),
    };
  }

  submitQuiz(dto: SubmitQuizDto) {
    const q = this.sprintQuestions.find((item) => item.id === dto.questionId);
    if (!q) {
      return { correct: false, message: 'Question not found' };
    }

    const isCorrect = dto.selectedOption === q.correctAnswer;
    if (isCorrect) {
      this.studentState.stars += 20;
    }

    return {
      correct: isCorrect,
      correctAnswer: q.correctAnswer,
      hint: q.hint,
      starsAwarded: isCorrect ? 20 : 0,
      newTotalStars: this.studentState.stars,
    };
  }

  getProjects() {
    return {
      projects: [
        {
          name: '4WD Autonomous Obstacle Rover',
          status: 'In Progress (75%)',
          hardware: 'Arduino Nano + Ultrasonic Radar + L298N',
          software: 'C++ & Python Obstacle Logic',
        },
        {
          name: 'Space Dodger Python Arcade Game',
          status: 'Mastered ★★★',
          hardware: 'N/A',
          software: 'Python 3.12 & Pygame',
        },
      ],
    };
  }
}
