/**
 * The endpoint handlers
 * @module rest/handlers
 */
import express from 'express';

import { logger as lg } from '../logger';

export function echo(req: express.Request, res: express.Response) {
  lg.info('/echo handler called.');

  res.json(req.body);
}
