import { describe, expect, it } from 'vitest'
import { formatDuration, formatEmploymentType, formatLocation, formatPeriod, formatWorkMode } from './format'

describe('formatPeriod', () => {
  it('uses an infinity sign for an ongoing position', () => {
    expect(formatPeriod(new Date('2022-12-01T00:00:00Z'), null)).toBe('12.2022–∞')
  })

  it('accepts ISO strings as returned by the API', () => {
    expect(formatPeriod('2022-03-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')).toBe('03.2022–12.2022')
  })

  it('formats in UTC so the month never shifts with the visitor timezone', () => {
    expect(formatPeriod('2021-07-01T00:00:00.000Z', '2021-12-01T00:00:00.000Z')).toBe('07.2021–12.2021')
  })
})

describe('formatDuration', () => {
  const now = new Date('2026-10-28T00:00:00Z')

  it('counts both the first and the last month', () => {
    expect(formatDuration('2022-02-01T00:00:00.000Z', '2022-04-01T00:00:00.000Z', now)).toBe('3m')
  })

  it('measures an ongoing position up to now', () => {
    expect(formatDuration('2026-01-01T00:00:00.000Z', null, now)).toBe('10m')
  })

  it('switches to years once it reaches twelve months', () => {
    expect(formatDuration('2022-12-01T00:00:00.000Z', null, now)).toBe('3y 11m')
  })

  it('omits zero months', () => {
    expect(formatDuration('2025-01-01T00:00:00.000Z', '2025-12-01T00:00:00.000Z', now)).toBe('1y')
  })
})

describe('formatLocation', () => {
  it('joins city and country', () => {
    expect(formatLocation({ city: 'Yogyakarta', country: 'Indonesia' })).toBe('Yogyakarta, Indonesia')
  })

  it('shows only the country when there is no city', () => {
    expect(formatLocation({ country: 'Singapore' })).toBe('Singapore')
  })
})

describe('formatEmploymentType', () => {
  it('labels an employment type', () => {
    expect(formatEmploymentType('full-time')).toBe('Full-time')
  })
})

describe('formatWorkMode', () => {
  it('labels a work mode', () => {
    expect(formatWorkMode('remote')).toBe('Remote')
  })
})
