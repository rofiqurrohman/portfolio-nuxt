import { fetchContributionCalendar } from '../utils/github-contributions'
import { loadResource } from '../utils/load-resource'
import { findProfile } from '../utils/portfolio-repository'

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig(event)
  if (!githubToken) {
    throw createError({ statusCode: 503, statusMessage: 'GitHub token is not configured' })
  }

  const profile = await loadResource('profile', findProfile)
  if (!profile) {
    throw createError({ statusCode: 404, statusMessage: 'Profile not found' })
  }

  try {
    return await fetchContributionCalendar({ username: profile.githubUsername, token: githubToken })
  }
  catch (error) {
    console.error('[portfolio] failed to load GitHub contributions', error)
    throw createError({ statusCode: 502, statusMessage: 'Failed to load GitHub contributions' })
  }
})
