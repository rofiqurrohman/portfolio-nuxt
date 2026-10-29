<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { GITHUB_PROFILE_URL, NAV_ITEMS } from './nav-items'

const { y: scrollY } = useWindowScroll()
const isScrolled = computed(() => scrollY.value >= 20)
const isMenuOpen = ref(false)

const route = useRoute()
const isCurrent = (to: string) => route.path === to

watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out"
    :class="isScrolled
      ? 'bg-nav shadow-[0_10px_10px_0_rgb(9_5_29/0.171)] backdrop-blur-[15px]'
      : 'max-md:bg-nav-mobile'"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-8 py-2 max-md:py-4">
      <NuxtLink
        to="/"
        class="text-xl text-brand"
      >
        Rofiqur Rohman
      </NuxtLink>

      <div class="flex items-center gap-2 max-md:hidden">
        <nav
          aria-label="Main"
          class="flex items-center gap-5 text-lg"
        >
          <NuxtLink
            v-for="item in NAV_ITEMS"
            :key="item.to"
            :to="item.to"
            :aria-current="isCurrent(item.to) ? 'page' : undefined"
            class="group relative z-10 inline-flex flex-col px-4 py-3 text-white"
          >
            <span class="inline-flex items-center gap-1.5">
              <Icon
                :name="item.icon"
                class="size-4"
              />
              {{ item.label }}
            </span>
            <span
              aria-hidden="true"
              class="relative -z-10 -mt-1 block h-1.5 w-0 rounded-2xl bg-[#c95bf5] transition-all duration-300 ease-out group-hover:w-full"
            />
          </NuxtLink>
        </nav>
        <Button
          as="a"
          :href="GITHUB_PROFILE_URL"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          class="ml-5 bg-secondary text-white transition hover:-translate-y-0.5 hover:bg-accent"
        >
          <Icon name="lucide:git-fork" />
          <Icon name="lucide:star" />
        </Button>
      </div>

      <Sheet v-model:open="isMenuOpen">
        <SheetTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="text-[#be50f4] md:hidden"
            aria-label="Open menu"
          >
            <Icon
              name="lucide:menu"
              class="size-7!"
            />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          class="border-l-border bg-nav-mobile text-white"
        >
          <SheetTitle class="sr-only">
            Navigation
          </SheetTitle>
          <nav
            aria-label="Mobile"
            class="mt-12 flex flex-col gap-2 px-6 text-xl"
          >
            <NuxtLink
              v-for="item in NAV_ITEMS"
              :key="item.to"
              :to="item.to"
              :aria-current="isCurrent(item.to) ? 'page' : undefined"
              class="inline-flex items-center gap-2 rounded-md px-3 py-3 aria-[current=page]:bg-muted"
            >
              <Icon :name="item.icon" />
              {{ item.label }}
            </NuxtLink>
            <a
              :href="GITHUB_PROFILE_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-md px-3 py-3"
            >
              <Icon name="simple-icons:github" />
              GitHub
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </header>
</template>
