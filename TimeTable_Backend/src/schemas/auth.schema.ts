import { z } from 'zod';

export const signinSchema = z.object({
  email: z.email({ message: 'Invalid email' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
});

export const signupSchema = z.object({
  email: z.email({ message: 'Invalid email' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  firstname: z.string(),
  lastname: z.string()
});