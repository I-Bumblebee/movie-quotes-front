<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getQuotes } from "@/services/api/quote";
import type { DetailedQuote, Quote } from "@/types/quoteTypes";
import IconsPencilBox from "@/components/icons/IconsPencilBox.vue";
import SharedSearchBar from "@/components/shared/SharedSearchBar.vue";
import { vElementVisibility } from "@vueuse/components";
import { useRoute } from "vue-router";
import QuoteDetailedCard from "@/components/QuoteDetailedCard.vue";
import useModal from "@/stores/modalController";
import { usePaginatedFetch } from "@/composables/usePaginatedFetch";
import { useQuoteActions } from "@/stores/quoteActions";

const route = useRoute();
const modal = useModal();
const quoteActions = useQuoteActions();

const searchBarActive = ref(false);

const quoteSearchParam = computed(
  () => (route.query["filter[quote]"] || "") as string,
);
const movieSearchParam = computed(
  () => (route.query["filter[title]"] || "") as string,
);

const { items: quotes, onReachEnd } = usePaginatedFetch<DetailedQuote>(
  getQuotes,
  movieSearchParam,
  quoteSearchParam,
);

onMounted(() => {
  quoteActions.onCreateQuote = (quote: Quote | DetailedQuote) => {
    quotes.value.unshift(quote as DetailedQuote);
  };

  quoteActions.onDeleteQuote = (quoteId: number) => {
    quotes.value = quotes.value.filter((quote) => quote.id !== quoteId);
  };

  quoteActions.onEditQuote = (quote: Quote) => {
    const index = quotes.value.findIndex((q) => q.id === quote.id);
    quotes.value[index] = quote as DetailedQuote;
  };
});
</script>

<template>
  <div
    class="inline-flex flex-col items-stretch gap-8 laptop:ml-24 laptop:gap-10"
  >
    <div class="ml-5 flex items-center gap-6 laptop:-mb-5 laptop:ml-0">
      <button
        @click.stop="modal.open('WriteNewQuoteModal')"
        class="inline-flex items-center gap-4 rounded-lg-plus px-4 py-1.5 text-xl laptop:bg-bastille laptop:py-3"
        :class="searchBarActive ? 'w-auto' : 'w-full'"
      >
        <IconsPencilBox />
        {{ $t("quote_list_view.write_new_quote") }}
      </button>
      <SharedSearchBar
        page="quoteList"
        class="hidden whitespace-nowrap laptop:flex"
      />
    </div>
    <QuoteDetailedCard v-for="quote in quotes" :key="quote.id" :quote="quote" />
    <div v-if="quotes" v-element-visibility="onReachEnd" class="h-20" />
  </div>
</template>
