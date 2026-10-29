import type { ContributionCalendar } from '#shared/schemas/github'
import type { Education } from '#shared/schemas/education'
import type { Experience } from '#shared/schemas/experience'
import type { Profile } from '#shared/schemas/profile'
import type { Project } from '#shared/schemas/project'
import type { Skill } from '#shared/schemas/skill'

// One composable per API resource. The key lets pages share a single request
// (and the SSR payload) when several components ask for the same data.

export const useProfile = () => useFetch<Profile>('/api/profile', { key: 'profile' })

export const useProjects = () => useFetch<Project[]>('/api/projects', { key: 'projects' })

export const useExperiences = () => useFetch<Experience[]>('/api/experiences', { key: 'experiences' })

export const useEducations = () => useFetch<Education[]>('/api/educations', { key: 'educations' })

export const useSkills = () => useFetch<Skill[]>('/api/skills', { key: 'skills' })

export const useGithubContributions = () =>
  useFetch<ContributionCalendar>('/api/github-contributions', { key: 'github-contributions' })
