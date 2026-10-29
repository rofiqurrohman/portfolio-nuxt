<script setup lang="ts">
import aboutIllustration from '~/assets/images/about.png'

// The GitHub contribution calendar is disabled for now; re-enable useGithubContributions()
// here and the "Days I Code" section in the template to bring it back.
const [profileState, skillsState] = await Promise.all([
  useProfile(),
  useSkills(),
])

const { data: profile } = profileState
const { data: skills } = skillsState

usePageSeo({
  title: 'About',
  description:
    'About Rofiqur Rohman — background, skillset, tools, and GitHub activity.',
})
</script>

<template>
  <section class="section-surface relative pt-36 pb-8 text-white">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid items-start gap-8 md:grid-cols-12">
        <div class="pt-8 pb-12 md:col-span-7">
          <RevealOnScroll immediate>
            <h1 class="pb-5 text-[2.1em]">
              Know Who <strong class="purple">I'M</strong>
            </h1>
          </RevealOnScroll>
          <AsyncState
            :status="profileState.status.value"
            :error="profileState.error.value"
            error-text="Couldn't load the profile right now."
            @retry="profileState.refresh()"
          >
            <RevealOnScroll
              v-if="profile"
              immediate
              :delay="0.1"
            >
              <AboutCard :profile="profile" />
            </RevealOnScroll>
          </AsyncState>
        </div>
        <RevealOnScroll
          immediate
          :delay="0.2"
          class="pb-12 md:col-span-5 md:pt-28"
        >
          <img
            :src="aboutIllustration"
            alt="Illustration of a developer with a laptop"
            class="mx-auto w-full max-w-md"
            width="450"
            height="450"
            loading="lazy"
          >
        </RevealOnScroll>
      </div>

      <section
        aria-labelledby="stack-heading"
        class="pb-16"
      >
        <h2
          id="stack-heading"
          class="pb-6 text-[2.3em] font-medium"
        >
          Stack
        </h2>
        <AsyncState
          :status="skillsState.status.value"
          :error="skillsState.error.value"
          :is-empty="!skills?.length"
          empty-text="No skills listed yet."
          @retry="skillsState.refresh()"
        >
          <StackTable :skills="skills ?? []" />
        </AsyncState>
      </section>

      <!-- Optional section, hidden when GitHub data is unavailable. Disabled for now, see the script block.
      <RevealOnScroll
        v-if="contributions"
        as="section"
        aria-labelledby="contributions-heading"
      >
        <h2
          id="contributions-heading"
          class="pt-2 pb-8 text-center text-[2.3em] font-medium"
        >
          Days I <strong class="purple">Code</strong>
        </h2>
        <ContributionCalendar :calendar="contributions" />
      </RevealOnScroll>
      -->
    </div>
  </section>
</template>
