import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  username: z.string()
    .min(3, 'Username phải có ít nhất 3 ký tự')
    .regex(/^[a-z0-9_]+$/, 'Username chỉ được dùng chữ thường, số và dấu gạch dưới'),
  phone: z.string()
    .regex(/^(0|\+84)\d{9,10}$/, 'Số điện thoại không đúng, ví dụ: 0901234567')
    .optional()
    .or(z.literal(''))
})

export type ProfileForm = z.infer<typeof profileSchema>
