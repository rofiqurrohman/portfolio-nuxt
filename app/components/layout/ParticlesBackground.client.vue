<script setup lang="ts">
import type { Container } from '@tsparticles/engine'
import { usePreferredReducedMotion } from '@vueuse/core'

const CONTAINER_ID = 'tsparticles'

const reducedMotion = usePreferredReducedMotion()

let container: Container | undefined
let isUnmounted = false

// The background is decorative, so the engine is loaded only once the browser
// is idle and never competes with the page content for the first paint.
async function startParticles() {
  const [{ tsParticles }, { loadSlim }] = await Promise.all([
    import('@tsparticles/engine'),
    import('@tsparticles/slim'),
  ])
  await loadSlim(tsParticles)
  if (isUnmounted) return
  container?.destroy()
  container = await tsParticles.load({ id: CONTAINER_ID, options: buildParticlesOptions({ isAnimated: reducedMotion.value !== 'reduce' }) })
}

onMounted(() => {
  const scheduleIdle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1))
  scheduleIdle(() => void startParticles())
})

watch(reducedMotion, () => {
  if (container) void startParticles()
})

onBeforeUnmount(() => {
  isUnmounted = true
  container?.destroy()
})
</script>

<template>
  <div
    :id="CONTAINER_ID"
    aria-hidden="true"
  />
</template>
