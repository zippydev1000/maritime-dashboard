import { faker } from '@faker-js/faker';
import { Target, targetTypes, threatLevels } from '@maritime/common';

export const randomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffleAndPick = <T>(list: T[], count: number): T[] =>
  [...list].sort(() => Math.random() - 0.5).slice(0, count);

export const generateRandomTarget = (): Target => ({
  id: faker.string.uuid(),
  type: faker.helpers.arrayElement(targetTypes),
  threat_level: faker.helpers.arrayElement(threatLevels),
  lat: faker.location.latitude(),
  lon: faker.location.longitude(),
  last_updated: new Date(),
});
