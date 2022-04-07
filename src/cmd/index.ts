/**
 * Entry point for the application.
 * @module cmd
 */
import { checkEnv, readConfig } from "./functions";

import { CONFIG_FILE } from "../constants";
import * as logger from "../logger";
import { startServer } from "../rest";

// Check that the necessary environment variables are present.
checkEnv();

// Read the configuration file and then start the server.
readConfig(CONFIG_FILE).then((config) => {
  logger.init(config.logging);

  logger.logger.info(`Starting server`);
  startServer(config.server);
});
