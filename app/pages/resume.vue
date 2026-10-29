<script setup lang="ts">
const [experiencesState, educationsState, profileState] = await Promise.all([
  useExperiences(),
  useEducations(),
  useProfile(),
])

const { data: experiences } = experiencesState
const { data: educations } = educationsState
const { data: profile } = profileState

usePageSeo({
  title: 'Resume',
  description: 'Work experience and education of Rofiqur Rohman.',
})
</script>

<template>
  <section class="section-surface relative pt-28 pb-12 text-white">
    <div class="mx-auto max-w-3xl px-4">
      <h1 class="sr-only">
        Resume
      </h1>

      <section
        aria-labelledby="experience-heading"
        class="pt-8"
      >
        <h2
          id="experience-heading"
          class="pb-2 text-[2em] font-bold"
        >
          Experience
        </h2>
        <AsyncState
          :status="experiencesState.status.value"
          :error="experiencesState.error.value"
          :is-empty="!experiences?.length"
          empty-text="No experience listed yet."
          @retry="experiencesState.refresh()"
        >
          <div class="divide-y divide-[rgb(200_137_230/0.2)] border-y border-[rgb(200_137_230/0.2)]">
            <RevealOnScroll
              v-for="(experience, index) in experiences"
              :key="experience.id"
              :immediate="index < 2"
              :delay="index * 0.08"
            >
              <ExperienceCompany :experience="experience" />
            </RevealOnScroll>
          </div>
        </AsyncState>
      </section>

      <section
        aria-labelledby="education-heading"
        class="pt-12"
      >
        <h2
          id="education-heading"
          class="pb-2 text-[2em] font-bold"
        >
          Education
        </h2>
        <AsyncState
          :status="educationsState.status.value"
          :error="educationsState.error.value"
          :is-empty="!educations?.length"
          empty-text="No education listed yet."
          @retry="educationsState.refresh()"
        >
          <div class="divide-y divide-[rgb(200_137_230/0.2)] border-y border-[rgb(200_137_230/0.2)]">
            <RevealOnScroll
              v-for="(education, index) in educations"
              :key="education.id"
              :delay="index * 0.08"
            >
              <EducationItem :education="education" />
            </RevealOnScroll>
          </div>
        </AsyncState>
      </section>

      <div
        v-if="profile"
        class="flex justify-center pt-12"
      >
        <Button
          as="a"
          :href="profile.resumeUrl"
          target="_blank"
          rel="noopener"
          size="lg"
          class="bg-brand-strong text-white hover:bg-brand-hover"
        >
          <Icon name="lucide:download" />
          Download CV
        </Button>
      </div>
    </div>
  </section>
</template>
