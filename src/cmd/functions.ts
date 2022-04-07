/**
 * Functions to support the command line.
 *
 * @module cmd/functions
 */
import fs from "fs";
import toml from "toml";

import { API_KEY } from "../constants";

export let config: any | null;

/**
 * Checks that the necessary environment variables are present. End the program otherwise.
 */
export function checkEnv() {
  if (!(API_KEY in process.env)) {
    console.error(`API key not specified in environment. Exiting now.`);
    process.exit(1);
  }
}

/**
 * Reads and parses the TOML configuration file. This file is only read the first time the program is run.
 *
 * If the file is not found or malformed, the program ends.
 *
 * The program has to be restarted for changes in the file to take effect.
 * @param file - The path to the configuration file.
 */
export async function readConfig(file: string) {
  if (config) {
    return config;
  }
  let raw: string;

  try {
    raw = fs.readFileSync(file, {
      encoding: "utf-8",
      flag: "r",
    });
  } catch (err) {
    console.error(`"${file}" not found. Exiting now.`);
    process.exit(1);
  }

  try {
    config = toml.parse(raw);
    return config;
  } catch (err) {
    console.error(`Configuration file "${file}" is malformed. Exiting now.`);
    process.exit(1);
  }
}
