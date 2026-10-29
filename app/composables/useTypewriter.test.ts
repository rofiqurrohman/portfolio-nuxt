import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, type Ref } from 'vue'
import { useTypewriter } from './useTypewriter'

const WORD = 'Software Developer'

async function mountTypewriter(words: string[]) {
  let text!: Ref<string>
  const Harness = defineComponent({
    setup() {
      text = useTypewriter(words, { typeSpeed: 10, deleteSpeed: 5, pauseMs: 100 }).text
      return () => h('span', text.value)
    },
  })
  const wrapper = await mountSuspended(Harness)
  return { wrapper, text }
}

function mockReducedMotion(isReduced: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: isReduced && query.includes('prefers-reduced-motion: reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('starts with the full first word so the server-rendered text is readable', async () => {
    mockReducedMotion(false)
    const { text } = await mountTypewriter([WORD])

    expect(text.value).toBe(WORD)
  })

  it('deletes and retypes the word in a loop', async () => {
    mockReducedMotion(false)
    const { text } = await mountTypewriter([WORD])

    // pause, then one character removed every 5ms
    await vi.advanceTimersByTimeAsync(100 + (WORD.length - 1) * 5 + 1)
    expect(text.value).toBe('')

    // one character typed every 10ms
    await vi.advanceTimersByTimeAsync(WORD.length * 10)
    expect(text.value).toBe(WORD)
  })

  it('keeps the first word static when the visitor prefers reduced motion', async () => {
    mockReducedMotion(true)
    const { text } = await mountTypewriter([WORD, 'Frontend Developer'])

    await vi.advanceTimersByTimeAsync(10_000)

    expect(text.value).toBe(WORD)
  })

  it('stops its timers when unmounted', async () => {
    mockReducedMotion(false)
    const { wrapper } = await mountTypewriter([WORD])

    wrapper.unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
