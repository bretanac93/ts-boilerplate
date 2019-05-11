import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import routes from "./services";

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);

const port = process.env.APP_PORT || 8000;

const server = http.createServer(router);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
