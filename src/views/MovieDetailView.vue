<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { getMovie, deleteMovie, getMovieQuotes } from "@/services/api/movie";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import MovieCardWithDetails from "@/components/MovieCardWithDetails.vue";
import QuoteCard from "@/components/QuoteCard.vue";
import useModal from "@/stores/modalController";
import type { DetailedMovie } from "@/types/movieTypes";
import type { Quote } from "@/types/quoteTypes";

const modal = useModal();

const movie = ref<DetailedMovie | null>(null);
const quotes = ref<Quote[]>([]);
const router = useRouter();

onBeforeMount(() => {
  const route = useRoute();
  getMovie(String(route.params.id)).then(
    ({ data }: { data: { data: DetailedMovie } }) => {
      movie.value = data.data;
    },
  );

  getMovieQuotes(String(route.params.id)).then(
    ({ data }: { data: { data: Quote[] } }) => {
      quotes.value = data.data;
    },
  );
});

const onDeleteMovie = (id: string) => {
  deleteMovie(id).then(() => {
    router.replace({ name: "Movies" });
  });
};
</script>

<template>
  <div v-if="movie && quotes">
    <p class="mb-8 hidden text-2xl font-medium laptop:block">
      {{ $t("movie_detail_view.movie_description") }}
    </p>
    <MovieCardWithDetails
      @edit="
        modal.openWithProps('EditMovieModal', { movieId: String(movie.id) })
      "
      @delete="onDeleteMovie(String(movie.id))"
      :movie="movie"
    />
    <div
      class="mt-8 flex flex-col-reverse gap-8 px-9 laptop:mt-10 laptop:flex-row laptop:items-center laptop:gap-4 laptop:p-0"
    >
      <p class="text-2xl font-medium laptop:m-0">
        {{ $t("movie_detail_view.quotes") }}
        <br class="block laptop:hidden" />
        <span class="text-base laptop:text-xl">
          ({{ $t("movie_detail_view.total") }} {{ quotes.length }})
        </span>
      </p>
      <hr class="block border-0 border-b border-dimgray laptop:hidden" />
      <span class="hidden text-2xl text-stale-gray laptop:block">|</span>
      <div>
        <BaseRedButton
          @click="console.log('Add Quote')"
          :text="$t('movie_detail_view.add_quote')"
          class="border py-1 text-base laptop:border-none laptop:py-2.5 laptop:text-xl"
        />
      </div>
    </div>
    <div class="mt-12">
      <QuoteCard v-for="quote in quotes" :key="quote.id" v-bind="quote" />
    </div>
    <div class="h-screen"></div>
  </div>
</template>
