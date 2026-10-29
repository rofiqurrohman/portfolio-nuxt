export const COLLECTIONS = {
  profile: 'profile',
  projects: 'projects',
  experiences: 'experiences',
  educations: 'educations',
  skills: 'skills',
} as const

export type CollectionKey = keyof typeof COLLECTIONS
