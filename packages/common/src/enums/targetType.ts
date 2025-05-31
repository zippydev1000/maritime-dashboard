export const targetTypes = ['SHIP', 'SUB', 'DRONE'] as const;
export type TargetType = (typeof targetTypes)[number];
