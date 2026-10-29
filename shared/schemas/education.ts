import { z } from 'zod'
import { idSchema, sortOrderSchema } from './common'

export const educationSchema = z.object({
  id: idSchema,
  institution: z.string().min(1),
  fieldOfStudy: z.string().min(1),
  graduationYear: z.number().int().min(1990).max(2100),
  highlights: z.array(z.string().min(1)),
  sortOrder: sortOrderSchema,
})

export const educationInputSchema = educationSchema.omit({ id: true })

export type Education = z.infer<typeof educationSchema>
export type EducationInput = z.infer<typeof educationInputSchema>
