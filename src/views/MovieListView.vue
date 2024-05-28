<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import { getMovies } from "@/services/api/movie";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import MovieCard from "@/components/MovieCard.vue";
import useModal from "@/stores/modalController";
import { useRoute } from "vue-router";
import { vElementVisibility } from "@vueuse/components";
import SharedSearchBar from "@/components/shared/SharedSearchBar.vue";
import type { MovieIndexContent } from "@/types/movieTypes";
import type { PaginatedResponse } from "@/types";

const movies = ref<MovieIndexContent[]>([]);
const page = ref(1);
const lastPage = ref(1);
const keyword = computed(() => (route.query["filter[title]"] || "") as string);

const modal = useModal();
const route = useRoute();

onBeforeMount(() => {
  fetchMovies("replace");
});

const fetchMovies = (mode: "extend" | "replace", resetPage?: boolean) => {
  if (resetPage) {
    page.value = 1;
  }
  getMovies(page.value, keyword.value).then(
    ({ data }: { data: PaginatedResponse<MovieIndexContent> }) => {
      if (mode === "replace") {
        movies.value = data.data;
      } else {
        movies.value = [...movies.value, ...data.data];
      }

      lastPage.value = data.meta.last_page;
    },
  );
};

const onReachEnd = (state: boolean) => {
  if (state && page.value < lastPage.value) {
    page.value++;
    fetchMovies("extend");
  }
};

watch(keyword, () => {
  fetchMovies("replace", true);
});
</script>

<template>
  <div
    class="mb-9 flex items-start justify-between px-9 laptop:mb-14 laptop:p-0"
  >
    <p class="text-2xl font-medium">
      {{ $t("movie_list_view.my_list_of_movies") }}
      <br class="block laptop:hidden" />
      <span class="text-base laptop:text-xl">
        ({{ $t("movie_list_view.total") }} {{ movies.length }})
      </span>
    </p>
    <div class="flex items-center gap-10">
      <div class="hidden laptop:block">
        <SharedSearchBar page="movieList" />
      </div>
      <BaseRedButton
        @click.stop="modal.open('AddMovieModal')"
        :text="$t('movie_list_view.add_movie')"
        class="border py-1 text-base laptop:border-none laptop:py-2.5 laptop:text-xl"
      />
    </div>
  </div>
  <div
    class="grid min-h-screen grid-cols-1 gap-10 px-9 laptop:grid-cols-3 laptop:px-0"
  >
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
  <div v-if="movies" v-element-visibility="onReachEnd" class="h-20" />
</template>
