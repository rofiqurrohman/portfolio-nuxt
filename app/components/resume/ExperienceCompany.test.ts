import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import type { Experience, Position } from '#shared/schemas/experience'
import ExperienceCompany from './ExperienceCompany.vue'

const position = (overrides: Partial<Position>): Position => ({
  title: 'Frontend Developer',
  employmentType: 'full-time',
  startDate: new Date('2022-12-01T00:00:00Z'),
  endDate: null,
  highlights: ['Developing the GPS Tracking web app feature with other teams.'],
  projects: [],
  techStack: ['Vue.js', 'Quasar'],
  ...overrides,
})

const experience = (overrides: Partial<Experience>): Experience => ({
  id: 'e1',
  company: 'PT Telto Telematis Indonesia',
  companyUrl: null,
  logoUrl: null,
  location: { city: 'Yogyakarta', country: 'Indonesia' },
  workMode: 'remote',
  positions: [position({})],
  sortOrder: 1,
  ...overrides,
})

describe('ExperienceCompany', () => {
  it('shows the company with its location, work mode and a current-job indicator', async () => {
    const wrapper = await mountSuspended(ExperienceCompany, { props: { experience: experience({}) } })

    expect(wrapper.find('h3').text()).toBe('PT Telto Telematis Indonesia')
    expect(wrapper.text()).toContain('Yogyakarta, Indonesia (Remote)')
    expect(wrapper.find('[data-current-indicator]').exists()).toBe(true)
  })

  it('links the company name when a url is set', async () => {
    const wrapper = await mountSuspended(ExperienceCompany, {
      props: { experience: experience({ companyUrl: 'https://telto.example.com' }) },
    })

    expect(wrapper.find('h3 a').attributes('href')).toBe('https://telto.example.com')
  })

  it('opens ongoing positions and keeps finished ones collapsed', async () => {
    const wrapper = await mountSuspended(ExperienceCompany, {
      props: {
        experience: experience({
          positions: [
            position({ title: 'Senior Frontend Developer' }),
            position({ title: 'Frontend Developer', startDate: new Date('2021-01-01T00:00:00Z'), endDate: new Date('2022-11-01T00:00:00Z') }),
          ],
        }),
      },
    })

    const states = wrapper.findAll('[data-position]').map(item => item.attributes('data-state'))
    expect(states).toEqual(['open', 'closed'])
    expect(wrapper.text()).toContain('Developing the GPS Tracking web app feature with other teams.')
  })

  it('summarises a position as type, period and duration', async () => {
    const wrapper = await mountSuspended(ExperienceCompany, {
      props: {
        experience: experience({
          workMode: null,
          positions: [position({ employmentType: 'freelance', startDate: new Date('2022-02-01T00:00:00Z'), endDate: new Date('2022-04-01T00:00:00Z') })],
        }),
      },
    })

    const meta = wrapper.findAll('[data-position-meta] > span').map(part => part.text())
    expect(meta).toEqual(['Freelance', '02.2022–04.2022', '3m'])
    expect(wrapper.find('[data-current-indicator]').exists()).toBe(false)
  })

  it('lists projects and the tech stack of an open position', async () => {
    const wrapper = await mountSuspended(ExperienceCompany, {
      props: {
        experience: experience({
          positions: [position({ projects: [{ name: 'Fleet Uzzeet', url: 'https://fleet.example.com', highlights: ['Built live tracking.'] }] })],
        }),
      },
    })

    expect(wrapper.find('a[href="https://fleet.example.com"]').text()).toBe('Fleet Uzzeet')
    expect(wrapper.text()).toContain('Built live tracking.')
    expect(wrapper.findAll('[data-tech-chip]').map(chip => chip.text())).toEqual(['Vue.js', 'Quasar'])
  })
})
