import http from "http";
import path from "path";
import dotenv from "dotenv";
import express from "express";

import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import routes from "./services";
import errorHandlers from "./middleware/errorHandlers";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const port = process.env.APP_PORT || 8000;

const server = http.createServer(router);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
