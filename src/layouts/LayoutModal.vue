<script setup lang="ts"></script>

<template>
  <div class="fixed inset-0 h-full backdrop-blur-sm">
    <div
      class="h-full w-full bg-black bg-gradient-radial laptop:opacity-50"
    ></div>
  </div>
  <div class="fixed inset-0 flex items-center justify-center text-white">
    <slot />
  </div>
</template>
