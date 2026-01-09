# ======================
# Dependencies
# ======================
FROM node:24.12.0-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# ======================
# Build
# ======================
FROM node:24.12.0-alpine AS builder
WORKDIR /app

# Declare o ARG AQUI
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ======================
# Runner
# ======================
FROM node:24.12.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 🔴 REDECLARA O ARG NO RUNNER
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
