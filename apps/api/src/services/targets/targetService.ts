import { Target } from '@maritime/common';

import { seedTargets, mutateTargets } from './fakeTargets';

const targetMap = new Map(seedTargets().map((t) => [t.id, t]));

const getTargets = (): Target[] => Array.from(targetMap.values());

const applyMutation = () => {
  const { update, insert, remove } = mutateTargets(getTargets());

  update.forEach((u) => targetMap.set(u.id, u));
  insert.forEach((i) => targetMap.set(i.id, i));
  remove.forEach((id) => targetMap.delete(id));

  return { update, insert, remove };
};

export { getTargets, applyMutation };
