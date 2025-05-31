import { FastifyPluginAsync } from 'fastify';
import { getTargets } from '../controllers/targetsController';

export const targetsPlugin: FastifyPluginAsync = async (app) => {
  app.get('/', getTargets);
};
