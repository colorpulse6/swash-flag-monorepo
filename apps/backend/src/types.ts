import { Request } from 'express';

// Define the User type based on your Prisma schema
export interface User {
  id: string;
  email: string;
  // Add other fields as per your schema
}

// Define the JsonValue type
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export interface TargetingRule {
  condition: string;
  enabled: boolean;
}

export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  targeting: Targeting | JsonValue;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Targeting {
  default: boolean;
  rules: TargetingRule[];
}
