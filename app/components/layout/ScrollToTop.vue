<script setup lang="ts">
import { usePreferredReducedMotion, useWindowScroll } from '@vueuse/core'

const { y: scrollY } = useWindowScroll()
const reducedMotion = usePreferredReducedMotion()
const isVisible = computed(() => scrollY.value > 400)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: reducedMotion.value === 'reduce' ? 'auto' : 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    enter-from-class="translate-y-4 opacity-0"
    leave-active-class="transition duration-200"
    leave-to-class="translate-y-4 opacity-0"
  >
    <Button
      v-if="isVisible"
      size="icon"
      aria-label="Scroll to top"
      class="fixed right-5 bottom-5 z-40 rounded-full bg-brand-strong text-white shadow-lg hover:bg-brand-hover"
      @click="scrollToTop"
    >
      <Icon name="lucide:arrow-up" />
    </Button>
  </Transition>
</template>
