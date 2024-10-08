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
import IconsSquarePlus from "@/components/icons/IconsSquarePlus.vue";
import { useQuoteActions } from "@/stores/quoteActions";

const modal = useModal();
const quoteActions = useQuoteActions();

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

  quoteActions.onDeleteQuote = (quoteId: number) => {
    quotes.value = quotes.value.filter((quote) => quote.id !== quoteId);
  };

  quoteActions.onEditQuote = (quote: Quote) => {
    const index = quotes.value.findIndex((q) => q.id === quote.id);
    quotes.value[index] = quote;
  };

  quoteActions.onCreateQuote = (quote: Quote) => {
    quotes.value.unshift(quote);
  };
});

const onDeleteMovie = (id: string) => {
  deleteMovie(id).then(() => {
    router.replace({ name: "Movies" });
  });
};

const onEditMovie = () => {
  modal.openWithProps("EditMovieModal", {
    movieId: String(movie.value?.id),
    updateMovieView: (updatedMovie) => (movie.value = updatedMovie),
  });
};
</script>

<template>
  <div v-if="movie && quotes">
    <p class="mb-8 hidden text-2xl font-medium laptop:block">
      {{ $t("movie_detail_view.movie_description") }}
    </p>
    <MovieCardWithDetails
      @edit="onEditMovie"
      @delete="onDeleteMovie(String(movie.id))"
      :movie="movie"
    />
    <div
      class="mt-8 flex flex-col-reverse gap-8 px-9 laptop:mt-10 laptop:flex-row laptop:items-center laptop:gap-4 laptop:p-0"
    >
      <p class="text-2xl font-medium laptop:m-0">
        {{ $t("movie_detail_view.quotes") }}
        <br class="block laptop:hidden" />
        <span class="text-base laptop:text-2xl">
          ({{ $t("movie_detail_view.total") }} {{ quotes.length }})
        </span>
      </p>
      <hr class="block border-0 border-b border-dimgray laptop:hidden" />
      <span class="hidden text-2xl text-stale-gray laptop:block">|</span>
      <div>
        <BaseRedButton
          @click="modal.openWithProps('AddNewQuoteModal', movie)"
          :text="$t('movie_detail_view.add_quote')"
          class="border py-1 pl-3 pr-3 text-base laptop:border-none laptop:py-2.5 laptop:pl-4 laptop:pr-4 laptop:text-xl"
        >
          <IconsSquarePlus class="fill-white" />
        </BaseRedButton>
      </div>
    </div>
    <div class="my-12 flex flex-col gap-9 laptop:gap-10">
      <QuoteCard v-for="quote in quotes" :key="quote.id" v-bind="quote" />
    </div>
  </div>
</template>
