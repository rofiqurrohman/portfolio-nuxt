import type { Db } from 'mongodb'
import { getDb } from './mongo'

/**
 * Runs a repository query and hides database failures behind a generic 500,
 * keeping the real cause in the server log only.
 */
export async function loadResource<T>(resource: string, query: (db: Db) => Promise<T>): Promise<T> {
  try {
    return await query(await getDb())
  }
  catch (error) {
    console.error(`[portfolio] failed to load ${resource}`, error)
    throw createError({ statusCode: 500, statusMessage: `Failed to load ${resource}` })
  }
}
