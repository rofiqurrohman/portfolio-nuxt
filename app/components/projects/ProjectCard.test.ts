import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { Project } from '#shared/schemas/project'
import ProjectCard from './ProjectCard.vue'

const baseProject: Project = {
  id: '1',
  title: 'Fleet Uzzeet',
  slug: 'fleet-uzzeet',
  summary: 'Fleet Uzzeet adalah web app dari perusahaan untuk melacak dan memantau kendaraan.',
  imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1/fleet.png',
  category: 'professional',
  liveUrl: null,
  techStack: [],
  sortOrder: 1,
}

const findViewSite = (wrapper: VueWrapper) =>
  wrapper.findAll('a').find(link => link.text().includes('View Site'))

describe('ProjectCard', () => {
  it('marks a company project without a public link', async () => {
    const wrapper = await mountSuspended(ProjectCard, { props: { project: baseProject } })

    expect(wrapper.text()).toContain('Company Project')
    expect(findViewSite(wrapper)).toBeUndefined()
  })

  it('links a personal project to its live site', async () => {
    const project: Project = { ...baseProject, category: 'personal', liveUrl: 'https://paydrip.vercel.app/' }
    const wrapper = await mountSuspended(ProjectCard, { props: { project } })

    const viewSite = findViewSite(wrapper)
    expect(viewSite?.attributes('href')).toBe('https://paydrip.vercel.app/')
    expect(viewSite?.attributes('rel')).toBe('noopener noreferrer')
    expect(wrapper.text()).not.toContain('Company Project')
  })

  it('shows both the badge and the link for a public company project', async () => {
    const project: Project = { ...baseProject, liveUrl: 'https://hargajateng.org/' }
    const wrapper = await mountSuspended(ProjectCard, { props: { project } })

    expect(wrapper.text()).toContain('Company Project')
    expect(findViewSite(wrapper)?.attributes('href')).toBe('https://hargajateng.org/')
  })
})
