<script setup lang="ts">
import type { Profile } from '#shared/schemas/profile'

defineProps<{ profile: Profile }>()
</script>

<template>
  <blockquote class="text-justify text-white">
    <p
      v-for="paragraph in profile.bio"
      :key="paragraph"
      class="pb-3"
    >
      {{ paragraph }}
    </p>
    <p class="pt-3">
      Apart from coding, some other activities that I love to do!
    </p>
    <ul class="py-3">
      <li
        v-for="activity in profile.activities"
        :key="activity"
        class="flex items-center gap-2 py-0.5"
      >
        <Icon
          name="lucide:hand"
          class="rotate-90 text-imp"
        />
        {{ activity }}
      </li>
    </ul>
    <p class="pt-2 text-[rgb(155_126_172)]">
      "{{ profile.quote }}"
    </p>
    <footer class="pt-1 text-sm text-[#a588c0]">
      — {{ profile.fullName }}
    </footer>
  </blockquote>
</template>
