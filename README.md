# 🎓 EduCare (EduSure) — Next-Generation AI Education Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat&logo=turborepo)](https://turbo.build/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![Cloud Run](https://img.shields.io/badge/Google%20Cloud-Run%20Ready-4285F4?style=flat&logo=googlecloud)](https://cloud.google.com/run)

EduCare is a production-grade, distributed educational ecosystem engineered for students, parents, teachers, and school administrators. It combines live interactive video classrooms, 3D WebGL visualizations, real-time telemetry, AI-assisted personalized study pathways, and microservices built for massive horizontal scalability on Google Cloud Run.

---

## 📑 Table of Contents

- [Architectural Overview](#-architectural-overview)
- [Monorepo Directory Structure](#-monorepo-directory-structure)
- [Service & Port Mapping](#-service--port-mapping)
- [Prerequisites](#-prerequisites)
- [Getting Started / How to Run Locally](#-getting-started--how-to-run-locally)
  - [1. Clone Repository & Install Dependencies](#1-clone-repository--install-dependencies)
  - [2. Environment Variable Configuration](#2-environment-variable-configuration)
  - [3. PostgreSQL Database Setup](#3-postgresql-database-setup)
  - [4. Database Migration & Prisma Client](#4-database-migration--prisma-client)
  - [5. Run Development Servers](#5-run-development-servers)
- [Application Portals & Access Points](#-application-portals--access-points)
- [Deployment (Google Cloud Run & Docker)](#-deployment-google-cloud-run--docker)
- [Available Monorepo Scripts](#-available-monorepo-scripts)
- [Key Features by Role](#-key-features-by-role)
- [License](#-license)

---

## 🏛️ Architectural Overview

The platform uses a **Turborepo monorepo** with decoupled microservices and shared internal packages:

- **Frontend (`apps/web`)**: Next.js 14 App Router, React 18, Tailwind CSS, Three.js 3D hero scene, Framer Motion, and dynamic role-based dashboards.
- **Auth Microservice (`apps/auth-backend`)**: NestJS service handling JWT generation, role-based authorization (RBAC), and authentication.
- **Parent Microservice (`apps/parent-backend`)**: NestJS service for parent monitoring, student attendance tracking, kit deliveries, and parent-teacher meeting (PTM) scheduling.
- **Teacher Microservice (`apps/teacher-backend`)**: NestJS service for batch telemetry, reward star awards, student feedback, and live classroom controls.
- **Student Microservice (`apps/student-backend`)**: NestJS service for student dashboards, interactive quizzes, and browser code runner.
- **API Gateway (`apps/api`)**: Unified NestJS API service for local development and monolithic deployments.
- **Shared Packages (`packages/*`)**: Shared TypeScript packages including Prisma database layer, UI tokens, AI interfaces, authentication utilities, and video/messaging clients.

---

## 📂 Monorepo Directory Structure

```text
EduCare/
├── apps/
│   ├── web/                     # Next.js 14 frontend (Port 3000)
│   ├── auth-backend/            # NestJS Auth service (Port 4001)
│   ├── parent-backend/          # NestJS Parent Companion service (Port 4002)
│   ├── teacher-backend/         # NestJS Teacher Workstation service (Port 4003)
│   ├── student-backend/         # NestJS Student Maker Space service (Port 4004)
│   └── api/                     # NestJS Core Gateway API (Port 4000)
│
├── packages/
│   ├── db/                      # Prisma ORM schema & client
│   ├── ui/                      # Shared UI components & design system tokens
│   ├── auth/                    # Shared JWT and authentication utilities
│   ├── ai/                      # AI tutoring and LLM provider interfaces
│   ├── video/                   # WebRTC and LiveKit video conferencing client
│   ├── messaging/               # Real-time WebSocket messaging layer
│   ├── notifications/           # Push and email notification services
│   ├── analytics/               # Telemetry and analytics modules
│   └── integrations/           # External webhooks and 3rd-party connectors
│
├── deploy-cloudrun.sh           # Automated Cloud Run 1-click deploy script
├── design-system.ts             # Platform color palette, typography & tokens
├── pnpm-workspace.yaml          # Monorepo workspace configuration
├── turbo.json                   # Turborepo build pipeline
└── package.json                 # Monorepo root manifest
```

---

## 🔌 Service & Port Mapping

| Service | Local Port | Cloud Run Port | Health Check | Primary Purpose |
| :--- | :---: | :---: | :---: | :--- |
| **EduCare Web App** | `3000` | `8080` | `GET /` | Next.js 14 UI, landing page, portals |
| **Auth Backend** | `4001` | `8080` | `GET /health` | `/api/auth/login`, `/api/auth/register`, `/api/auth/me` |
| **Parent Backend** | `4002` | `8080` | `GET /health` | `/api/parent/children`, `/api/parent/live-status`, `/api/parent/ptm` |
| **Teacher Backend** | `4003` | `8080` | `GET /health` | `/api/teacher/batches`, `/api/teacher/award-stars`, `/api/teacher/notes` |
| **Student Backend** | `4004` | `8080` | `GET /health` | `/api/student/dashboard`, `/api/student/run-code`, `/api/student/quizzes` |
| **Unified API** | `4000` | `8080` | `GET /health` | Consolidated gateway endpoints |

---

## ⚙️ Prerequisites

Before running the project locally, verify you have the following installed:

1. **Node.js**: `v18.18.0` or higher (`v20.x` recommended) — [Download](https://nodejs.org/)
2. **pnpm**: `v9.0.0` or higher:
   ```bash
   corepack enable
   corepack prepare pnpm@9.0.0 --activate
   # or
   npm install -g pnpm
   ```
3. **PostgreSQL**: `v15+` (local or via Docker)
4. **Docker** (optional, recommended for PostgreSQL)

---

## 🚀 Getting Started / How to Run Locally

### 1. Clone Repository & Install Dependencies

```bash
git clone https://github.com/Soumya19jan/Educare.git
cd Educare
pnpm install
```

---

### 2. Environment Variable Configuration

Create the local environment files from the provided templates:

#### A. Database (`packages/db/.env`):
```bash
cp packages/db/.env.example packages/db/.env
```
Ensure `packages/db/.env` points to your PostgreSQL instance:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/edusure?schema=public"
```

#### B. Frontend (`apps/web/.env.local`):
```bash
cp apps/web/.env.example apps/web/.env.local
```
Add the local microservice endpoints:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/edusure?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_AUTH_SERVICE_URL="http://localhost:4001"
NEXT_PUBLIC_PARENT_SERVICE_URL="http://localhost:4002"
NEXT_PUBLIC_TEACHER_SERVICE_URL="http://localhost:4003"
NEXT_PUBLIC_STUDENT_SERVICE_URL="http://localhost:4004"
```

---

### 3. PostgreSQL Database Setup

#### Option A: Run via Docker (Fastest)
```bash
docker run --name edusure-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=edusure \
  -p 5432:5432 \
  -d postgres:15
```

#### Option B: Local PostgreSQL (macOS with Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
psql postgres -c "CREATE DATABASE edusure;"
```

---

### 4. Database Migration & Prisma Client

Push the schema to your database and generate Prisma types:

```bash
pnpm db:generate
pnpm db:push
```

To visually browse and manage your database data at any time:
```bash
pnpm db:studio
# Opens Prisma Studio at http://localhost:5555
```

---

### 5. Run Development Servers

Choose from the options below depending on your workflow:

#### Option 1: Run the Complete Platform (Frontend + All Services)
```bash
pnpm dev
```
Starts Next.js frontend (`3000`) and the microservices simultaneously using Turborepo.

#### Option 2: Run All Backend Microservices Together
```bash
pnpm dev:backends
```
Runs Auth (`4001`), Parent (`4002`), Teacher (`4003`), and Student (`4004`) microservices concurrently.

#### Option 3: Run Individual Services
```bash
# Frontend only
pnpm dev:web

# Auth Microservice only
pnpm dev:auth

# Parent Microservice only
pnpm dev:parent

# Teacher Microservice only
pnpm dev:teacher

# Student Microservice only
pnpm dev:student
```

---

## 🌐 Application Portals & Access Points

| Route | Description |
| :--- | :--- |
| [http://localhost:3000](http://localhost:3000) | Landing Page with 3D Canvas, Features, and Tuition Tracks |
| [http://localhost:3000/auth/login](http://localhost:3000/auth/login) | Unified Login (Student, Parent, Teacher, Admin) |
| [http://localhost:3000/dashboard/student](http://localhost:3000/dashboard/student) | Student Maker Space & Learning Portal |
| [http://localhost:3000/dashboard/parent](http://localhost:3000/dashboard/parent) | Parent Companion Portal & Telemetry |
| [http://localhost:3000/dashboard/teacher](http://localhost:3000/dashboard/teacher) | Teacher 1:4 Batches & Classroom Control Center |
| [http://localhost:4001/health](http://localhost:4001/health) | Auth Microservice Health Check |
| [http://localhost:4002/health](http://localhost:4002/health) | Parent Microservice Health Check |
| [http://localhost:4003/health](http://localhost:4003/health) | Teacher Microservice Health Check |
| [http://localhost:4004/health](http://localhost:4004/health) | Student Microservice Health Check |
| [http://localhost:5555](http://localhost:5555) | Prisma Studio Database Explorer |

---

## ☁️ Deployment (Google Cloud Run & Docker)

Each microservice and the Next.js frontend contain isolated, multi-stage Dockerfiles optimized for production deployment on **Google Cloud Run**.

### 1-Click Automated Deployment Script
Use `./deploy-cloudrun.sh` to build and deploy services autonomously:

```bash
# Make script executable
chmod +x deploy-cloudrun.sh

# Deploy all services to GCP
./deploy-cloudrun.sh all <YOUR_GCP_PROJECT_ID> us-central1

# Or deploy individual services
./deploy-cloudrun.sh auth <YOUR_GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh parent <YOUR_GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh teacher <YOUR_GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh student <YOUR_GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh frontend <YOUR_GCP_PROJECT_ID> us-central1
```

---

## 🛠️ Available Monorepo Scripts

Run from the root of the project:

```bash
pnpm dev              # Launch all applications in watch mode
pnpm build            # Build all applications and packages
pnpm build:web        # Build only the Next.js frontend bundle
pnpm test             # Run test suites across all packages
pnpm lint             # Lint code across all workspaces
pnpm db:generate      # Re-generate Prisma Client
pnpm db:push          # Push Prisma schema directly to DB
pnpm db:migrate       # Apply Prisma database migrations
pnpm db:studio        # Open Prisma Studio web inspector
```

---

## 💡 Key Features by Role

### 🧑‍🎓 Students
- Personalized learning dashboard with upcoming classes and progress metrics
- Live video classroom integration with audio/video and interactive whiteboard
- Browser-based code runner and challenge environment
- Interactive quizzes and real-time star rewards

### 👨‍👩‍👧 Parents
- Live session attendance and engagement telemetry
- Direct scheduling for Parent-Teacher Meetings (PTM)
- Physical STEM kit delivery tracking
- Academic reports and behavioral performance cards

### 👩‍🏫 Teachers
- Focused 1:4 batch instruction workstation
- Live classroom controls, student muting, and screen share
- Real-time star badge awarding and instant feedback notes
- Curriculum and assignment assignment distribution

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
