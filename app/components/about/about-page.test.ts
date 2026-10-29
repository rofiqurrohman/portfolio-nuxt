import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import AboutPage from '~/pages/about.vue'

const loaded = <T>(data: T) => ({ data: ref(data), status: ref('success'), error: ref(null), refresh: async () => {} })

mockNuxtImport('useProfile', () => () => loaded({
  id: 'p',
  fullName: 'Rofiqur Rohman',
  roles: ['Software Developer'],
  bio: ['Hi everyone, I am Rofiqur Rohman from Indonesia.'],
  location: { country: 'Indonesia' },
  activities: ['Hiking'],
  quote: 'Risk more than other think is safe!',
  socialLinks: [],
  githubUsername: 'rofiqurrohman',
  resumeUrl: '/resume_rofiqurrohman.pdf',
}))

mockNuxtImport('useSkills', () => () => loaded([
  { id: '1', name: 'Vue.js', icon: 'simple-icons:vuedotjs', category: 'frontend', sortOrder: 1 },
  { id: '2', name: 'Claude', icon: 'simple-icons:claude', category: 'ai', sortOrder: 1 },
]))

mockNuxtImport('useGithubContributions', () => () => ({
  data: ref(null),
  status: ref('error'),
  error: ref(new Error('GitHub token is not configured')),
  refresh: async () => {},
}))

describe('about page', () => {
  it('hides the contribution calendar when GitHub data is unavailable', async () => {
    const wrapper = await mountSuspended(AboutPage)

    expect(wrapper.find('#stack-heading').text()).toBe('Stack')
    expect(wrapper.findAll('[data-stack-row]')).toHaveLength(2)
    expect(wrapper.text()).not.toContain('Days I Code')
  })
})
