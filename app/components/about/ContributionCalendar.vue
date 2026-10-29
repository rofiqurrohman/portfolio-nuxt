<script setup lang="ts">
import type { ContributionCalendar, ContributionDay } from '#shared/schemas/github'

const props = defineProps<{ calendar: ContributionCalendar }>()

const dayLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })

const describeDay = (day: ContributionDay) => {
  const noun = day.count === 1 ? 'contribution' : 'contributions'
  return `${day.count} ${noun} on ${dayLabel.format(new Date(`${day.date}T00:00:00Z`))}`
}

// A month label sits above the first week that starts in that month, unless the
// previous label is too close (e.g. a partial first week) and would overlap.
const MIN_WEEKS_BETWEEN_LABELS = 3

const monthLabels = computed(() => {
  let lastLabelIndex = -MIN_WEEKS_BETWEEN_LABELS
  return props.calendar.weeks.map((week, index) => {
    const firstDay = week.days[0]
    if (!firstDay) return ''
    const month = firstDay.date.slice(0, 7)
    const previousMonth = props.calendar.weeks[index - 1]?.days[0]?.date.slice(0, 7)
    if (month === previousMonth || index - lastLabelIndex < MIN_WEEKS_BETWEEN_LABELS) return ''
    lastLabelIndex = index
    return monthLabel.format(new Date(`${firstDay.date}T00:00:00Z`))
  })
})

const hoveredDay = ref<ContributionDay | null>(null)
</script>

<template>
  <figure class="mx-auto w-fit max-w-full pb-10">
    <div class="overflow-x-auto pb-2">
      <div
        class="flex gap-[3px]"
        role="img"
        :aria-label="`${calendar.totalContributions} contributions in the last year`"
      >
        <div
          v-for="(week, weekIndex) in calendar.weeks"
          :key="week.days[0]?.date ?? weekIndex"
          class="flex flex-col gap-[3px]"
        >
          <span
            aria-hidden="true"
            class="h-4 text-[10px] leading-4 whitespace-nowrap text-muted-foreground"
          >{{ monthLabels[weekIndex] }}</span>
          <span
            v-for="day in week.days"
            :key="day.date"
            :data-contribution-day="day.date"
            :title="describeDay(day)"
            class="contribution-cell size-[11px] rounded-[2px]"
            :class="`level-${day.level}`"
            @mouseenter="hoveredDay = day"
            @mouseleave="hoveredDay = null"
          />
        </div>
      </div>
    </div>
    <figcaption class="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm text-muted-foreground">
      <span aria-live="polite">
        {{ hoveredDay ? describeDay(hoveredDay) : `${calendar.totalContributions} contributions in the last year` }}
      </span>
      <span
        aria-hidden="true"
        class="flex items-center gap-1"
      >
        Less
        <span
          v-for="level in 5"
          :key="level"
          class="contribution-cell size-[11px] rounded-[2px]"
          :class="`level-${level - 1}`"
        />
        More
      </span>
    </figcaption>
  </figure>
</template>

<style scoped>
.contribution-cell {
  transition: transform 150ms ease;
}

.contribution-cell:hover {
  transform: scale(1.3);
}

.level-0 { background: rgb(255 255 255 / 0.07); }
.level-1 { background: rgb(199 112 240 / 0.3); }
.level-2 { background: rgb(199 112 240 / 0.55); }
.level-3 { background: rgb(199 112 240 / 0.8); }
.level-4 { background: #c770f0; }

@media (prefers-reduced-motion: reduce) {
  .contribution-cell:hover {
    transform: none;
  }
}
</style>
