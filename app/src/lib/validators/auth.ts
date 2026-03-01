import { z } from 'zod';

/**
 * Registration schema for teacher sign-up
 * - email: valid email format
 * - password: minimum 8 characters
 * - name: minimum 2 characters
 */
export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
