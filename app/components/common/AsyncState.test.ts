import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import type { AsyncDataRequestStatus } from '#app'
import { h } from 'vue'
import AsyncState from './AsyncState.vue'

interface StateProps {
  status: AsyncDataRequestStatus
  error: unknown
  isEmpty?: boolean
}

const mountState = (props: StateProps) => mountSuspended(AsyncState, {
  props: { emptyText: 'No projects yet.', ...props },
  slots: { default: () => h('p', { class: 'content' }, 'Loaded content') },
})

describe('AsyncState', () => {
  it('renders the content once data is loaded', async () => {
    const wrapper = await mountState({ status: 'success', error: null })

    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('offers a retry when loading failed', async () => {
    const wrapper = await mountState({ status: 'error', error: new Error('boom') })

    const retry = wrapper.find('button')
    expect(retry.text()).toContain('Try again')
    await retry.trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
    expect(wrapper.find('.content').exists()).toBe(false)
  })

  it('shows the empty text instead of the content for an empty collection', async () => {
    const wrapper = await mountState({ status: 'success', error: null, isEmpty: true })

    expect(wrapper.text()).toContain('No projects yet.')
    expect(wrapper.find('.content').exists()).toBe(false)
  })

  it('shows a skeleton while pending', async () => {
    const wrapper = await mountState({ status: 'pending', error: null })

    expect(wrapper.find('[data-slot="skeleton"]').exists()).toBe(true)
    expect(wrapper.find('.content').exists()).toBe(false)
  })
})
