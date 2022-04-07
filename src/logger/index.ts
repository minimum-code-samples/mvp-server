/**
 * Setup for the logging mechanism.
 *
 * @module logger
 */

import * as winston from "winston";

import {
  CONFIG_FILE,
  ERROR_FILE,
  LOG_FILE,
  LOG_LEVEL,
  LOG_LEVEL_VALUE,
} from "../constants";

export let logger: winston.Logger;

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    ({ level, message, timestamp }) =>
      `${timestamp}: (${level.toUpperCase()}) ${message}`
  )
);

const subfolder = "logs/";
let errFile = "";
let logFile = "";
let logLevel = "";

export function init(logging: {
  ERROR_FILE: string;
  LOG_FILE: string;
  LOG_LEVEL: string;
}) {
  if (logger) {
    // If initialized, just return.
    return;
  }

  if (!logging) {
    console.error(
      "Cannot initiatiate logger - configuration file does not specify logging parameters."
    );
    process.exit(1);
  }

  let allOk = true;
  const required = [LOG_LEVEL, LOG_FILE, ERROR_FILE];
  for (let req of required) {
    if (!(req in logging)) {
      console.error(
        `${CONFIG_FILE} is missing configuration parameter \`${req}\`.`
      );
      allOk = false;
    }
  }

  if (!allOk) {
    process.exit(1);
  }

  if (logging[ERROR_FILE]) {
    errFile = logging[ERROR_FILE];
  }
  if (logging[LOG_FILE]) {
    logFile = logging[LOG_FILE];
  }
  if (logging[LOG_LEVEL]) {
    logLevel = logging[LOG_LEVEL];
  } else {
    logLevel = LOG_LEVEL_VALUE;
  }

  let transports: winston.transport[] = [new winston.transports.Console()];
  if (logFile) {
    transports.push(
      new winston.transports.File({ filename: subfolder + logFile })
    );
  }
  if (errFile) {
    transports.push(
      new winston.transports.File({
        filename: subfolder + errFile,
        level: "error",
      })
    );
  }

  logger = winston.createLogger({
    format: logFormat,
    level: logLevel,
    transports,
  });
}
