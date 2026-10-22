# Google Cloud Run Multi-stage Dockerfile for EduSure Auth Backend
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Copy root workspace configurations for monorepo resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/auth-backend ./apps/auth-backend
COPY packages ./packages

# Install dependencies and build
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @edusure/auth-backend build

# Production Runner Stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/auth-backend/package.json ./apps/auth-backend/package.json
COPY --from=builder /app/apps/auth-backend/dist ./apps/auth-backend/dist

# Install production dependencies only
RUN pnpm install --prod --filter @edusure/auth-backend

WORKDIR /app/apps/auth-backend
EXPOSE 8080

CMD ["node", "dist/main.js"]
