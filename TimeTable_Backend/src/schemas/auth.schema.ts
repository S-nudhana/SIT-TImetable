import { z } from 'zod';

export const signinSchema = z.object({
  email: z.email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),
  password: z.string()
    .min(8, { message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' })
});

export const signupSchema = z.object({
  email: z.email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),
  password: z.string()
    .min(8, { message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' }),
  firstname: z.string(),
  lastname: z.string()
});