FROM node:20.14.0-alpine3.19 AS builder

ENV NODE_ENV=development
RUN corepack enable
WORKDIR /build

COPY .nvmrc ./
COPY package.json ./
COPY .npmrc ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN yarn build


FROM node:20.14.0-alpine3.19 AS runner

ENV NODE_ENV=production
RUN corepack enable
WORKDIR /app

COPY scripts ./
COPY prisma ./

COPY .nvmrc ./
COPY package.json ./
COPY .npmrc ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
RUN yarn install --frozen-lockfile --production=true

COPY --from=builder /build/next.config.js ./
COPY --from=builder /build/.next ./.next
COPY --from=builder /build/public ./public

RUN yarn mg:deploy

CMD ["yarn", "start"]
