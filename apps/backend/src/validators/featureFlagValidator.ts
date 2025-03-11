import { z } from 'zod';

// Define the schema for targeting rules
export const targetingRuleSchema = z.object({
  condition: z.string(),
  enabled: z.boolean(),
});

// Define the schema for the targeting object
export const targetingSchema = z.object({
  default: z.boolean(),
  rules: z.array(targetingRuleSchema),
});

// Define the schema for feature flag creation
export const featureFlagSchema = z.object({
  name: z.string().min(1, 'Feature flag name is required'),
  enabled: z.boolean(),
  targeting: targetingSchema,
});

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const apiKeySchema = z.object({
  apiKey: z.string().uuid(),
});
