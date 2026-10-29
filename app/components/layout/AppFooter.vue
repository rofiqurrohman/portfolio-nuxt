<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-10 bg-footer py-3 text-center text-white">
    <div class="mx-auto grid max-w-6xl items-center gap-2 px-4 md:grid-cols-3">
      <p>By @Rofiqur Rohman</p>
      <p>Copyright © 2021 - {{ currentYear }}</p>
      <div class="flex justify-center">
        <slot name="social" />
      </div>
    </div>
  </footer>
</template>
