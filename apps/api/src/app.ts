import Fastify from 'fastify';
import cors from '@fastify/cors';
import { loggerOptions } from './plugins/logger';
import { routesPlugin } from './routes';

export function buildApp() {
  const app = Fastify({ logger: loggerOptions });

  app.register(cors, { origin: true });

  app.register(routesPlugin, { prefix: '/api' });

  return app;
}
