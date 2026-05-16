FROM node:18-alpine
WORKDIR /app

# Enable Corepack for reproducible package manager version
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies efficiently using pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prefer-offline || pnpm install

# Copy source code
COPY . .

# Development server
EXPOSE 3000
CMD ["pnpm", "dev"]
