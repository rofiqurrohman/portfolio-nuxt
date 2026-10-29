import { z } from 'zod'

export const idSchema = z.string().min(1)

export const sortOrderSchema = z.number().int()

export const locationSchema = z.object({
  city: z.string().min(1).optional(),
  country: z.string().min(1),
})

export type Location = z.infer<typeof locationSchema>
