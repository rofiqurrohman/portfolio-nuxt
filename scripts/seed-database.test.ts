import { MongoClient, type Db } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { COLLECTIONS } from '../shared/constants/collections'
import { seedDatabase } from './seed-database'

let mongod: MongoMemoryServer
let client: MongoClient
let db: Db

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = await MongoClient.connect(mongod.getUri())
  db = client.db('test')
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

const countAll = async () => ({
  profile: await db.collection(COLLECTIONS.profile).countDocuments(),
  projects: await db.collection(COLLECTIONS.projects).countDocuments(),
  experiences: await db.collection(COLLECTIONS.experiences).countDocuments(),
  educations: await db.collection(COLLECTIONS.educations).countDocuments(),
  skills: await db.collection(COLLECTIONS.skills).countDocuments(),
})

describe('seedDatabase', () => {
  it('is idempotent and keeps createdAt on re-runs', async () => {
    const firstRun = new Date('2026-01-01T00:00:00Z')
    const secondRun = new Date('2026-02-01T00:00:00Z')

    await seedDatabase(db, firstRun)
    const countsAfterFirst = await countAll()
    await seedDatabase(db, secondRun)

    expect(await countAll()).toEqual(countsAfterFirst)
    expect(countsAfterFirst).toEqual({ profile: 1, projects: 13, experiences: 4, educations: 2, skills: 26 })

    const chainfund = await db.collection(COLLECTIONS.projects).findOne({ slug: 'chainfund' })
    expect(chainfund?.createdAt).toEqual(firstRun)
    expect(chainfund?.updatedAt).toEqual(secondRun)
  })

  it('creates a unique index on project slugs', async () => {
    const indexes = await db.collection(COLLECTIONS.projects).indexes()
    const slugIndex = indexes.find(index => index.key.slug === 1)
    expect(slugIndex?.unique).toBe(true)
  })
})
