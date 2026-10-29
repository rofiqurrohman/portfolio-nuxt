<script setup lang="ts">
const props = defineProps<{ words: string[] }>()

const { text } = useTypewriter(() => props.words, { deleteSpeed: 50 })
</script>

<template>
  <p class="text-[1.4em] font-medium text-[#be6adf] md:text-[2.2em] md:font-semibold">
    <span class="sr-only">{{ words.join(', ') }}</span>
    <span aria-hidden="true">{{ text }}</span>
    <span
      aria-hidden="true"
      class="typewriter-cursor ml-0.5 text-[#b562d6] max-md:hidden"
    >|</span>
  </p>
</template>
