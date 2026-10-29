import { fileURLToPath } from 'node:url'
import { $fetch, fetch, setup } from '@nuxt/test-utils/e2e'
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, describe, expect, it } from 'vitest'
import { seedDatabase } from '../../scripts/seed-database'

const mongod = await MongoMemoryServer.create()
const client = await MongoClient.connect(mongod.getUri())
await seedDatabase(client.db('test'))

await setup({
  rootDir: fileURLToPath(new URL('../..', import.meta.url)),
  server: true,
  env: {
    NUXT_MONGODB_URI: mongod.getUri(),
    NUXT_MONGODB_DB_NAME: 'test',
    NUXT_PUBLIC_SITE_URL: 'https://portfolio.example.com',
  },
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

describe('seo', () => {
  it('server-renders the projects page with its title, Open Graph image and content', async () => {
    const html = await $fetch<string>('/project')

    expect(html).toContain('<title>Projects · Rofiqur Rohman</title>')
    expect(html).toMatch(/property="og:image"[^>]*og-image\.png/)
    expect(html).toContain('Chainfund')
  })

  it('describes the owner as a schema.org Person on the home page', async () => {
    const html = await $fetch<string>('/')

    expect(html).toContain('application/ld+json')
    expect(html).toContain('"Person"')
    expect(html).toContain('Rofiqur Rohman')
  })

  it('redirects unknown paths to the home page', async () => {
    const response = await fetch('/does-not-exist', { redirect: 'manual' })

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toBe('/')
  })

  it('lists every page in the sitemap', async () => {
    const sitemap = await $fetch<string>('/sitemap.xml')

    expect(sitemap).toContain('/resume')
    expect(sitemap).toContain('/project')
  })
})
