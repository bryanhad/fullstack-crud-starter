# Stage 1: Builder
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# build TypeScript
RUN pnpm build

# Stage 2: Runtime
FROM node:20-slim AS runtime

# Create a non-root user
RUN useradd -m appuser

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app /app

# Make sure /app/data exists and belongs to appuser
RUN mkdir -p /app/data && chown -R appuser:appuser /app/data

# Use non-root user
USER appuser

# Expose your Express port
EXPOSE 3000

# Start app
CMD ["node", "dist/server.js"]