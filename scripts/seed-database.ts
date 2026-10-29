import type { AnyBulkWriteOperation, Db, Document, Filter } from 'mongodb'
import { COLLECTIONS, type CollectionKey } from '../shared/constants/collections'
import { educationInputSchema } from '../shared/schemas/education'
import { experienceInputSchema } from '../shared/schemas/experience'
import { profileInputSchema } from '../shared/schemas/profile'
import { projectInputSchema } from '../shared/schemas/project'
import { skillInputSchema } from '../shared/schemas/skill'
import { educationSeeds, experienceSeeds, profileSeed, projectSeeds, skillSeeds } from './seed-data'

export type SeedSummary = Record<CollectionKey, { upserted: number, modified: number }>

function upsertOperations<T extends Document>(
  records: T[],
  naturalKey: (record: T) => Filter<Document>,
  now: Date,
): AnyBulkWriteOperation[] {
  return records.map(record => ({
    updateOne: {
      filter: naturalKey(record),
      update: { $set: { ...record, updatedAt: now }, $setOnInsert: { createdAt: now } },
      upsert: true,
    },
  }))
}

async function upsertAll<T extends Document>(
  db: Db,
  collectionName: string,
  records: T[],
  naturalKey: (record: T) => Filter<Document>,
  now: Date,
) {
  const result = await db.collection(collectionName).bulkWrite(upsertOperations(records, naturalKey, now))
  return { upserted: result.upsertedCount, modified: result.modifiedCount }
}

/** Upserts every seed record by its natural key, so running it twice is safe. */
export async function seedDatabase(db: Db, now: Date = new Date()): Promise<SeedSummary> {
  const profile = profileInputSchema.parse(profileSeed)
  const projects = projectSeeds.map(seed => projectInputSchema.parse(seed))
  const experiences = experienceSeeds.map(seed => experienceInputSchema.parse(seed))
  const educations = educationSeeds.map(seed => educationInputSchema.parse(seed))
  const skills = skillSeeds.map(seed => skillInputSchema.parse(seed))

  const summary: SeedSummary = {
    profile: await upsertAll(db, COLLECTIONS.profile, [profile], () => ({}), now),
    projects: await upsertAll(db, COLLECTIONS.projects, projects, p => ({ slug: p.slug }), now),
    experiences: await upsertAll(db, COLLECTIONS.experiences, experiences, e => ({ company: e.company }), now),
    educations: await upsertAll(db, COLLECTIONS.educations, educations, e => ({ institution: e.institution }), now),
    skills: await upsertAll(db, COLLECTIONS.skills, skills, s => ({ name: s.name }), now),
  }

  await db.collection(COLLECTIONS.projects).createIndex({ slug: 1 }, { unique: true })
  for (const name of [COLLECTIONS.projects, COLLECTIONS.experiences, COLLECTIONS.educations, COLLECTIONS.skills]) {
    await db.collection(name).createIndex({ sortOrder: 1 })
  }

  return summary
}
