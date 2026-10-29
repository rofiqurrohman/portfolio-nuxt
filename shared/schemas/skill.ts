import { z } from 'zod'
import { idSchema, sortOrderSchema } from './common'

/** Rows of the Stack table, in display order. Empty categories are not shown. */
export const skillCategorySchema = z.enum([
  'language',
  'frontend',
  'backend',
  'web3',
  'workflow',
  'ai',
  'design',
  'analytics',
])

export const SKILL_CATEGORY_LABELS: Record<z.infer<typeof skillCategorySchema>, string> = {
  language: 'Language',
  frontend: 'Frontend',
  backend: 'Backend & Database',
  web3: 'Web3',
  workflow: 'Workflow & Tools',
  ai: 'AI',
  design: 'Design',
  analytics: 'Analytics',
}

export const skillSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  icon: z.string().regex(/^[a-z0-9-]+:[a-z0-9-]+$/, 'Icon must be an Iconify name like "simple-icons:vuedotjs"'),
  category: skillCategorySchema,
  sortOrder: sortOrderSchema,
})

export const skillInputSchema = skillSchema.omit({ id: true })

export type SkillCategory = z.infer<typeof skillCategorySchema>
export type Skill = z.infer<typeof skillSchema>
export type SkillInput = z.infer<typeof skillInputSchema>
