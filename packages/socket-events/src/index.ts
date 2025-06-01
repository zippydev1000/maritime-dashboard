import { TargetUpdateEvent } from './types';

export * from './types';

/** Events the server emits → client listens */
export interface ServerToClientEvents {
  'targets:update': (payload: TargetUpdateEvent) => void;
}

/** Events the client emits → server listens (reserved for future) */
export interface ClientToServerEvents {}
