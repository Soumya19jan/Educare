# Google Cloud Run Multi-stage Dockerfile for EduSure Student Backend
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/student-backend ./apps/student-backend
COPY packages ./packages

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @edusure/student-backend build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/student-backend/package.json ./apps/student-backend/package.json
COPY --from=builder /app/apps/student-backend/dist ./apps/student-backend/dist

RUN pnpm install --prod --filter @edusure/student-backend

WORKDIR /app/apps/student-backend
EXPOSE 8080

CMD ["node", "dist/main.js"]
