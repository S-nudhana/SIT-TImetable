import { cors } from 'hono/cors'

import 'dotenv/config';
import env from '../schemas/env.schema';

export const corsConfig = cors({
    origin: [env.CORS_ORIGIN],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
})