import express from 'express';
import jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

import { Activity, JsonWebToken } from '@teams.sdk/api';

import { RouteContext } from '../../../context';

interface CreateActivityParams {
  readonly conversationId: string;
}

export function create({ port, log, process }: RouteContext) {
  return async (req: express.Request<CreateActivityParams, any, Activity>, res: express.Response) => {
    const isClient = req.headers['x-teams-devtools'] === 'true';

    if (!isClient) {
      res.status(201).send({ id: uuid.v4() });
      return;
    }

    try {
      const response = await process({
        token: new JsonWebToken(jwt.sign({
          serviceurl: `http://localhost:${port}`,
        }, 'secret')),
        activity: {
          ...req.body,
          id: req.body.id || uuid.v4(),
          channelId: 'msteams',
          from: {
            id: 'devtools',
            name: 'devtools',
            role: 'user',
          },
          conversation: {
            id: req.params.conversationId,
            conversationType: 'oneOnOne',
            isGroup: false,
            name: 'default',
            role: 'user',
          },
        },
      });

      res.status(201).send(response);
    } catch (err: any) {
      if (err instanceof Error) {
        log.error(err.message, err.stack);
        res.status(500).send({ error: err.message });
        return;
      }

      log.error(err);
      res.status(500).send({ error: err });
    }
  };
}
