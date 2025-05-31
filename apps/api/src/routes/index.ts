import { FastifyPluginAsync } from 'fastify';
import { targetsPlugin } from './targets';

export const routesPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(targetsPlugin, { prefix: '/targets' });
};
