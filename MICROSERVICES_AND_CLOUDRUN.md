# EduSure - Microservices Architecture & Google Cloud Run Deployment

EduSure is structured as a distributed microservice architecture where the **Frontend** and **4 specialized Backends** are decoupled into independent services. Each service has its own `Dockerfile`, `package.json`, build pipeline, and can be deployed autonomously to **Google Cloud Run**.

---

## 🏗️ Separated Directory Structure

```text
Edu-Sure/
├── apps/
│   ├── web/                     # 1. EduSure Frontend (Next.js 14, Tailwind, Three.js)
│   │   ├── Dockerfile           # Google Cloud Run standalone container
│   │   ├── lib/api-config.ts    # Connects to all 4 backends via env vars
│   │   └── package.json         # @edusure/web
│   │
│   ├── auth-backend/            # 2. Auth Microservice (JWT, login, register, roles)
│   │   ├── Dockerfile           # Google Cloud Run container (port 8080)
│   │   ├── src/main.ts          # Bound to 0.0.0.0 (port 4001 local / $PORT Cloud Run)
│   │   └── package.json         # @edusure/auth-backend
│   │
│   ├── parent-backend/          # 3. Parent Companion Microservice (monitoring, PTM, kits)
│   │   ├── Dockerfile           # Google Cloud Run container (port 8080)
│   │   ├── src/main.ts          # Bound to 0.0.0.0 (port 4002 local / $PORT Cloud Run)
│   │   └── package.json         # @edusure/parent-backend
│   │
│   ├── teacher-backend/         # 4. Teacher Workstation Microservice (1:4 batches, telemetry)
│   │   ├── Dockerfile           # Google Cloud Run container (port 8080)
│   │   ├── src/main.ts          # Bound to 0.0.0.0 (port 4003 local / $PORT Cloud Run)
│   │   └── package.json         # @edusure/teacher-backend
│   │
│   └── student-backend/         # 5. Student Maker Space Microservice (code runner, quizzes)
│       ├── Dockerfile           # Google Cloud Run container (port 8080)
│       ├── src/main.ts          # Bound to 0.0.0.0 (port 4004 local / $PORT Cloud Run)
│       └── package.json         # @edusure/student-backend
│
├── deploy-cloudrun.sh           # Automated 1-click Cloud Run deployment script
├── pnpm-workspace.yaml          # Monorepo package registry
└── turbo.json                   # Turborepo task pipeline
```

---

## 🔌 Service Port & Endpoint Mapping

| Service | Local Port | Cloud Run Port | Health Check | Primary API Routes |
| :--- | :---: | :---: | :--- | :--- |
| **EduSure Frontend** | `3000` | `8080` | `/` | Web UI, Portals, Live Video Room |
| **Auth Backend** | `4001` | `8080` | `/health` | `/api/auth/login`, `/api/auth/register`, `/api/auth/me` |
| **Parent Backend** | `4002` | `8080` | `/health` | `/api/parent/children`, `/api/parent/live-status`, `/api/parent/schedule-ptm` |
| **Teacher Backend** | `4003` | `8080` | `/health` | `/api/teacher/batches`, `/api/teacher/award-stars`, `/api/teacher/post-note` |
| **Student Backend** | `4004` | `8080` | `/health` | `/api/student/dashboard`, `/api/student/run-code`, `/api/student/submit-quiz` |

---

## 💻 Running Locally

You can run each service independently or all together:

### Run Individual Services
```bash
# 1. Run only the Frontend
pnpm dev:web

# 2. Run only the Auth Microservice
pnpm dev:auth

# 3. Run only the Parent Microservice
pnpm dev:parent

# 4. Run only the Teacher Microservice
pnpm dev:teacher

# 5. Run only the Student Microservice
pnpm dev:student

# 6. Run all 4 backend microservices together
pnpm dev:backends

# 7. Run entire platform (frontend + all 4 backends)
pnpm dev
```

---

## 🚀 Deploying Separately on Google Cloud Run

Each service has its own dedicated Dockerfile configured with multi-stage builds.

### Option 1: Automated Script (`./deploy-cloudrun.sh`)
```bash
# Deploy all 5 services
./deploy-cloudrun.sh all <GCP_PROJECT_ID> us-central1

# Or deploy any single service independently
./deploy-cloudrun.sh auth <GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh parent <GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh teacher <GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh student <GCP_PROJECT_ID> us-central1
./deploy-cloudrun.sh frontend <GCP_PROJECT_ID> us-central1
```

### Option 2: Direct `gcloud` Commands

#### 1. Deploy Auth Backend
```bash
gcloud run deploy edusure-auth-backend \
  --source . \
  --dockerfile apps/auth-backend/Dockerfile \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="NODE_ENV=production,PORT=8080"
```

#### 2. Deploy Parent Backend
```bash
gcloud run deploy edusure-parent-backend \
  --source . \
  --dockerfile apps/parent-backend/Dockerfile \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="NODE_ENV=production,PORT=8080"
```

#### 3. Deploy Teacher Backend
```bash
gcloud run deploy edusure-teacher-backend \
  --source . \
  --dockerfile apps/teacher-backend/Dockerfile \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="NODE_ENV=production,PORT=8080"
```

#### 4. Deploy Student Backend
```bash
gcloud run deploy edusure-student-backend \
  --source . \
  --dockerfile apps/student-backend/Dockerfile \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="NODE_ENV=production,PORT=8080"
```

#### 5. Deploy Frontend Web App (connecting to the 4 Cloud Run backend URLs)
```bash
gcloud run deploy edusure-frontend \
  --source . \
  --dockerfile apps/web/Dockerfile \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="NEXT_PUBLIC_AUTH_SERVICE_URL=https://edusure-auth-backend-xxx.a.run.app,NEXT_PUBLIC_PARENT_SERVICE_URL=https://edusure-parent-backend-xxx.a.run.app,NEXT_PUBLIC_TEACHER_SERVICE_URL=https://edusure-teacher-backend-xxx.a.run.app,NEXT_PUBLIC_STUDENT_SERVICE_URL=https://edusure-student-backend-xxx.a.run.app"
```
