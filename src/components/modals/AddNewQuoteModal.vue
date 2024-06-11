<script setup lang="ts">
import type { DetailedMovie } from "@/types/movieTypes";
import useUserAuthStore from "@/stores/userAuth";
import useModal from "@/stores/modalController";
import LayoutModal from "@/layouts/LayoutModal.vue";
import { ref } from "vue";
import IconsCloseToast from "@/components/icons/IconsCloseToast.vue";
import BaseMovieInput from "@/components/base/BaseMovieInput.vue";
import { useForm } from "vee-validate";
import QuoteImageInput from "@/components/QuoteImageInput.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import { addQuote } from "@/services/api/quote";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import GenreButton from "@/components/GenreButton.vue";

const modal = useModal();
const user = useUserAuthStore();
const uploadingNewQuote = ref(false);

const props = defineProps<DetailedMovie>();
const imageFile = ref<File | null>(null);
const validationSchema = {
  "quote.en": "required|english|max:500",
  "quote.ka": "required|georgian|max:500",
};
const { handleSubmit, setErrors } = useForm({
  validationSchema,
});

const submitForm = handleSubmit((values) => {
  if (!imageFile.value) {
    return;
  }
  uploadingNewQuote.value = true;

  addQuote(values.quote, imageFile.value, props.id)
    .then(() => {
      modal.close();
    })
    .catch((error) => {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    })
    .finally(() => {
      uploadingNewQuote.value = false;
    });
});
</script>

<template>
  <LayoutModal
    :blur="false"
    class="laptop:bg-gradient-radial laptop:opacity-70"
  >
    <LoadingWheelModal v-if="uploadingNewQuote" />
    <div
      v-else
      v-click-outside="() => modal.close()"
      class="box-content flex w-full flex-col self-baseline font-helvetica laptop:w-auto"
    >
      <div
        class="flex items-center justify-between rounded-t-xl border-b border-b-whitesmoke/20 bg-cinder px-8 pb-6 pt-8 leading-9 laptop:mt-24"
      >
        <span class="w-4" />
        <h1 class="text-xl font-medium text-white laptop:text-2xl">
          {{ $t("add_new_quote_modal.add_quote") }}
        </h1>
        <button @click="modal.close()">
          <IconsCloseToast class="h-3.5 w-3.5 fill-white" />
        </button>
      </div>
      <div
        class="flex flex-col gap-4 rounded-b-xl bg-cinder px-8 py-6 laptop:gap-8"
      >
        <div class="flex items-center gap-6 text-xl">
          <img
            :src="user.user?.image"
            class="h-10 w-10 rounded-full object-cover laptop:h-15 laptop:w-15"
            alt="profile picture"
          />
          {{ user.user?.name }}
        </div>
        <div
          class="mt-4 box-content flex gap-3 rounded bg-black px-2 py-4 laptop:m-0 laptop:gap-7 laptop:bg-transparent laptop:px-0 laptop:py-0"
        >
          <img
            :src="props.poster"
            class="h-20 w-28 rounded-lg-plus object-cover object-center laptop:h-40 laptop:w-72"
            alt="movie poster"
          />
          <div class="flex flex-col justify-between truncate laptop:py-3">
            <p class="text-almond laptop:text-2xl laptop:font-medium">
              {{ props.title }}
              <span class="text-base laptop:text-xl">
                ({{ props.release_year }})
              </span>
            </p>
            <div
              class="no-scrollbar order-1 flex gap-1 overflow-scroll laptop:order-none"
            >
              <GenreButton
                v-for="genre in props.genres"
                :key="genre.name"
                :genre="genre"
                class="px-3 text-xs font-bold laptop:py-1.5 laptop:text-lg"
              />
            </div>
            <p class="flex gap-2.5 font-semibold laptop:text-lg">
              <span class="font-bold text-gray-400">
                {{ $t("add_new_quote_modal.director") }}:
              </span>
              {{ props.director }}
            </p>
          </div>
        </div>
        <form
          @submit.prevent="submitForm"
          class="flex flex-col gap-4 laptop:min-w-4xl laptop:max-w-4xl laptop:gap-6"
        >
          <BaseMovieInput
            name="quote.en"
            placeholder='"Quote in English."'
            language="Eng"
            class="laptop:text-2xl"
            placeholderClass=" laptop:text-2xl italic"
            textarea
          />
          <BaseMovieInput
            name="quote.ka"
            placeholder="“ციტატა ქართულ ენაზე”"
            language="Geo"
            class="laptop:text-2xl"
            placeholderClass=" laptop:text-2xl italic"
            textarea
          />
          <QuoteImageInput
            @input:image="imageFile = $event"
            class="-order-1 laptop:order-none laptop:mt-5"
          />
          <BaseRedButton
            @click.stop.prevent="submitForm"
            :text="$t('add_new_quote_modal.submit_button_text')"
            class="my-2 py-2.5 text-xl laptop:mt-6"
          />
        </form>
      </div>
    </div>
  </LayoutModal>
</template>
