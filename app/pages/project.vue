<script setup lang="ts">
const { data: projects, status, error, refresh } = await useProjects()

usePageSeo({
  title: 'Projects',
  description: 'Selected web projects built by Rofiqur Rohman.',
})
</script>

<template>
  <section class="section-surface relative pt-36 pb-8 text-center text-white">
    <div class="mx-auto max-w-6xl px-4">
      <RevealOnScroll immediate>
        <h1 class="pt-2 text-[2.3em] font-medium">
          My Recent <strong class="purple">Works</strong>
        </h1>
        <p class="pt-2">
          Here are a few projects I've worked on recently.
        </p>
      </RevealOnScroll>

      <AsyncState
        :status="status"
        :error="error"
        :is-empty="!projects?.length"
        empty-text="No projects yet."
        error-text="Couldn't load the projects right now."
        @retry="refresh()"
      >
        <ul class="grid gap-12 py-12 text-left md:grid-cols-2 md:px-6 lg:grid-cols-3">
          <RevealOnScroll
            v-for="(project, index) in projects"
            :key="project.id"
            as="li"
            :immediate="index < 3"
            :delay="(index % 3) * 0.08"
          >
            <ProjectCard :project="project" />
          </RevealOnScroll>
        </ul>
      </AsyncState>
    </div>
  </section>
</template>
