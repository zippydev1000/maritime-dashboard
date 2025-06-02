import { FastifyPluginAsync } from 'fastify';
import { targetsPlugin } from './targets';

export const routesPlugin: FastifyPluginAsync = async (fastify) => {
  // Health check endpoint
  fastify.get('/health', async () => {
    return { status: 'ok' };
  });

  fastify.register(targetsPlugin, { prefix: '/targets' });
};
