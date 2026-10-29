import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppNavbar from './AppNavbar.vue'

describe('AppNavbar', () => {
  it('links to every page', async () => {
    const wrapper = await mountSuspended(AppNavbar, { route: '/' })

    const hrefs = wrapper.findAll('nav[aria-label="Main"] a').map(link => link.attributes('href'))

    expect(hrefs).toEqual(['/', '/about', '/project', '/resume'])
  })

  it('marks the current page link', async () => {
    const wrapper = await mountSuspended(AppNavbar, { route: '/' })

    const current = wrapper.find('nav[aria-label="Main"] a[aria-current="page"]')

    expect(current.attributes('href')).toBe('/')
  })
})
