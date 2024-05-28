<script setup lang="ts">
import IconsQuote from "@/components/icons/IconsQuote.vue";
import { defineProps } from "vue";
import type { MovieIndexContent } from "@/types/movieTypes";

const { movie } = defineProps<{
  movie: MovieIndexContent;
}>();
</script>

<template>
  <RouterLink
    :to="{ name: 'MovieDetail', params: { id: movie.id.toString() } }"
    class="flex w-full flex-col gap-3.5"
  >
    <img
      :src="movie.poster"
      class="h-full max-h-93 rounded-xl object-cover object-center"
      alt="movie poster"
    />
    <p class="text-2xl font-medium">
      {{ movie.title }} ({{ movie.release_year }})
    </p>
    <p class="text-xl font-medium">
      {{ movie.quotes_count }}
      <IconsQuote class="ml-1.5 inline-block h-6 w-6" />
    </p>
  </RouterLink>
</template>
