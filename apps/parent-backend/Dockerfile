# Google Cloud Run Multi-stage Dockerfile for EduSure Parent Backend
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/parent-backend ./apps/parent-backend
COPY packages ./packages

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @edusure/parent-backend build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/parent-backend/package.json ./apps/parent-backend/package.json
COPY --from=builder /app/apps/parent-backend/dist ./apps/parent-backend/dist

RUN pnpm install --prod --filter @edusure/parent-backend

WORKDIR /app/apps/parent-backend
EXPOSE 8080

CMD ["node", "dist/main.js"]
