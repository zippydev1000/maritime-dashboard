import { FastifyPluginAsync } from 'fastify';
import fastifySocketIO from 'fastify-socket.io';
import { Socket } from 'socket.io';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  TargetUpdateEvent,
} from '@maritime/socket-events';

import { startMutationStream } from '../services/targets/mutationStreamer';

export const socketPlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifySocketIO, { path: '/stream' });

  const sendTargetPatch = (patch: TargetUpdateEvent) => {
    app.io.emit('targets:update', patch);
  };

  startMutationStream(app, sendTargetPatch);

  // Connection handler
  app.io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    app.log.info({ sid: socket.id }, 'socket connected');

    socket.on('disconnect', (reason) => {
      app.log.info({ sid: socket.id, reason }, 'socket disconnected');
    });
  });
};
