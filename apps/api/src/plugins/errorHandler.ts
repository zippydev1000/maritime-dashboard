import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    app.log.error(error);

    reply.status(500).send({
      error: 'Internal Server Error',
      message: error.message,
    });
  });
}
