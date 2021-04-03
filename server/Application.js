import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { middleware, exception as HttpError } from "express-exception-handler";

import reportController from "./controllers/reportController";

dotenv.config();

let server;
let db;
export let app = express();

const configureDb = async () => {
  const { MONGO_URI, NODE_ENV = "development" } = process.env;

  try {
    if (!MONGO_URI) {
      throw new Error("`MONGODB_URI` not set");
    }

    db = await mongoose.connect(`${MONGO_URI}_${NODE_ENV}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      keepAlive: true,
      useFindAndModify: false,
    });
  } catch (err) {
    throw new Error(`Error connecting to db ${err.message || err}`);
  }
};

export const shutdown = async () => {
  if (server) {
    await server.close();
  }
  if (db) {
    await db.disconnect();
  }
};

const configureServer = () => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ type: "application/json" }));
  app.use(express.urlencoded({ extended: false }));

  if (process.env.NODE_ENV !== "test") {
    app.use(
      morgan("combined", {
        stream: {
          write: console.log,
        },
      })
    );
  }
  server = http.createServer(app);

  const port = normalizePort(
    process.env.PORT || process.env.SERVER_PORT || "3000"
  );
  server.listen(port);
  console.log(`Express server started on ${port}`);
};

const configureExpress = () => {
  app.use("/api/v1", reportController);
  app.use("/health", async (_request, response) => {
    response.send({
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    });
  });
  app.get("/", async (_request, response) => {
    response.status(201).send({
      message: "Spam API service",
    });
  });
  app.use((_request, _response, next) => {
    next(new HttpError("Route not found", 404, { message: "route not found" }));
  });
  app.use(middleware);
};

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

export const start = async () => {
  console.log(`Starting Service`);
  await configureDb();
  await configureServer();

  configureExpress();
};
