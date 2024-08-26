<script setup lang="ts">
import IconsQuote from "@/components/icons/IconsQuote.vue";
import type { MovieIndexContent } from "@/types/movieTypes";

const { movie } = defineProps<{
  movie: MovieIndexContent;
}>();
</script>

<template>
  <RouterLink
    :to="{ name: 'MovieDetail', params: { id: movie.id.toString() } }"
    class="inline-flex w-full flex-col items-start gap-3.5"
  >
    <img
      :src="movie.poster"
      class="h-76 w-full rounded-xl object-cover object-center laptop:h-93"
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
