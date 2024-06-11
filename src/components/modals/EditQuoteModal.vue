<script setup lang="ts">
import useUserAuthStore from "@/stores/userAuth";
import useModal from "@/stores/modalController";
import LayoutModal from "@/layouts/LayoutModal.vue";
import { onBeforeMount, ref } from "vue";
import IconsCloseToast from "@/components/icons/IconsCloseToast.vue";
import BaseMovieInput from "@/components/base/BaseMovieInput.vue";
import { useForm } from "vee-validate";
import QuoteImageInput from "@/components/QuoteImageInput.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import {
  getQuoteWithTranslations,
  deleteQuote as deleteQuoteRequest,
  editQuote,
} from "@/services/api/quote";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import type { DetailedQuote } from "@/types/quoteTypes";
import IconsTrashCan from "@/components/icons/IconsTrashCan.vue";

const props = defineProps<{
  quoteId: number;
}>();

const modal = useModal();
const user = useUserAuthStore();
const loading = ref(false);
const imageFile = ref<File | null>(null);
const quote = ref<DetailedQuote | null>(null);

const validationSchema = {
  "quote.en": "required|english|max:500",
  "quote.ka": "required|georgian|max:500",
};

const { handleSubmit, setErrors, setFieldValue } = useForm({
  validationSchema,
});

onBeforeMount(async () => {
  loading.value = true;
  getQuoteWithTranslations(props.quoteId)
    .then(({ data: { data } }: { data: { data: DetailedQuote } }) => {
      quote.value = data;
      setFieldValue("quote", data.quote);
    })
    .finally(() => {
      loading.value = false;
    });
});

const submitForm = handleSubmit((values) => {
  loading.value = true;

  editQuote(values.quote, quote.value?.id as number, imageFile.value as File)
    .then(() => {
      modal.close();
    })
    .catch((error) => {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    })
    .finally(() => {
      loading.value = false;
    });
});

const deleteQuote = () => {
  loading.value = true;
  deleteQuoteRequest(props.quoteId)
    .then(() => {
      modal.close();
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <LayoutModal :blur="false" class="laptop:bg-gradient-radial">
    <LoadingWheelModal v-if="loading" />
    <div
      v-else
      v-click-outside="() => modal.close()"
      class="box-content flex w-full flex-col self-baseline font-helvetica laptop:w-auto"
    >
      <div
        class="flex items-center justify-between rounded-t-xl border-b border-b-whitesmoke/20 bg-cinder px-8 pb-6 pt-8 leading-10 laptop:mt-24"
      >
        <button @click.stop="deleteQuote" class="flex items-center gap-1.5">
          <IconsTrashCan />
          <span class="-mb-1 hidden w-0 laptop:inline">
            {{ $t("edit_quote_modal.delete") }}
          </span>
        </button>
        <h1 class="text-xl font-medium text-white laptop:text-2xl">
          {{ $t("edit_quote_modal.edit_quote") }}
        </h1>
        <button @click="modal.close()">
          <IconsCloseToast class="h-3.5 w-3.5 fill-white" />
        </button>
      </div>
      <div
        class="flex flex-col gap-8 rounded-b-xl bg-cinder px-8 py-6 laptop:gap-10"
      >
        <div class="flex items-center gap-6 text-xl">
          <img
            :src="user.user?.image"
            class="h-10 w-10 rounded-full laptop:h-15 laptop:w-15"
            alt="profile picture"
          />
          {{ user.user?.name }}
        </div>
        <form
          @submit.prevent="submitForm"
          class="flex flex-col gap-4 laptop:min-w-4xl laptop:max-w-4xl laptop:gap-6"
        >
          <BaseMovieInput
            name="quote.en"
            language="Eng"
            class="laptop:text-2xl"
            textarea
          />
          <BaseMovieInput
            name="quote.ka"
            language="Geo"
            class="laptop:text-2xl"
            textarea
          />
          <QuoteImageInput
            @input:image="imageFile = $event"
            :placeholderImageUrl="quote?.image"
          />
          <BaseRedButton
            :text="$t('edit_quote_modal.submit_button_text')"
            type="submit"
            class="mb-2 py-2.5 text-xl laptop:mt-6"
          />
        </form>
      </div>
    </div>
  </LayoutModal>
</template>
