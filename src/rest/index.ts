/**
 * Module for REST endpoints.
 * @module rest
 */

import cors from "cors";
import express from "express";

import { logger as lg } from "../logger";

const DELETE = "delete";
const GET = "get";
const POST = "post";
const PUT = "put";

type ConfigServer = {
  hosts: string[];
  port: number;
};

/**
 * Starts the server.
 * @param configServer - Configuration parameters for the server.
 */
export async function startServer(configServer: ConfigServer) {
  const app = express();

  const whitelist = configServer.hosts;
  const corsOptions = {
    credentials: true,
    // Note: Setting `credentials: true` here is insufficient. The client must also set the corresponding header.
    // https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests
    origin: function (origin: any, callback: any) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(
          new Error(
            `CORS protection in place. Accepted domains: ${whitelist.join(
              ", "
            )}`
          )
        );
      }
    },
  };
  // Enforce CORS protection.
  app.use(cors(corsOptions));
  // Allow JSON requests.
  app.use(
    express.json({
      limit: "1mb",
    })
  );
  // Enable serving of static assets.
  app.use(express.static("static"));

  // Page to show that the server is running.
  app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Server is running");
  });

  app.listen(configServer.port, () => {
    lg.info(`Server started.`);
  });
}
