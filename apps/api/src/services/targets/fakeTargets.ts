import { faker } from '@faker-js/faker';
import { Target, threatLevels } from '@maritime/common';
import { generateRandomTarget, randomBetween, shuffleAndPick } from './helpers';
import { MAX_TARGETS, MIN_TARGETS } from './constants';

export const seedTargets = (targetCount: number = 25): Target[] =>
  Array.from({ length: targetCount }, () => generateRandomTarget());

export const getUpdatedTargets = (original: Target[]) => {
  const count = randomBetween(1, Math.min(5, original.length));
  const selected = shuffleAndPick(original, count);

  const updates = selected.map((t) => ({
    ...t,
    threat_level: faker.helpers.arrayElement(threatLevels),
    lat: faker.location.latitude(),
    lon: faker.location.longitude(),
    last_updated: new Date(),
  }));

  const updatedMap = new Map(updates.map((t) => [t.id, t]));
  const updatedIds = new Set(updates.map((t) => t.id));

  return { updates, map: updatedMap, updatedIds };
};

export const getInsertedTargets = (currentSize: number): Target[] => {
  const room = MAX_TARGETS - currentSize;
  const count = room > 0 ? randomBetween(0, Math.min(2, room)) : 0;
  return Array.from({ length: count }, generateRandomTarget);
};

export const getRemovedIds = (original: Target[], excludeIds: Set<string>): string[] => {
  const eligible = original.filter((t) => !excludeIds.has(t.id));
  const room = original.length - MIN_TARGETS;
  const count = room > 0 ? randomBetween(0, Math.min(2, room, eligible.length)) : 0;

  return shuffleAndPick(eligible, count).map((t) => t.id);
};

export const buildNextState = (
  original: Target[],
  updatedMap: Map<string, Target>,
  removed: Set<string>,
  inserted: Target[],
): Target[] =>
  original
    .filter((t) => !removed.has(t.id))
    .map((t) => updatedMap.get(t.id) ?? t)
    .concat(inserted);

export const mutateTargets = (original: Target[]) => {
  const { updates, map: updatedMap, updatedIds } = getUpdatedTargets(original);
  const inserted = getInsertedTargets(original.length);
  const removedIds = getRemovedIds(original, updatedIds);
  const next = buildNextState(original, updatedMap, new Set(removedIds), inserted);

  return {
    next,
    update: updates,
    insert: inserted,
    remove: removedIds,
  };
};
