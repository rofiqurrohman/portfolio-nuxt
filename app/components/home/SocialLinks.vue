<script setup lang="ts">
import type { SocialLink } from '#shared/schemas/profile'

withDefaults(defineProps<{
  links: SocialLink[]
  /** `circle`: white round buttons on the home page, `plain`: white icons in the footer. */
  variant?: 'circle' | 'plain'
}>(), {
  variant: 'circle',
})

const PLATFORM_LABELS: Record<SocialLink['platform'], string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
}
</script>

<template>
  <ul
    class="flex items-center justify-center"
    :class="variant === 'circle' ? 'gap-8 pt-4' : 'gap-6'"
  >
    <li
      v-for="link in links"
      :key="link.platform"
    >
      <a
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="PLATFORM_LABELS[link.platform]"
        :class="variant === 'circle'
          ? 'social-circle relative flex size-10 items-center justify-center rounded-full bg-white text-[#700c86] transition duration-500 hover:text-[#87209e] hover:shadow-[0_0_5px_#87209e]'
          : 'text-white transition hover:text-imp'"
      >
        <Icon :name="link.icon" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
/* Purple ring that grows on hover, as on the legacy site. */
.social-circle::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 9999px;
  background: #68187a;
  transform: scale(0.9);
  transition: 0.5s;
}

.social-circle:hover::before {
  transform: scale(1.1);
  box-shadow: 0 0 15px #801f95;
}
</style>
