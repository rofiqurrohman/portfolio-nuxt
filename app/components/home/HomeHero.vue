<script setup lang="ts">
import homeIllustration from '~/assets/images/home-main.svg'

defineProps<{
  fullName: string
  roles: string[]
}>()
</script>

<template>
  <div class="grid items-center gap-8 md:grid-cols-12">
    <div class="pt-20 md:col-span-7">
      <RevealOnScroll immediate>
        <h1 class="pb-4 pl-4 text-[2.4em] md:pl-12">
          Hi There!
          <span
            class="wave"
            role="img"
            aria-label="waving hand"
          >👋🏻</span>
        </h1>
      </RevealOnScroll>
      <RevealOnScroll
        immediate
        :delay="0.1"
      >
        <p class="pl-4 text-[2.5em] leading-tight md:pl-11">
          I'M
          <strong class="text-brand uppercase">{{ fullName }}</strong>
        </p>
      </RevealOnScroll>
      <RevealOnScroll
        immediate
        :delay="0.2"
      >
        <div class="min-h-20 p-4 md:p-12">
          <TypewriterText :words="roles" />
        </div>
      </RevealOnScroll>
    </div>
    <RevealOnScroll
      immediate
      :delay="0.2"
      class="pb-5 md:col-span-5"
    >
      <img
        :src="homeIllustration"
        alt="Illustration of a developer working at a desk"
        class="mx-auto max-h-[450px] w-full"
        width="450"
        height="450"
        fetchpriority="high"
      >
    </RevealOnScroll>
  </div>
</template>
