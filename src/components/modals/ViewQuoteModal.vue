<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import {
  deleteQuote as deleteQuoteRequest,
  getQuoteWithTranslations,
} from "@/services/api/quote";
import type { DetailedQuote } from "@/types/quoteTypes";
import LayoutModal from "@/layouts/LayoutModal.vue";
import QuoteDetailedCard from "@/components/QuoteDetailedCard.vue";
import IconsPencil from "@/components/icons/IconsPencil.vue";
import IconsTrashCan from "@/components/icons/IconsTrashCan.vue";
import IconsCloseToast from "@/components/icons/IconsCloseToast.vue";
import useModal from "@/stores/modalController";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import BaseMovieInput from "@/components/base/BaseMovieInput.vue";
import type { TranslatedField } from "@/types";

const modal = useModal();
const quoteData = ref<DetailedQuote | null>(null);
const props = defineProps<{ quoteId: number }>();
const isLoading = ref(false);
const quoteTranslations = ref<TranslatedField | null>(null);

onBeforeMount(() => {
  isLoading.value = true;
  getQuoteWithTranslations(props.quoteId)
    .then(({ data: { data } }: { data: { data: DetailedQuote } }) => {
      quoteData.value = data;
      quoteTranslations.value = data.quote as TranslatedField;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const deleteQuote = () => {
  console.log("deleteQuote");
  deleteQuoteRequest(props.quoteId).finally(() => {
    modal.close();
  });
};
</script>

<template>
  <LayoutModal
    :blur="false"
    class="laptop:bg-gradient-radial laptop:opacity-70"
  >
    <LoadingWheelModal v-if="isLoading" />
    <div
      v-else
      v-click-outside="() => modal.close()"
      class="flex flex-col self-baseline"
    >
      <div
        class="flex items-center justify-between rounded-t-xl border-b border-b-whitesmoke/20 bg-cinder px-8 pb-6 pt-8 leading-9 laptop:mt-24"
      >
        <div class="flex w-4 gap-4">
          <button
            @click.stop="modal.openWithProps('EditQuoteModal', { quoteId })"
          >
            <IconsPencil class="fill-white" />
          </button>
          <span class="text-stale-gray">|</span>
          <button @click.stop="deleteQuote">
            <IconsTrashCan />
          </button>
        </div>
        <h1 class="text-2xl font-medium">
          {{ $t("view_quote_modal.view_quote") }}
        </h1>
        <button @click.stop="modal.close()">
          <IconsCloseToast class="fill-gray-400" />
        </button>
      </div>
      <QuoteDetailedCard
        v-if="quoteData"
        :quote="quoteData"
        class="rounded-t-none laptop:min-w-4xl laptop:max-w-4xl"
      >
        <BaseMovieInput
          name="quote.en"
          language="Eng"
          class="w-full italic"
          :defaultValue="quoteTranslations?.en"
          disabled
        />
        <BaseMovieInput
          name="quote.ka"
          language="Geo"
          class="w-full italic"
          :defaultValue="quoteTranslations?.ka"
          disabled
        />
      </QuoteDetailedCard>
    </div>
  </LayoutModal>
</template>
