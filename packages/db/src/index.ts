// Database client for EduSure
import { PrismaClient } from '@prisma/client';

// Extend PrismaClient for logging
class Database {
  private prisma: PrismaClient | null = null;

  constructor() {
    this.prisma = null;
  }

  get client(): PrismaClient {
    if (!this.prisma) {
      this.prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      });
    }
    return this.prisma;
  }

  async connect() {
    try {
      await this.client.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.prisma) {
      await this.prisma.$disconnect();
      this.prisma = null;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Singleton instance
export const db = new Database();

// Convenience exports
export const prisma = db.client;

export default db;