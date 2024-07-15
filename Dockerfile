FROM node:20.14.0-alpine3.19 AS builder

WORKDIR /app
COPY . .
RUN corepack enable
RUN yarn install

RUN yarn generate
RUN yarn mg:deploy
RUN yarn build

CMD ["yarn", "start"]
