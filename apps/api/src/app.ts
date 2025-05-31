import Fastify from 'fastify';
import cors from '@fastify/cors';
import { loggerOptions } from './plugins/logger';

export function buildApp() {
  const app = Fastify({ logger: loggerOptions });

  app.register(cors, { origin: true });

  return app;
}
