<script setup lang="ts">
const { data: profile } = await useProfile()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <ParticlesBackground />
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter>
      <template
        v-if="profile"
        #social
      >
        <SocialLinks
          :links="profile.socialLinks"
          variant="plain"
        />
      </template>
    </AppFooter>
    <ScrollToTop />
  </div>
</template>
