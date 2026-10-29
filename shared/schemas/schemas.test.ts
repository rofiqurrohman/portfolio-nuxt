import { describe, expect, it } from 'vitest'
import { contributionDaySchema } from './github'
import { experienceSchema } from './experience'
import { profileSchema } from './profile'
import { projectSchema } from './project'
import { skillSchema } from './skill'

const validProject = {
  id: '6650f1b2c3d4e5f6a7b8c9d0',
  title: 'Fleet Uzzeet',
  slug: 'fleet-uzzeet',
  summary: 'Fleet Uzzeet adalah web app dari perusahaan untuk melacak dan memantau kendaraan.',
  imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1/fleet.png',
  category: 'professional',
  liveUrl: null,
  techStack: [],
  sortOrder: 3,
}

const validPosition = {
  title: 'Frontend Developer',
  employmentType: 'full-time',
  startDate: new Date('2022-12-01T00:00:00Z'),
  endDate: null,
  highlights: ['Work with scrum application development method'],
  projects: [{ name: 'Fleet Uzzeet', url: null, highlights: ['Built vehicle tracking features.'] }],
  techStack: ['Vue.js', 'Quasar'],
}

const validExperience = {
  id: '6650f1b2c3d4e5f6a7b8c9d1',
  company: 'PT Telto Telematis Indonesia',
  companyUrl: null,
  logoUrl: null,
  workMode: 'hybrid',
  location: { city: 'Yogyakarta', country: 'Indonesia' },
  positions: [validPosition],
  sortOrder: 1,
}

const withPosition = (overrides: Record<string, unknown>) => ({
  ...validExperience,
  positions: [{ ...validPosition, ...overrides }],
})

const validProfile = {
  id: '6650f1b2c3d4e5f6a7b8c9d2',
  fullName: 'Rofiqur Rohman',
  roles: ['Software Developer'],
  bio: ['Hi Everyone, I am Rofiqur Rohman from Indonesia.'],
  location: { country: 'Indonesia' },
  activities: ['Travelling'],
  quote: 'Risk more than other think is safe!',
  socialLinks: [{ platform: 'github', url: 'https://github.com/rofiqurrohman', icon: 'simple-icons:github' }],
  githubUsername: 'rofiqurrohman',
  resumeUrl: '/resume_rofiqurrohman.pdf',
}

describe('projectSchema', () => {
  it('accepts a project without a live url', () => {
    expect(projectSchema.parse(validProject).liveUrl).toBeNull()
  })

  it('rejects an unknown category', () => {
    expect(projectSchema.safeParse({ ...validProject, category: 'company' }).success).toBe(false)
  })

  it('rejects a slug that is not kebab-case', () => {
    expect(projectSchema.safeParse({ ...validProject, slug: 'Fleet Uzzeet' }).success).toBe(false)
  })

  it('strips legacy fields', () => {
    expect(projectSchema.parse({ ...validProject, isProject: true })).not.toHaveProperty('isProject')
  })
})

describe('experienceSchema', () => {
  it('accepts a company with an ongoing position', () => {
    expect(experienceSchema.parse(validExperience).positions[0]?.endDate).toBeNull()
  })

  it('rejects a company without positions', () => {
    expect(experienceSchema.safeParse({ ...validExperience, positions: [] }).success).toBe(false)
  })

  it('rejects a position that ends before it starts', () => {
    const result = experienceSchema.safeParse(withPosition({ endDate: new Date('2021-01-01T00:00:00Z') }))
    expect(result.success).toBe(false)
  })

  it('rejects a start date stored as a string', () => {
    expect(experienceSchema.safeParse(withPosition({ startDate: '2022-12-01' })).success).toBe(false)
  })

  it('defaults optional position details to empty lists', () => {
    const { projects: _projects, techStack: _techStack, ...minimalPosition } = validPosition
    const parsed = experienceSchema.parse({ ...validExperience, positions: [minimalPosition] })
    expect(parsed.positions[0]?.projects).toEqual([])
    expect(parsed.positions[0]?.techStack).toEqual([])
  })
})

describe('skillSchema', () => {
  it('rejects an icon name without an Iconify collection prefix', () => {
    const result = skillSchema.safeParse({ id: 'a', name: 'Vue', icon: 'vue', category: 'frontend', sortOrder: 1 })
    expect(result.success).toBe(false)
  })

  it('accepts the AI category', () => {
    const result = skillSchema.safeParse({ id: 'a', name: 'Claude', icon: 'simple-icons:claude', category: 'ai', sortOrder: 1 })
    expect(result.success).toBe(true)
  })

  it('rejects the legacy technology/tool categories', () => {
    const result = skillSchema.safeParse({ id: 'a', name: 'Git', icon: 'simple-icons:git', category: 'tool', sortOrder: 1 })
    expect(result.success).toBe(false)
  })
})

describe('contributionDaySchema', () => {
  it('rejects a level above 4', () => {
    expect(contributionDaySchema.safeParse({ date: '2026-01-01', count: 3, level: 5 }).success).toBe(false)
  })
})

describe('profileSchema', () => {
  it('accepts a valid profile', () => {
    expect(profileSchema.parse(validProfile).fullName).toBe('Rofiqur Rohman')
  })

  it('rejects a profile without roles', () => {
    expect(profileSchema.safeParse({ ...validProfile, roles: [] }).success).toBe(false)
  })
})
