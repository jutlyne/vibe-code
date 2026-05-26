import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu ít nhất 8 ký tự'),
  fullName: z.string().min(2, 'Họ tên ít nhất 2 ký tự'),
  username: z.string()
    .min(3, 'Username ít nhất 3 ký tự')
    .regex(/^[a-z0-9_]+$/, 'Username chỉ dùng chữ thường, số, dấu gạch dưới'),
  phone: z.string()
    .regex(/^(0|\+84)\d{9,10}$/, 'Số điện thoại không hợp lệ')
    .optional()
    .or(z.literal(''))
})

export type RegisterForm = z.infer<typeof registerSchema>
