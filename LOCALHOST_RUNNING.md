# 🚀 How to Run EduSure on Localhost

## Prerequisites
1. **Node.js** (v18+) - [Download](https://nodejs.org/)
2. **pnpm** (v9.0.0) - Already configured
3. **PostgreSQL** (v15+) - [Download](https://www.postgresql.org/download/)
4. **Docker** (Optional, for easier DB setup)

## Step 1: Install Dependencies

```bash
cd /Users/soumyadeep/Desktop/Edu-Sure
pnpm install
```

## Step 2: Setup Environment Variables

**Frontend** (`/apps/web/.env.local`):
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/edusure?schema=public"
JWT_SECRET="dev-jwt-secret-2024"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Backend** (`/apps/api/.env.local`):
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/edusure?schema=public"
JWT_SECRET="dev-jwt-secret-2024"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

## Step 3: Setup PostgreSQL

### Option A: Using Docker (Recommended)
```bash
docker run --name edusure-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=edusure \
  -p 5432:5432 \
  -d postgres:15
```

### Option B: Local Installation
```bash
brew install postgresql@15
brew services start postgresql@15
psql postgres -c "CREATE DATABASE edusure;"
```

## Step 4: Setup Database Schema

```bash
cd packages/db
pnpm prisma generate
pnpm prisma db push
```

## Step 5: Run the Application

**Option A: Both services together**
```bash
cd /Users/soumyadeep/Desktop/Edu-Sure
pnpm dev
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
cd apps/api
pnpm start:dev

# Terminal 2 - Frontend  
cd apps/web
pnpm dev
```

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:4000 |
| API Docs | http://localhost:4000/api/docs |
| Prisma Studio | http://localhost:5555 |

## 📂 Current Files (35 total)

- **Root**: turbo.json, tsconfig.json, package.json
- **Frontend**: Next.js 14, Tailwind CSS, 3D Hero
- **Backend**: NestJS structure ready
- **Packages**: 9 shared libraries

---

## 🧪 Quick Test

**Health Check:**
```bash
curl http://localhost:4000/health
```

**Frontend:**
```bash
open http://localhost:3000
```