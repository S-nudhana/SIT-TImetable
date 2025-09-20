import { sign, verify } from 'hono/jwt';
import env from '../schemas/env.schema';

import type { JwtPayload } from '../types/jwt.type';

export const jwtSign = (payload: JwtPayload) => {
    if (!env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return sign(payload, env.JWT_SECRET);
}

export const jwtVerify = (token: string) => {
    if (!env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return verify(token, env.JWT_SECRET);
};