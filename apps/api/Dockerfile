FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate
RUN apk --no-cache add curl wget

# Copy workspace configuration
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/common/package.json ./packages/common/
COPY packages/socket-events/package.json ./packages/socket-events/
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/common ./packages/common
COPY packages/socket-events ./packages/socket-events
COPY apps/api ./apps/api
COPY tsconfig.base.json ./

# Build packages and API
RUN pnpm --filter @maritime/common build && \
    pnpm --filter @maritime/socket-events build && \
    pnpm --filter @maritime/api build

EXPOSE 4000

CMD ["pnpm", "--filter", "@maritime/api", "start"]
