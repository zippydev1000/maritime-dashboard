import { Target } from '@maritime/common';

export interface TargetUpdateEvent {
  insert?: Target[];
  update?: Target[];
  remove?: string[];
}
