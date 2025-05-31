import { Target } from 'packages/common/dist';
import { seedTargets } from './fakeTargets';

const targets = seedTargets();

export const getTargets = (): Target[] => targets;
