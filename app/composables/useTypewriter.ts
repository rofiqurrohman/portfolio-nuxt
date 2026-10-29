import { onBeforeUnmount, onMounted, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue'

export interface TypewriterOptions {
  /** Milliseconds per typed character. */
  typeSpeed?: number
  /** Milliseconds per deleted character. */
  deleteSpeed?: number
  /** Milliseconds a finished word stays on screen. */
  pauseMs?: number
}

/**
 * Cycles through `words`, typing and deleting them. It starts with the first
 * word fully written, so the server-rendered HTML is meaningful, and stays
 * static for visitors who prefer reduced motion.
 */
export function useTypewriter(words: MaybeRefOrGetter<string[]>, options: TypewriterOptions = {}): { text: Ref<string> } {
  const { typeSpeed = 100, deleteSpeed = 50, pauseMs = 1500 } = options
  const text = ref(toValue(words)[0] ?? '')

  let timer: ReturnType<typeof setTimeout> | undefined
  let wordIndex = 0

  const schedule = (step: () => void, delay: number) => {
    timer = setTimeout(step, delay)
  }

  const currentWord = () => toValue(words)[wordIndex] ?? ''

  function deleteNext() {
    text.value = text.value.slice(0, -1)
    if (text.value.length > 0) return schedule(deleteNext, deleteSpeed)
    wordIndex = (wordIndex + 1) % Math.max(toValue(words).length, 1)
    schedule(typeNext, typeSpeed)
  }

  function typeNext() {
    const word = currentWord()
    text.value = word.slice(0, text.value.length + 1)
    if (text.value.length < word.length) return schedule(typeNext, typeSpeed)
    schedule(deleteNext, pauseMs)
  }

  onMounted(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !text.value) return
    schedule(deleteNext, pauseMs)
  })

  onBeforeUnmount(() => clearTimeout(timer))

  return { text }
}
