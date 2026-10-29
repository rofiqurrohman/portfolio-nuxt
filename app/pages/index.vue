<script setup lang="ts">
import homeBackground from '~/assets/images/home-bg.jpg'

const { data: profile, status, error, refresh } = await useProfile()

usePageSeo({
  title: 'Software Developer',
  description: 'Portfolio of Rofiqur Rohman, a software developer from Indonesia focused on frontend web development.',
})

const siteConfig = useSiteConfig()
useSchemaOrg(computed(() => profile.value
  ? [definePerson({
      name: profile.value.fullName,
      jobTitle: profile.value.roles[0],
      url: siteConfig.url,
      sameAs: profile.value.socialLinks.map(link => link.url),
    })]
  : []))
</script>

<template>
  <section
    class="relative bg-cover bg-top bg-no-repeat py-8"
    :style="{ backgroundImage: `var(--image-gradient), url(${homeBackground})` }"
  >
    <div class="mx-auto max-w-6xl px-4 pt-36 pb-8 text-left text-[whitesmoke]">
      <AsyncState
        :status="status"
        :error="error"
        error-text="Couldn't load the profile right now."
        @retry="refresh()"
      >
        <template v-if="profile">
          <HomeHero
            :full-name="profile.fullName"
            :roles="profile.roles"
          />

          <RevealOnScroll
            as="section"
            class="relative z-10 py-16 text-center text-white"
            aria-labelledby="find-me-heading"
          >
            <h2
              id="find-me-heading"
              class="text-[2em]"
            >
              FIND ME ON
            </h2>
            <p class="pt-2">
              Feel free to <span class="purple">connect</span> with me
            </p>
            <SocialLinks :links="profile.socialLinks" />
          </RevealOnScroll>
        </template>
      </AsyncState>
    </div>
  </section>
</template>
