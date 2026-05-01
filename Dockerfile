# Build static assets with Vite; generate raster hero in-container so public/ stays reproducible.
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Serve built SPA (Railway sets PORT).
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g serve@14

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT:-3000}"]
