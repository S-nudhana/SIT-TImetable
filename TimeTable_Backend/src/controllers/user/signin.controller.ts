import { setSignedCookie } from 'hono/cookie';

import type { Context } from 'hono';
import type { RowDataPacket } from 'mysql2';
import type { signinPayload } from '../../types/user.type';
import type { JwtPayload } from '../../types/jwt.type';

import { connectDB } from './../../database/database';

import { compare } from '../../lib/bcrypt';
import { jwtSign } from '../../lib/jwt';

import env from '../../schemas/env.schema';
import { signinSchema } from '../../schemas/auth.schema'

const signin = async (c: Context) => {
  try {
    const db = await connectDB();
    const body: signinPayload = await c.req.json();

    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ errors: 'รูปแบบข้อมูลไม่ถูกต้อง' }, 400);
    }

    const { email, password } = parsed.data;

    const [queryUser] = await db.query<RowDataPacket[]>(
      `SELECT userId, password FROM users WHERE email = ?`,
      [email]
    );

    if (queryUser.length === 0) {
      return c.json({ message: 'ไม่พบผู้ใช้' }, 404);
    }

    const queryPassword: string = queryUser[0].password;
    const isPasswordMatch: boolean = compare(password, queryPassword);

    if (!isPasswordMatch) {
      return c.json({ message: 'รหัสผ่านไม่ถูกต้อง' }, 401);
    }

    const payloadData: JwtPayload = { userId: queryUser[0].userId };
    const token = await jwtSign(payloadData);

    await setSignedCookie(c, 'token', token, env.COOKIE_SECRET, {
      path: '/',
      httpOnly: true,
      secure: env.env === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24,
    });
    return c.json({ message: 'เข้าสู่ระบบสำเร็จ' }, 200);
  } catch (error) {
    console.error('Signin error:', error);
    return c.json({ message: 'Internal server error' }, 500);
  }
};

export default signin;