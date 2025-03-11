FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy Prisma schema first (for optimization)
COPY prisma ./prisma/

# Generate Prisma client
RUN pnpm prisma generate

# Copy remaining files
COPY . .

# Build the application
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "start"]