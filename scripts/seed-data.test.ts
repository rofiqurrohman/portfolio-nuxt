import { describe, expect, it } from 'vitest'
import { educationInputSchema } from '../shared/schemas/education'
import { experienceInputSchema } from '../shared/schemas/experience'
import { profileInputSchema } from '../shared/schemas/profile'
import { projectInputSchema } from '../shared/schemas/project'
import { skillInputSchema } from '../shared/schemas/skill'
import { educationSeeds, experienceSeeds, profileSeed, projectSeeds, skillSeeds } from './seed-data'

const professionalTitles = [
  'Fleet Uzzeet',
  'Runner',
  'Trip Management',
  'Sistem Informasi Harga dan Produksi Komoditi',
  'Learning Management System Amikom Center',
  'Money Changer',
  'Dashboard Admin',
]

describe('seed data', () => {
  it('passes the input schemas', () => {
    expect(() => profileInputSchema.parse(profileSeed)).not.toThrow()
    projectSeeds.forEach(seed => expect(() => projectInputSchema.parse(seed)).not.toThrow())
    experienceSeeds.forEach(seed => expect(() => experienceInputSchema.parse(seed)).not.toThrow())
    educationSeeds.forEach(seed => expect(() => educationInputSchema.parse(seed)).not.toThrow())
    skillSeeds.forEach(seed => expect(() => skillInputSchema.parse(seed)).not.toThrow())
  })

  it('migrates every legacy record', () => {
    expect(projectSeeds).toHaveLength(13)
    expect(experienceSeeds).toHaveLength(4)
    expect(educationSeeds).toHaveLength(2)
  })

  it('groups skills into the Stack categories, including AI', () => {
    const countBy = (category: string) => skillSeeds.filter(s => s.category === category).length
    expect(countBy('language')).toBe(2)
    expect(countBy('frontend')).toBe(8)
    expect(countBy('backend')).toBe(4)
    expect(countBy('web3')).toBe(1)
    expect(countBy('workflow')).toBe(6)
    expect(countBy('ai')).toBe(5)
    expect(skillSeeds).toHaveLength(26)
  })

  it('uses unique project slugs', () => {
    const slugs = projectSeeds.map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('maps placeholder links to a null liveUrl', () => {
    expect(projectSeeds.filter(p => p.liveUrl === null)).toHaveLength(5)
  })

  it('classifies company projects as professional', () => {
    const professional = projectSeeds.filter(p => p.category === 'professional').map(p => p.title)
    expect(professional).toEqual(professionalTitles)
  })

  it('keeps only the current job open-ended', () => {
    const ongoing = experienceSeeds
      .filter(experience => experience.positions.some(position => position.endDate === null))
      .map(experience => experience.company)
    expect(ongoing).toEqual(['PT Telto Telematis Indonesia'])
  })

  it('tags every position with its tech stack', () => {
    const positions = experienceSeeds.flatMap(experience => experience.positions)
    expect(positions).toHaveLength(4)
    positions.forEach(position => expect(position.techStack?.length).toBeGreaterThan(0))
  })
})
