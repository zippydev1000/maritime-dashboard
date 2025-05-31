import { FastifyReply, FastifyRequest } from 'fastify';
import { getTargets as getAllTargets } from '../services/targetService';

export const getTargets = async (_: FastifyRequest, reply: FastifyReply) => {
  const targets = getAllTargets();
  reply.status(200).send(targets);
};
