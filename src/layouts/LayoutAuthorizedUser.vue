<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import SharedHeader from "@/components/shared/SharedHeader.vue";
</script>

<template>
  <SharedHeader class="absolute bg-white bg-opacity-5" />
  <section
    class="flex min-h-screen gap-32 bg-gradient-radial pt-28 font-helvetica text-white laptop:px-18 laptop:pt-30"
  >
    <div class="hidden w-2/12 laptop:block">
      <SideBar />
    </div>
    <div class="w-full">
      <RouterView />
    </div>
  </section>
</template>
