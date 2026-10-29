<script setup lang="ts">
import type { IntrinsicElementAttributes } from 'vue'

withDefaults(defineProps<{
  /** Delay in seconds, used to stagger siblings. */
  delay?: number
  as?: keyof IntrinsicElementAttributes
  /**
   * For content visible on first load: animate with CSS only, so it shows up at
   * first paint instead of staying hidden until JavaScript hydrates the page.
   */
  immediate?: boolean
}>(), {
  delay: 0,
  as: 'div',
  immediate: false,
})
</script>

<template>
  <component
    :is="as"
    v-if="immediate"
    class="reveal-now"
    :style="{ '--reveal-delay': `${delay}s` }"
  >
    <slot />
  </component>
  <Motion
    v-else
    :as="as"
    :initial="{ opacity: 0, y: 24 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true, amount: 0.2 }"
    :transition="{ duration: 0.5, ease: 'easeOut', delay }"
  >
    <slot />
  </Motion>
</template>
