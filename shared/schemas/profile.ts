import { z } from 'zod'
import { idSchema, locationSchema } from './common'

export const socialPlatformSchema = z.enum(['github', 'linkedin', 'instagram'])

export const socialLinkSchema = z.object({
  platform: socialPlatformSchema,
  url: z.url(),
  icon: z.string().min(1),
})

export const profileSchema = z.object({
  id: idSchema,
  fullName: z.string().min(1),
  roles: z.array(z.string().min(1)).min(1),
  bio: z.array(z.string().min(1)).min(1),
  location: locationSchema,
  activities: z.array(z.string().min(1)),
  quote: z.string(),
  socialLinks: z.array(socialLinkSchema),
  githubUsername: z.string().min(1),
  resumeUrl: z.string().min(1),
})

export const profileInputSchema = profileSchema.omit({ id: true })

export type SocialPlatform = z.infer<typeof socialPlatformSchema>
export type SocialLink = z.infer<typeof socialLinkSchema>
export type Profile = z.infer<typeof profileSchema>
export type ProfileInput = z.infer<typeof profileInputSchema>
