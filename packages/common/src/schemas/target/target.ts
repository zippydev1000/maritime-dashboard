import { z } from 'zod';
import { targetTypes, threatLevels } from '../../enums/index';

export const TargetSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(targetTypes),
  threat_level: z.enum(threatLevels),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  last_updated: z.coerce.date(),
});

export type Target = z.infer<typeof TargetSchema>;
