import { fileURLToPath } from 'node:url'
import { $fetch, fetch, setup } from '@nuxt/test-utils/e2e'
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, describe, expect, it } from 'vitest'
import type { Experience } from '../../shared/schemas/experience'
import type { Project } from '../../shared/schemas/project'
import { seedDatabase } from '../../scripts/seed-database'

const mongod = await MongoMemoryServer.create()
const client = await MongoClient.connect(mongod.getUri())
const db = client.db('test')

await setup({
  rootDir: fileURLToPath(new URL('../..', import.meta.url)),
  server: true,
  env: {
    NUXT_MONGODB_URI: mongod.getUri(),
    NUXT_MONGODB_DB_NAME: 'test',
  },
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

describe('portfolio api', () => {
  it('responds 404 for the profile when the database is empty', async () => {
    const response = await fetch('/api/profile')
    expect(response.status).toBe(404)
  })

  it('serves seeded projects without Mongo ids', async () => {
    await seedDatabase(db)

    const projects = await $fetch<Project[]>('/api/projects')

    expect(projects).toHaveLength(13)
    expect(projects[0]?.title).toBe('Chainfund')
    expect(projects[0]).not.toHaveProperty('_id')
  })

  it('serializes experience dates as ISO strings', async () => {
    const experiences = await $fetch<Array<Omit<Experience, 'positions'> & { positions: Array<{ startDate: string, endDate: string | null }> }>>('/api/experiences')
    const currentPosition = experiences[0]?.positions[0]

    expect(experiences[0]?.company).toBe('PT Telto Telematis Indonesia')
    expect(currentPosition?.endDate).toBeNull()
    expect(currentPosition?.startDate).toBe('2022-12-01T00:00:00.000Z')
  })
})
