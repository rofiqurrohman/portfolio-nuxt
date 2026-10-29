import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import type { ContributionCalendar as Calendar, ContributionLevel } from '#shared/schemas/github'
import ContributionCalendar from './ContributionCalendar.vue'

const week = (startDay: number, level: ContributionLevel) => ({
  days: Array.from({ length: 7 }, (_, index) => ({
    date: `2026-01-${String(startDay + index).padStart(2, '0')}`,
    count: level * 3,
    level,
  })),
})

const calendar: Calendar = { totalContributions: 84, weeks: [week(4, 0), week(11, 4)] }

describe('ContributionCalendar', () => {
  it('renders one cell per day', async () => {
    const wrapper = await mountSuspended(ContributionCalendar, { props: { calendar } })

    expect(wrapper.findAll('[data-contribution-day]')).toHaveLength(14)
  })

  it('colours each cell by its contribution level', async () => {
    const wrapper = await mountSuspended(ContributionCalendar, { props: { calendar } })

    const busiestDay = wrapper.find('[data-contribution-day="2026-01-11"]')
    expect(busiestDay.classes()).toContain('level-4')
  })

  it('shows the yearly total', async () => {
    const wrapper = await mountSuspended(ContributionCalendar, { props: { calendar } })

    expect(wrapper.text()).toContain('84 contributions in the last year')
  })
})
