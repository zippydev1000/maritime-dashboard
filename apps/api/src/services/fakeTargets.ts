import { faker } from '@faker-js/faker';
import { Target } from '@maritime/common';

export const generateRandomTarget = (): Target => ({
  id: faker.string.uuid(),
  type: faker.helpers.arrayElement(['SHIP', 'SUB', 'DRONE']),
  threat_level: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
  lat: faker.location.latitude(),
  lon: faker.location.longitude(),
  last_updated: new Date(),
});

export const seedTargets = (targetCount: number = 25): Target[] =>
  Array.from({ length: targetCount }, () => generateRandomTarget());
