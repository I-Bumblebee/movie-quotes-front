<script setup lang="ts">
import useUserAuthStore from "@/stores/userAuth";
import useModal from "@/stores/modalController";
import LayoutModal from "@/layouts/LayoutModal.vue";
import { ref } from "vue";
import IconsCloseToast from "@/components/icons/IconsCloseToast.vue";
import BaseMovieInput from "@/components/base/BaseMovieInput.vue";
import { useForm } from "vee-validate";
import QuoteImageInput from "@/components/QuoteImageInput.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import MovieSelectorDropdown from "@/components/MovieSelectorDropdown.vue";
import { addQuote } from "@/services/api/quote";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";

const modal = useModal();
const user = useUserAuthStore();
const uploadingNewQuote = ref(false);

const imageFile = ref<File | null>(null);
const validationSchema = {
  "quote.en": "required|english|max:500",
  "quote.ka": "required|georgian|max:500",
  movie_id: "required|numeric",
};
const { handleSubmit, setErrors } = useForm({
  validationSchema,
});

const submitForm = handleSubmit((values) => {
  if (!imageFile.value) {
    return;
  }
  uploadingNewQuote.value = true;

  addQuote(values.quote, imageFile.value, values.movie_id)
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
        class="flex items-center justify-between rounded-t-xl border-b border-b-whitesmoke/20 bg-cinder px-8 pb-6 pt-8 leading-9 laptop:mt-24 laptop:min-w-4xl"
      >
        <span class="w-4" />
        <h1 class="text-xl font-medium text-white laptop:text-2xl">
          {{ $t("write_new_quote_modal.write_new_quote") }}
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
            placeholder="Start create new quote"
            language="Eng"
            class="laptop:text-2xl"
            placeholderClass="text-stale-gray laptop:text-2xl"
            textarea
          />
          <BaseMovieInput
            name="quote.ka"
            placeholder="ახალი ციტატა"
            language="Geo"
            class="laptop:text-2xl"
            placeholderClass="text-stale-gray laptop:text-2xl"
            textarea
          />
          <QuoteImageInput @input:image="imageFile = $event" />
          <MovieSelectorDropdown class="mt-2 laptop:mt-1" />
          <BaseRedButton
            :text="$t('write_new_quote_modal.submit_button_text')"
            type="submit"
            class="mb-3 mt-2 py-2.5 text-xl laptop:mt-6"
          />
        </form>
      </div>
    </div>
  </LayoutModal>
</template>
