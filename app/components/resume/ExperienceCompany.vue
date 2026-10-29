<script setup lang="ts">
import type { Experience } from '#shared/schemas/experience'

const props = defineProps<{ experience: Experience }>()

const positionKey = (index: number) => `position-${index}`

const isOngoing = computed(() => props.experience.positions.some(position => position.endDate === null))

// Ongoing positions start expanded; finished ones stay collapsed until opened.
const openPositions = computed(() => props.experience.positions
  .flatMap((position, index) => (position.endDate === null ? [positionKey(index)] : [])))

const locationLabel = computed(() => {
  const { location, workMode } = props.experience
  return workMode ? `${formatLocation(location)} (${formatWorkMode(workMode)})` : formatLocation(location)
})
</script>

<template>
  <article class="py-4">
    <header class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <div class="flex items-center gap-3">
        <span class="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[rgb(200_137_230/0.3)] bg-[rgb(82_52_121/0.35)]">
          <img
            v-if="experience.logoUrl"
            :src="experience.logoUrl"
            :alt="`${experience.company} logo`"
            class="size-full object-cover"
            width="28"
            height="28"
            loading="lazy"
          >
          <Icon
            v-else
            name="lucide:building-2"
            class="size-4 text-imp"
          />
        </span>
        <h3 class="text-xl font-semibold">
          <a
            v-if="experience.companyUrl"
            :href="experience.companyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="underline-offset-4 hover:text-imp hover:underline"
          >{{ experience.company }}</a>
          <template v-else>
            {{ experience.company }}
          </template>
        </h3>
      </div>
      <p class="flex items-center gap-2 text-sm text-muted-foreground">
        {{ locationLabel }}
        <span
          v-if="isOngoing"
          data-current-indicator
          class="relative flex size-2.5"
          role="img"
          aria-label="Current position"
        >
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-imp opacity-60 motion-reduce:animate-none" />
          <span class="relative inline-flex size-2.5 rounded-full bg-imp" />
        </span>
      </p>
    </header>

    <Accordion
      type="multiple"
      :default-value="openPositions"
      class="mt-3 ml-3.5 border-l border-dashed border-[rgb(200_137_230/0.35)]"
    >
      <AccordionItem
        v-for="(position, index) in experience.positions"
        :key="positionKey(index)"
        :value="positionKey(index)"
        data-position
        class="relative border-0 pl-7"
      >
        <span
          aria-hidden="true"
          class="absolute top-3.5 -left-3.5 flex size-7 items-center justify-center rounded-md border border-[rgb(200_137_230/0.3)] bg-[rgb(27_20_41)]"
        >
          <Icon
            name="lucide:code-xml"
            class="size-4 text-imp"
          />
        </span>
        <AccordionTrigger class="py-3 text-base hover:no-underline [&_[data-slot=accordion-trigger-icon]]:mt-1 [&_[data-slot=accordion-trigger-icon]]:text-imp">
          <span class="flex flex-col gap-1">
            <span class="font-semibold">{{ position.title }}</span>
            <span
              data-position-meta
              class="flex flex-wrap items-center text-sm font-normal text-muted-foreground"
            >
              <span>{{ formatEmploymentType(position.employmentType) }}</span>
              <span class="ml-2 border-l border-[rgb(200_137_230/0.35)] pl-2">{{ formatPeriod(position.startDate, position.endDate) }}</span>
              <span class="ml-2 border-l border-[rgb(200_137_230/0.35)] pl-2">{{ formatDuration(position.startDate, position.endDate) }}</span>
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent class="pb-4 text-[0.95rem]">
          <ul
            v-if="position.highlights.length"
            class="list-disc space-y-1.5 pl-5 marker:text-imp"
          >
            <li
              v-for="highlight in position.highlights"
              :key="highlight"
            >
              {{ highlight }}
            </li>
          </ul>

          <div
            v-for="project in position.projects"
            :key="project.name"
            class="pt-4"
          >
            <p class="pb-2 font-medium">
              In-house Project:
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="underline underline-offset-4 hover:text-imp"
              >{{ project.name }}</a>
              <template v-else>
                {{ project.name }}
              </template>
            </p>
            <ul
              v-if="project.highlights.length"
              class="list-disc space-y-1.5 pl-5 marker:text-imp"
            >
              <li
                v-for="highlight in project.highlights"
                :key="highlight"
              >
                {{ highlight }}
              </li>
            </ul>
          </div>

          <ul
            v-if="position.techStack.length"
            class="flex flex-wrap gap-2 pt-4"
            aria-label="Tech stack"
          >
            <li
              v-for="tech in position.techStack"
              :key="tech"
              data-tech-chip
              class="rounded-md border border-[rgb(200_137_230/0.3)] bg-[rgb(82_52_121/0.25)] px-2 py-0.5 font-mono text-xs"
            >
              {{ tech }}
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </article>
</template>
