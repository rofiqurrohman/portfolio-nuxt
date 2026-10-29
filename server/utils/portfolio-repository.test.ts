import { MongoClient, type Db } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { COLLECTIONS } from '../../shared/constants/collections'
import { findProfile, findProjects, findSkills } from './portfolio-repository'

let mongod: MongoMemoryServer
let client: MongoClient
let db: Db

const project = (title: string, sortOrder: number, overrides: Record<string, unknown> = {}) => ({
  title,
  slug: title.toLowerCase(),
  summary: `${title} summary`,
  imageUrl: `https://example.com/${title.toLowerCase()}.png`,
  category: 'personal',
  liveUrl: null,
  techStack: [],
  sortOrder,
  ...overrides,
})

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = await MongoClient.connect(mongod.getUri())
  db = client.db('test')
})

afterEach(async () => {
  await db.dropDatabase()
  vi.restoreAllMocks()
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

describe('findProjects', () => {
  it('returns projects ordered by sortOrder', async () => {
    await db.collection(COLLECTIONS.projects).insertMany([project('Gamma', 3), project('Alpha', 1), project('Beta', 2)])

    const projects = await findProjects(db)

    expect(projects.map(p => p.sortOrder)).toEqual([1, 2, 3])
  })

  it('skips and logs a document that fails validation', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await db.collection(COLLECTIONS.projects).insertMany([
      project('Alpha', 1),
      project('Broken', 2, { category: 'kantor' }),
      project('Gamma', 3),
    ])

    const projects = await findProjects(db)

    expect(projects.map(p => p.title)).toEqual(['Alpha', 'Gamma'])
    expect(warn).toHaveBeenCalledTimes(1)
  })
})

describe('findProfile', () => {
  it('returns null when the profile document is missing', async () => {
    expect(await findProfile(db)).toBeNull()
  })
})

describe('findSkills', () => {
  it('returns an empty list for an empty collection', async () => {
    expect(await findSkills(db)).toEqual([])
  })
})
