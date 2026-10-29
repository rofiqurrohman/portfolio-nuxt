import { findProfile } from '../utils/portfolio-repository'
import { loadResource } from '../utils/load-resource'

export default defineEventHandler(async () => {
  const profile = await loadResource('profile', findProfile)
  if (!profile) {
    throw createError({ statusCode: 404, statusMessage: 'Profile not found' })
  }
  return profile
})
