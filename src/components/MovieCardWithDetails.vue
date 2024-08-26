<script setup lang="ts">
import IconsPencil from "@/components/icons/IconsPencil.vue";
import IconsTrashCan from "@/components/icons/IconsTrashCan.vue";
import GenreButton from "@/components/GenreButton.vue";
import type { DetailedMovie } from "@/types/movieTypes";

const props = defineProps<{
  movie: DetailedMovie;
}>();

const emit = defineEmits<{
  (event: "delete", id: number): void;
  (event: "edit", id: number): void;
}>();
</script>

<template>
  <div
    class="flex flex-col items-stretch gap-8 px-9 pt-4 laptop:flex-row laptop:gap-5 laptop:p-0"
  >
    <img
      :src="props.movie.poster"
      alt="movie poster"
      class="h-76 w-full rounded-xl object-cover laptop:max-h-md laptop:min-h-md laptop:w-7/12"
    />
    <div class="flex max-w-xl flex-col gap-4 laptop:w-5/12">
      <div class="flex w-full items-center justify-between">
        <h1 class="text-2xl font-medium text-almond">
          {{ props.movie.title }} ({{ props.movie.release_year }})
        </h1>
        <div
          class="hidden items-center gap-6 rounded-lg-plus bg-white/5 px-7 py-2.5 text-xl leading-5 text-stale-gray laptop:flex"
        >
          <button @click="() => emit('edit', props.movie.id)">
            <IconsPencil class="fill-white" />
          </button>
          |
          <button @click="() => emit('delete', props.movie.id)">
            <IconsTrashCan class="fill-white" />
          </button>
        </div>
      </div>
      <div class="mt-2 flex flex-wrap items-start gap-3 overflow-x-scroll">
        <GenreButton
          v-for="genre in props.movie.genres"
          :key="genre.name"
          :genre="genre"
          class="px-3 py-1.5 text-lg font-bold"
        />
      </div>
      <p class="text-lg font-medium">
        <span class="mr-2 font-semibold text-gray-400"
          >{{ $t("movie_detail_view.director") }}:</span
        >
        {{ props.movie.director }}
      </p>
      <p class="mt-1.5 text-lg">{{ props.movie.description }}</p>
    </div>
  </div>
</template>
