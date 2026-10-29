import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import RevealOnScroll from './RevealOnScroll.vue'

const slots = { default: () => h('p', 'Above the fold') }

describe('RevealOnScroll', () => {
  it('uses a CSS-only entrance for above-the-fold content so it never waits for JavaScript', async () => {
    const wrapper = await mountSuspended(RevealOnScroll, { props: { immediate: true, delay: 0.2 }, slots })

    const root = wrapper.find('div')
    expect(root.classes()).toContain('reveal-now')
    expect(root.attributes('style')).toContain('--reveal-delay: 0.2s')
    expect(root.attributes('style') ?? '').not.toContain('opacity')
  })

  it('renders the requested element', async () => {
    const wrapper = await mountSuspended(RevealOnScroll, { props: { immediate: true, as: 'li' }, slots })

    expect(wrapper.find('li.reveal-now').exists()).toBe(true)
  })
})
