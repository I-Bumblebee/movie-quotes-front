<script setup lang="ts">
import { computed } from "vue";
import { getMovies } from "@/services/api/movie";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import MovieCard from "@/components/MovieCard.vue";
import useModal from "@/stores/modalController";
import { useRoute } from "vue-router";
import { vElementVisibility } from "@vueuse/components";
import SharedSearchBar from "@/components/shared/SharedSearchBar.vue";
import type { MovieIndexContent } from "@/types/movieTypes";
import { usePaginatedFetch } from "@/composables/usePaginatedFetch";
import IconsSquarePlus from "@/components/icons/IconsSquarePlus.vue";

const keyword = computed(() => (route.query["filter[title]"] || "") as string);
const modal = useModal();
const route = useRoute();

const { items: movies, onReachEnd } = usePaginatedFetch<MovieIndexContent>(
  getMovies,
  keyword,
);
</script>

<template>
  <div
    class="mb-9 flex items-start justify-between px-9 laptop:mb-14 laptop:p-0"
  >
    <p class="text-2xl font-medium">
      {{ $t("movie_list_view.my_list_of_movies") }}
      <br class="block laptop:hidden" />
      <span class="text-base laptop:text-2xl">
        ({{ $t("movie_list_view.total") }} {{ movies.length }})
      </span>
    </p>
    <div class="flex items-center gap-10">
      <div class="hidden laptop:block">
        <SharedSearchBar page="movieList" />
      </div>
      <BaseRedButton
        @click.stop="
          modal.openWithProps('AddMovieModal', {
            updateMovieList: (movie: MovieIndexContent) =>
              movies.unshift(movie),
          })
        "
        :text="$t('movie_list_view.add_movie')"
        class="border py-1 pl-3 pr-3 text-base laptop:border-none laptop:py-2.5 laptop:pl-4 laptop:pr-4 laptop:text-xl"
      >
        <IconsSquarePlus />
      </BaseRedButton>
    </div>
  </div>
  <div
    class="grid grid-cols-1 justify-items-start gap-10 px-9 laptop:grid-cols-3 laptop:px-0"
  >
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
  <div v-if="movies" v-element-visibility="onReachEnd" class="h-20" />
</template>
