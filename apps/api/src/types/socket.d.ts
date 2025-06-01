import type { IOServer } from 'socket.io';
import type { FastifyInstance } from 'fastify';
import type { ServerToClientEvents, ClientToServerEvents } from '@maritime/socket-events';

declare module 'fastify' {
  interface FastifyInstance {
    io: IOServer<ClientToServerEvents, ServerToClientEvents>;
  }
}
