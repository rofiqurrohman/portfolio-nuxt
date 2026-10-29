<script setup lang="ts">
import type { Education } from '#shared/schemas/education'

defineProps<{ education: Education }>()
</script>

<template>
  <article class="py-4">
    <header class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <div class="flex items-center gap-3">
        <span class="flex size-7 shrink-0 items-center justify-center rounded-md border border-[rgb(200_137_230/0.3)] bg-[rgb(82_52_121/0.35)]">
          <Icon
            name="lucide:graduation-cap"
            class="size-4 text-imp"
          />
        </span>
        <h3 class="text-xl font-semibold">
          {{ education.institution }}
        </h3>
      </div>
      <p class="text-sm text-muted-foreground">
        Class of {{ education.graduationYear }}
      </p>
    </header>
    <div class="mt-3 ml-3.5 border-l border-dashed border-[rgb(200_137_230/0.35)] pb-1 pl-7">
      <p class="pt-1 text-muted-foreground">
        {{ education.fieldOfStudy }}
      </p>
      <ul
        v-if="education.highlights.length"
        class="list-disc space-y-1.5 pt-2 pl-5 marker:text-imp"
      >
        <li
          v-for="highlight in education.highlights"
          :key="highlight"
        >
          {{ highlight }}
        </li>
      </ul>
    </div>
  </article>
</template>
