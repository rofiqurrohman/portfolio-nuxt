<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app'

const props = withDefaults(defineProps<{
  status: AsyncDataRequestStatus
  error: unknown
  isEmpty?: boolean
  emptyText?: string
  errorText?: string
}>(), {
  isEmpty: false,
  emptyText: 'Nothing here yet.',
  errorText: 'Something went wrong while loading this section.',
})

defineEmits<{ retry: [] }>()

const isLoading = computed(() => props.status === 'pending' || props.status === 'idle')
</script>

<template>
  <div
    v-if="error"
    role="alert"
    class="flex flex-col items-center gap-3 py-10 text-center text-white"
  >
    <p>{{ errorText }}</p>
    <Button
      class="bg-brand-strong text-white hover:bg-brand-hover"
      @click="$emit('retry')"
    >
      <Icon name="lucide:refresh-cw" />
      Try again
    </Button>
  </div>
  <slot
    v-else-if="isLoading"
    name="loading"
  >
    <div
      class="grid gap-4 py-6"
      aria-busy="true"
    >
      <Skeleton class="h-6 w-2/3" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-5/6" />
    </div>
  </slot>
  <p
    v-else-if="isEmpty"
    class="py-10 text-center text-muted-foreground"
  >
    {{ emptyText }}
  </p>
  <slot v-else />
</template>
