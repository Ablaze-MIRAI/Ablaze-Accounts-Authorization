FROM node:20.17.0-alpine3.19 AS builder

WORKDIR /app
COPY . .
RUN corepack enable
RUN pnpm install

RUN pnpm generate
RUN pnpm mg:deploy
RUN pnpm build

CMD ["pnpm", "start"]
