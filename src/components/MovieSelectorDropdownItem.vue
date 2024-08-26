<script setup lang="ts">
import type { MovieIndexContent } from "@/types/movieTypes";

const props = defineProps<{
  movie: MovieIndexContent;
}>();
</script>

<template>
  <div class="flex w-full items-center gap-5 border-b border-b-bastille/50">
    <img
      :src="props.movie.poster"
      class="h-20 w-28 cursor-pointer rounded object-cover"
      alt="movie poster"
    />
    <p class="cursor-pointer truncate text-white laptop:text-2xl">
      {{ props.movie.title }}
    </p>
    <p
      class="ml-auto hidden cursor-pointer align-baseline text-xl text-almond laptop:inline"
    >
      ({{ props.movie.release_year }})
    </p>
  </div>
</template>
