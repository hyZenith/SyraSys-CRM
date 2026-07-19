FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @syracrm/frontend build

EXPOSE 5173
CMD ["pnpm", "--filter", "@syracrm/frontend", "dev", "--host", "0.0.0.0", "--port", "5173"]
