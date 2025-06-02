FROM node:20-alpine as builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy workspace configuration
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/common/package.json ./packages/common/
COPY packages/socket-events/package.json ./packages/socket-events/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/common ./packages/common
COPY packages/socket-events ./packages/socket-events
COPY apps/web ./apps/web
COPY tsconfig.base.json ./

# Build packages and web
RUN pnpm --filter @maritime/common build && \
    pnpm --filter @maritime/socket-events build && \
    pnpm --filter @maritime/web build

# Production image
FROM nginx:alpine

# Copy the built assets to nginx
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
