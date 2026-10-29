<template>
  <MotionConfig reduced-motion="user">
    <TooltipProvider :delay-duration="150">
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TooltipProvider>
  </MotionConfig>
</template>
