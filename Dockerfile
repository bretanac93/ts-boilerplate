FROM node:12-alpine AS build-stage

ENV APP_DIR=/app

RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package.json .
RUN npm install
COPY src .
COPY tsconfig.json .

RUN npm run prod

FROM node:12-alpine as run-stage

ENV APP_DIR=/app
WORKDIR ${APP_DIR}

COPY --from=build-stage ${APP_DIR}/package.json .
RUN npm install --prod

COPY --from=build-stage ${APP_DIR}/dist/ .

ENTRYPOINT [ "node", "server.js" ]