import { FastifyPluginAsync } from 'fastify';
import { env } from '../config';

export const loggerPlugin: FastifyPluginAsync = async (app) => {
  app.log.info('logger initialised');
};

export const loggerOptions =
  env.NODE_ENV === 'development'
    ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
    : true;
