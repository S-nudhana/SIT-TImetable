import { Context } from 'hono';
import type { RowDataPacket } from 'mysql2';

import { connectDB } from './../../database/database';

import type { userData } from '../../types/user.type';

const getUserInfo = async (c: Context) => {
    try {
        const db = await connectDB();
        const userId: string = c.get('userId');
        const [queryUser] = await db.query<RowDataPacket[]>(
            `SELECT email, firstname, lastname FROM users WHERE userId = ?`, [userId]
        )
        if (queryUser.length === 0) {
            return c.json({ message: 'ไม่พบผู้ใช้' }, 404);
        }
        const userData: userData = {
            email: queryUser[0].email,
            firstname: queryUser[0].firstname,
            lastname: queryUser[0].lastname
        }

        return c.json({message: 'ดึงข้อมูลผู้ใช้เรียบร้อยแล้ว', userData: userData}, 200);
    } catch (error) {
        console.error('Get user info error:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}

export default getUserInfo;