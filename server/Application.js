import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import reportController from "./controllers/reportController";

dotenv.config();

let server;
let db;
let app = express();

const configureDb = async () => {
  const { MONGO_URI } = process.env;

  try {
    if (!MONGO_URI) {
      throw new Error("`MONGODB_URI` not set");
    }

    db = await mongoose.connect(MONGO_URI, {
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
  // quit on ctrl-c when running docker in terminal
  process.on("SIGINT", () => {
    console.error(`Got SIGINT. Graceful shutdown ${new Date().toISOString()}`);
    shutdown();
  });
  // quit properly on docker stop
  process.on("SIGTERM", () => {
    console.error(`Got SIGTERM. Graceful shutdown ${new Date().toISOString()}`);
    shutdown();
  });

  console.log(`Starting Service`);
  await configureDb();
  await configureServer();

  configureExpress();
};
