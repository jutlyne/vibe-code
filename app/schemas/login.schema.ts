import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng, ví dụ: ten@example.com'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
})

export type LoginForm = z.infer<typeof loginSchema>
