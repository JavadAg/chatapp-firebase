import { accepted_types } from './constants'

export type ValidationSchema = z.infer<typeof validationSchema>
import { z } from 'zod'

export const validationSchema = z.object({
  email: z
    .string()
    .min(3, { message: 'Email is required' })
    .max(30, { message: 'Max length exceeded' })
    .email({
      message: 'Must be a valid email',
    }),
  name: z
    .string()
    .min(2, { message: 'Minimum length is 2' })
    .max(20, { message: 'Max length exceeded' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password length exceeded' }),
  avatar: z
    .custom<File[]>()
    .refine(
      (files) =>
        files.length == 0 ? true : accepted_types.includes(files[0].type),
      {
        message: '.jpg, .jpeg, .png and .webp files are accepted.',
      }
    )
    .optional(),
})
