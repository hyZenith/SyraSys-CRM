FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @syracrm/api build

EXPOSE 4000
CMD ["pnpm", "--filter", "@syracrm/api", "start"]
