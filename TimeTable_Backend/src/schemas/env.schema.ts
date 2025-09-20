import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string().default('3306'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  SALT: z.string().default('10'),
  env: z.enum(['development', 'production']).default('development'),
});

export default envSchema.parse(process.env);