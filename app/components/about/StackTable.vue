<script setup lang="ts">
import { SKILL_CATEGORY_LABELS, skillCategorySchema, type Skill } from '#shared/schemas/skill'

const props = defineProps<{ skills: Skill[] }>()

// Categories follow the fixed order of the enum; empty ones are left out.
const rows = computed(() => skillCategorySchema.options
  .map(category => ({
    category,
    label: SKILL_CATEGORY_LABELS[category],
    skills: props.skills
      .filter(skill => skill.category === category)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  }))
  .filter(row => row.skills.length > 0))
</script>

<template>
  <div class="overflow-hidden rounded-md border border-[rgb(200_137_230/0.3)]">
    <RevealOnScroll
      v-for="(row, index) in rows"
      :key="row.category"
      data-stack-row
      class="grid border-[rgb(200_137_230/0.2)] not-first:border-t md:grid-cols-[14rem_1fr]"
      :delay="index * 0.05"
    >
      <div
        data-stack-label
        class="flex items-center gap-3 border-dashed border-[rgb(200_137_230/0.25)] px-4 pt-4 md:border-r md:py-4"
      >
        <span class="font-mono text-sm text-muted-foreground">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="font-medium md:whitespace-nowrap">{{ row.label }}</span>
      </div>
      <ul class="flex flex-wrap content-center items-center gap-2 p-4">
        <li
          v-for="skill in row.skills"
          :key="skill.id"
          data-stack-chip
          class="inline-flex items-center gap-1.5 rounded-md border border-[rgb(200_137_230/0.3)] bg-[rgb(82_52_121/0.25)] px-2.5 py-1 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-imp hover:bg-[rgb(82_52_121/0.45)] motion-reduce:hover:translate-y-0"
        >
          <Icon
            :name="skill.icon"
            class="size-4 shrink-0 opacity-90"
          />
          {{ skill.name }}
        </li>
      </ul>
    </RevealOnScroll>
  </div>
</template>
