FROM node:12-alpine AS build-stage

ENV APP_DIR=/app

RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package.json .
RUN npm install
COPY src .
COPY tsconfig.json .

RUN npm run prod

FROM node:12-alpine as prod-stage

ENV APP_DIR=/app
WORKDIR ${APP_DIR}

COPY --from=build-stage ${APP_DIR}/package.json .
RUN npm install --prod

RUN apk --no-cache add curl

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh -s -- -b /usr/local/bin

RUN apk del curl && rm -rf /var/cache/apk/*

RUN node-prune

COPY --from=build-stage ${APP_DIR}/dist/ .

ENTRYPOINT [ "node", "server.js" ]