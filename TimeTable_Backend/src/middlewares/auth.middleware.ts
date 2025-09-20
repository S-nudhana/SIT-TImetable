import { Context, Next } from "hono";
import { jwtVerify } from "../lib/jwt";
import { getSignedCookie } from "hono/cookie";

import env from "../schemas/env.schema";

export const auth = async (c: Context, next: Next) => {
  try {
    const token = await getSignedCookie(c, env.COOKIE_SECRET, 'token');
    if (!token) {
      return c.json({ message: 'ไม่พบ Token' }, 401);
    }

    const payload = await jwtVerify(token);
    if (!payload) {
      return c.json({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' }, 401);
    }

    c.set('userId', payload.userId);
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ message: 'Internal server error' }, 500);
  }
};