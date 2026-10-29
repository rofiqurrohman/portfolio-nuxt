import { z } from 'zod'
import { idSchema, locationSchema, sortOrderSchema } from './common'

export const employmentTypeSchema = z.enum(['full-time', 'part-time', 'internship', 'freelance', 'contract'])

export const workModeSchema = z.enum(['onsite', 'hybrid', 'remote'])

/** A project done inside a position, e.g. an in-house product. */
export const positionProjectSchema = z.object({
  name: z.string().min(1),
  url: z.url().nullable().default(null),
  highlights: z.array(z.string().min(1)).default([]),
})

export const positionSchema = z.object({
  title: z.string().min(1),
  employmentType: employmentTypeSchema,
  startDate: z.date(),
  endDate: z.date().nullable(),
  highlights: z.array(z.string().min(1)).default([]),
  projects: z.array(positionProjectSchema).default([]),
  techStack: z.array(z.string().min(1)).default([]),
}).refine(
  position => position.endDate === null || position.endDate >= position.startDate,
  { message: 'endDate must not be before startDate', path: ['endDate'] },
)

/** One document per company; a company can hold several positions over time. */
export const experienceSchema = z.object({
  id: idSchema,
  company: z.string().min(1),
  companyUrl: z.url().nullable().default(null),
  logoUrl: z.url().nullable().default(null),
  location: locationSchema,
  workMode: workModeSchema.nullable(),
  positions: z.array(positionSchema).min(1),
  sortOrder: sortOrderSchema,
})

export const experienceInputSchema = experienceSchema.omit({ id: true })

export type EmploymentType = z.infer<typeof employmentTypeSchema>
export type WorkMode = z.infer<typeof workModeSchema>
export type PositionProject = z.infer<typeof positionProjectSchema>
export type Position = z.infer<typeof positionSchema>
export type Experience = z.infer<typeof experienceSchema>
export type ExperienceInput = z.input<typeof experienceInputSchema>
