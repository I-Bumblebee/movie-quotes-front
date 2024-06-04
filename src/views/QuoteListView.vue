<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import { getQuotes } from "@/services/api/quote";
import type { PaginatedResponse } from "@/types";
import type { DetailedQuote } from "@/types/quoteTypes";
import IconsPencilBox from "@/components/icons/IconsPencilBox.vue";
import SharedSearchBar from "@/components/shared/SharedSearchBar.vue";
import { vElementVisibility } from "@vueuse/components";
import { useRoute } from "vue-router";
import QuoteDetailedCard from "@/components/QuoteDetailedCard.vue";

const quotes = ref<DetailedQuote[]>([]);
const page = ref<number>(1);
const lastPage = ref<number>(1);
const loading = ref(false);
const route = useRoute();

const quoteSearchParam = computed(
  () => (route.query["filter[quote]"] || "") as string,
);
const movieSearchParam = computed(
  () => (route.query["filter[title]"] || "") as string,
);

onBeforeMount(() => {
  fetchQuotes("replace");
});

const fetchQuotes = (mode: "extend" | "replace", resetPage?: boolean) => {
  if (resetPage) {
    page.value = 1;
  }
  if (mode === "replace") {
    loading.value = true;
  }
  getQuotes(page.value, movieSearchParam.value, quoteSearchParam.value)
    .then(({ data }: { data: PaginatedResponse<DetailedQuote> }) => {
      if (mode === "replace") {
        quotes.value = data.data;
      } else {
        quotes.value = [...quotes.value, ...data.data];
      }
      lastPage.value = data.meta.last_page;
    })
    .finally(() => {
      loading.value = false;
    });
};

watch([movieSearchParam, quoteSearchParam], () => {
  fetchQuotes("replace", true);
});

const onReachEnd = (state: boolean) => {
  if (state && page.value < lastPage.value) {
    page.value++;
    fetchQuotes("extend");
  }
};
</script>

<template>
  <div
    v-show="!loading"
    class="inline-flex flex-col items-stretch gap-8 laptop:ml-24 laptop:gap-10"
  >
    <div class="ml-5 flex items-center gap-6 laptop:-mb-5 laptop:ml-0">
      <button
        class="flex w-full items-center gap-4 rounded-lg-plus px-4 py-3 text-xl laptop:bg-bastille"
      >
        <IconsPencilBox />
        Write new quote
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
