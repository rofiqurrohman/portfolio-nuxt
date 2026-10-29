import { z } from 'zod'
import { idSchema, sortOrderSchema } from './common'

export const projectCategorySchema = z.enum(['personal', 'professional'])

export const projectSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case'),
  summary: z.string().min(1),
  imageUrl: z.url(),
  category: projectCategorySchema,
  liveUrl: z.url().nullable(),
  techStack: z.array(z.string().min(1)),
  sortOrder: sortOrderSchema,
})

export const projectInputSchema = projectSchema.omit({ id: true })

export type ProjectCategory = z.infer<typeof projectCategorySchema>
export type Project = z.infer<typeof projectSchema>
export type ProjectInput = z.infer<typeof projectInputSchema>
