# Introduction

This repository holds the bare minimum set of code needed to run a server. It comes complete with logging capability (using [Winston](https://www.npmjs.com/package/winston)), configuration settings (using [TOML](https://www.npmjs.com/package/toml)), environment variable checking ([dotenv](https://www.npmjs.com/package/dotenv)), and [CORS](https://www.npmjs.com/package/cors) capability.

It is written in TypeScript.

## Getting started

To get started with the package, first make a copy of _env-template_ and save it as _.env_ (because this file should never be committed to a code repository).

Then run

```bash
npm start
```

This will start a server that listens on the port set in the configuration file _config.toml_, which is 8080 by default.

## Structure

The endpoint handlers are defined in _src/rest/handlers.ts_. They are mapped to the server in _src/rest/index.ts_ via the function `_makeApi1`.

## Logging

Logging is performed using the Winston library. The location of the log files is specified in the configuration file under the `[logging]` section. The log files are separated into two - one stores all the logs and one stores only errors.

If the configuration parameters are left empty, then the logs are not saved to disk.

## CORS

For cross-origin resource sharing capability, modify the section `[server]` in the configuration file.
