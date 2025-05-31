export const threatLevels = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type ThreatLevel = (typeof threatLevels)[number];
