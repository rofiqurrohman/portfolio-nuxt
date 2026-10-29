import type { Location } from '../../shared/schemas/common'
import type { EmploymentType, WorkMode } from '../../shared/schemas/experience'

type DateInput = string | Date

const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'internship': 'Internship',
  'freelance': 'Freelance',
  'contract': 'Contract',
}

const WORK_MODE_LABELS: Record<WorkMode, string> = {
  onsite: 'On-site',
  hybrid: 'Hybrid',
  remote: 'Remote',
}

// Dates arrive from the API as ISO strings and are always read in UTC, so the
// month never shifts with the visitor's timezone.
const toMonthIndex = (date: DateInput) => {
  const value = new Date(date)
  return value.getUTCFullYear() * 12 + value.getUTCMonth()
}

const monthDotYear = (date: DateInput) => {
  const value = new Date(date)
  return `${String(value.getUTCMonth() + 1).padStart(2, '0')}.${value.getUTCFullYear()}`
}

/** "12.2022–∞" for an ongoing position, "03.2022–12.2022" otherwise. */
export function formatPeriod(start: DateInput, end: DateInput | null): string {
  return `${monthDotYear(start)}–${end === null ? '∞' : monthDotYear(end)}`
}

/** "3y 11m", counting both the first and the last month. */
export function formatDuration(start: DateInput, end: DateInput | null, now: Date = new Date()): string {
  const totalMonths = Math.max(1, toMonthIndex(end ?? now) - toMonthIndex(start) + 1)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (years === 0) return `${months}m`
  return months === 0 ? `${years}y` : `${years}y ${months}m`
}

export function formatLocation(location: Location): string {
  return [location.city, location.country].filter(Boolean).join(', ')
}

export function formatEmploymentType(type: EmploymentType): string {
  return EMPLOYMENT_LABELS[type]
}

export function formatWorkMode(mode: WorkMode): string {
  return WORK_MODE_LABELS[mode]
}
