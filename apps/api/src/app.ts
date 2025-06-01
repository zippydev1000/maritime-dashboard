import Fastify from 'fastify';
import cors from '@fastify/cors';
import { loggerOptions } from './plugins/logger';
import { routesPlugin } from './routes';
import { socketPlugin } from './plugins/socket';
import type {} from './types/socket';

export function buildApp() {
  const app = Fastify({ logger: loggerOptions });

  app.register(cors, { origin: true });

  app.register(socketPlugin);

  app.register(routesPlugin, { prefix: '/api' });

  return app;
}
