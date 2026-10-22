# Google Cloud Run Multi-stage Dockerfile for EduSure Teacher Backend
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/teacher-backend ./apps/teacher-backend
COPY packages ./packages

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @edusure/teacher-backend build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/teacher-backend/package.json ./apps/teacher-backend/package.json
COPY --from=builder /app/apps/teacher-backend/dist ./apps/teacher-backend/dist

RUN pnpm install --prod --filter @edusure/teacher-backend

WORKDIR /app/apps/teacher-backend
EXPOSE 8080

CMD ["node", "dist/main.js"]
