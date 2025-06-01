import { FastifyInstance } from 'fastify';
import { applyMutation } from './targetService';
import { TargetUpdateEvent } from '@maritime/socket-events';
import { TARGET_UPDATE_INTERVAL } from './constants';

type PatchCallback = (patch: TargetUpdateEvent) => void;

export const startMutationStream = (app: FastifyInstance, onPatch: PatchCallback) => {
  setInterval(() => {
    const patch = applyMutation();

    const hasChanges = patch.update.length || patch.insert.length || patch.remove.length;

    if (hasChanges) {
      onPatch(patch);
    }
  }, TARGET_UPDATE_INTERVAL);
};
