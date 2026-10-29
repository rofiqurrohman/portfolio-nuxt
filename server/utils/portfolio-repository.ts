import type { Db } from 'mongodb'
import { ZodError, type ZodType } from 'zod'
import { COLLECTIONS } from '../../shared/constants/collections'
import { educationSchema, type Education } from '../../shared/schemas/education'
import { experienceSchema, type Experience } from '../../shared/schemas/experience'
import { profileSchema, type Profile } from '../../shared/schemas/profile'
import { projectSchema, type Project } from '../../shared/schemas/project'
import { skillSchema, type Skill } from '../../shared/schemas/skill'
import { toDto } from './to-dto'

/**
 * Content is edited by hand in Atlas, so one malformed document must not take
 * the whole page down: it is skipped and reported in the server log instead.
 */
async function findAllValid<T>(db: Db, collectionName: string, schema: ZodType<T>): Promise<T[]> {
  const documents = await db.collection(collectionName).find().sort({ sortOrder: 1 }).toArray()

  return documents.flatMap((doc) => {
    try {
      return [toDto(doc, schema)]
    }
    catch (error) {
      if (!(error instanceof ZodError)) throw error
      console.warn('[portfolio] invalid document skipped', {
        collection: collectionName,
        id: doc._id.toHexString(),
        issues: error.issues,
      })
      return []
    }
  })
}

export async function findProfile(db: Db): Promise<Profile | null> {
  const doc = await db.collection(COLLECTIONS.profile).findOne()
  return doc ? toDto(doc, profileSchema) : null
}

export function findProjects(db: Db): Promise<Project[]> {
  return findAllValid(db, COLLECTIONS.projects, projectSchema)
}

export function findExperiences(db: Db): Promise<Experience[]> {
  return findAllValid(db, COLLECTIONS.experiences, experienceSchema)
}

export function findEducations(db: Db): Promise<Education[]> {
  return findAllValid(db, COLLECTIONS.educations, educationSchema)
}

export function findSkills(db: Db): Promise<Skill[]> {
  return findAllValid(db, COLLECTIONS.skills, skillSchema)
}
