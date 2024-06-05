<script setup lang="ts">
import type { MovieIndexContent } from "@/types/movieTypes";
import IconsCamera from "@/components/icons/IconsCamera.vue";
import IconsCaret from "@/components/icons/IconsCaret.vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useField } from "vee-validate";
import MovieSelectorDropdownItem from "@/components/MovieSelectorDropdownItem.vue";
import { vInfiniteScroll } from "@vueuse/components";
import { getMovies } from "@/services/api/movie";
import type { PaginatedResponse, Meta } from "@/types";

const isOpen = ref(false);
const { value: movieId, setValue } = useField("movie_id");

const selectedMovie = computed(() =>
  movies.value.find((movie) => movie.id === movieId.value),
);

const selectMovie = (movie: MovieIndexContent) => {
  setValue(movie.id);
  isOpen.value = false;
};

const isLoading = ref(false);
const movies = ref<MovieIndexContent[]>([]);
const meta = ref<Meta>({ last_page: 1 });
const moviesPage = ref(1);

onBeforeMount(() => loadMovies(moviesPage.value));
watch(moviesPage, (page) => loadMovies(page));

const loadMovies = (page: number) => {
  getMovies(page, "")
    .then(({ data }: { data: PaginatedResponse<MovieIndexContent> }) => {
      movies.value = [...movies.value, ...data.data];
      meta.value = data.meta;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onReachEnd = () => {
  if (isLoading.value || meta.value.last_page === moviesPage.value) return;
  isLoading.value = true;
  moviesPage.value++;
  loadMovies(moviesPage.value);
};
</script>

<template>
  <div
    v-click-outside="() => (isOpen = false)"
    class="relative flex w-full items-center gap-5 rounded bg-black p-6 py-7"
    :class="isOpen ? 'rounded-b-none' : ''"
  >
    <IconsCamera v-show="!selectedMovie" class="h-8 w-8 fill-white" />
    <p v-show="!selectedMovie" class="text-white laptop:text-2xl">
      {{ $t("movie_selector_dropdown.choose_movie") }}
    </p>
    <p v-show="selectedMovie" class="text-white laptop:text-2xl">
      {{ selectedMovie?.title }}
      <span class="text-almond">({{ selectedMovie?.release_year }})</span>
    </p>
    <button @click="isOpen = !isOpen" type="button">
      <IconsCaret
        class="absolute right-8 top-1/2 h-5 w-5 -translate-y-1/2 fill-white transition duration-200"
        :class="isOpen ? 'rotate-90' : 'rotate-0'"
      />
    </button>
    <div
      v-if="isOpen"
      class="absolute left-0 top-full z-50 w-full rounded-b-xl bg-black p-6"
    >
      <div
        v-infinite-scroll="() => onReachEnd()"
        class="no-scrollbar flex max-h-md flex-col gap-6 overflow-scroll"
      >
        <MovieSelectorDropdownItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @click.stop="selectMovie(movie)"
        />
      </div>
    </div>
  </div>
</template>
