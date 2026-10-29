import { z } from 'zod'

export const contributionLevelSchema = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)])

export const contributionDaySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  count: z.number().int().min(0),
  level: contributionLevelSchema,
})

export const contributionWeekSchema = z.object({
  days: z.array(contributionDaySchema),
})

export const contributionCalendarSchema = z.object({
  totalContributions: z.number().int().min(0),
  weeks: z.array(contributionWeekSchema),
})

export type ContributionLevel = z.infer<typeof contributionLevelSchema>
export type ContributionDay = z.infer<typeof contributionDaySchema>
export type ContributionWeek = z.infer<typeof contributionWeekSchema>
export type ContributionCalendar = z.infer<typeof contributionCalendarSchema>
