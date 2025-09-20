import type { Context } from 'hono';
import type { RowDataPacket } from 'mysql2';
import type { signupPayload } from '../../types/user.type';

import { connectDB } from './../../database/database';

import { hashPassword } from '../../lib/bcrypt';

import { signupSchema } from '../../schemas/auth.schema';

const signup = async (c: Context) => {
    try {
        const db = await connectDB();
        const body: signupPayload = await c.req.json();
        const parsed = signupSchema.safeParse(body);
        if (!parsed.success) {
            return c.json({ errors: 'รูปแบบข้อมูลไม่ถูกต้อง' }, 400);
        }
        const { email, password, firstname, lastname } = parsed.data;
        const [existingUser] = await db.query<RowDataPacket[]>(
            `SELECT userId FROM users WHERE email = ?`,
            [email]
        );
        if (existingUser.length > 0) {
            return c.json({ message: 'อีเมลนี้ถูกใช้งานแล้ว' }, 409);
        }

        const hashedPassword = hashPassword(password);
        await db.execute(
            `INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)`,
            [email, hashedPassword, firstname, lastname]
        );

        return c.json({ message: 'สมัครสมาชิกสำเร็จ' }, 201);
    } catch (error) {
        console.error('Signup error:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
};

export default signup;