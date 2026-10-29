<script setup lang="ts">
import type { Project } from '#shared/schemas/project'

defineProps<{ project: Project }>()
</script>

<template>
  <Card class="h-full gap-0 overflow-hidden rounded-md border-0 bg-transparent py-0 text-white shadow-[0_4px_5px_3px_rgb(119_53_136/0.459)] ring-0 transition duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_4px_4px_5px_rgb(129_72_144/0.561)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">
    <img
      :src="project.imageUrl"
      :alt="`Screenshot of ${project.title}`"
      class="aspect-[16/10] w-full rounded-[10px] object-cover p-5 opacity-80"
      width="640"
      height="400"
      loading="lazy"
    >
    <CardContent class="flex flex-1 flex-col gap-4 px-5 pb-6">
      <div class="flex-1">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <CardTitle class="text-xl font-semibold">
            {{ project.title }}
          </CardTitle>
          <Badge
            v-if="project.category === 'professional'"
            class="shrink-0 bg-secondary text-white"
          >
            Company Project
          </Badge>
        </div>
        <p class="pt-3 text-justify leading-relaxed">
          {{ project.summary }}
        </p>
      </div>
      <div v-if="project.liveUrl">
        <Button
          as="a"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-brand-strong text-white hover:bg-brand-hover"
        >
          <Icon name="lucide:external-link" />
          View Site
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
