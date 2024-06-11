<script setup lang="ts">
import LayoutModal from "@/layouts/LayoutModal.vue";
import { getGenres } from "@/services/api/genre";
import useUserAuthStore from "@/stores/userAuth";
import { computed, onBeforeMount, ref } from "vue";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import IconsCloseToast from "@/components/icons/IconsCloseToast.vue";
import { type FormErrors, type GenericObject, useForm } from "vee-validate";
import BaseMovieInput from "@/components/base/BaseMovieInput.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import MovieGenreSelector from "@/components/MovieGenreSelector.vue";
import MoviePosterInputField from "@/components/MoviePosterInputField.vue";
import useModal from "@/stores/modalController";
import { storeMovie } from "@/services/api/movie";
import type { Genre } from "@/types";
import { useI18n } from "vue-i18n";
import type { StoreMovieRequestData } from "@/types/movieTypes";

const store = useUserAuthStore();
const user = computed(() => store.user);
const genres = ref<Genre[]>([]);
const modal = useModal();
const waitingForMovieStore = ref(false);

const posterFile = ref<File | null>(null);

const { t } = useI18n();

const validationSchema = {
  "title.ka": "required|georgian|max:45",
  "title.en": "required|english|max:45",
  release_year: "required|numeric|length:4",
  "director_name.ka": "required|georgian|max:45",
  "director_name.en": "required|english|max:45",
  "description.ka": "required|georgian|max:500",
  "description.en": "required|english|max:500",
};

const { handleSubmit, resetField, setFieldValue, values, setErrors, errors } =
  useForm({
    validationSchema,
  });

const submitForm = handleSubmit(async (values) => {
  const genres = Object.keys(values.genres).filter((key) => values.genres[key]);

  if (!genres.length) {
    setErrors({ genres: t("validations.genres.required") });
    return;
  }

  if (!posterFile.value) return;

  waitingForMovieStore.value = true;
  storeMovie({
    ...values,
    genres,
    poster: posterFile.value,
  } as StoreMovieRequestData)
    .then(() => {
      modal.close();
    })
    .catch((error) => {
      setErrors(error.response.data.errors);
    })
    .finally(() => {
      waitingForMovieStore.value = false;
    });
});

onBeforeMount(() => {
  getGenres()
    .then(({ data }) => {
      genres.value = data;
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<template>
  <LayoutModal :blur="false" class="laptop:bg-gradient-radial">
    <div
      v-click-outside="() => modal.close()"
      v-if="user && !waitingForMovieStore"
      class="relative flex w-full flex-col self-start rounded-xl bg-cinder p-9 laptop:mt-28 laptop:box-content laptop:max-w-4xl"
    >
      <div class="mb-6 flex items-center justify-between">
        <br />
        <h2 class="text-2xl font-medium">
          {{ $t("add_movie_modal.add_movie") }}
        </h2>
        <IconsCloseToast
          @click.stop="modal.close()"
          class="h-3.5 w-3.5 cursor-pointer fill-gray-400"
        />
      </div>
      <hr
        class="absolute left-0 top-16 my-6 block w-full border-0 border-b border-dimgray"
      />
      <div class="mt-8 flex items-center gap-4">
        <img
          :src="user.image"
          alt="user avatar"
          class="h-10 w-10 rounded-full laptop:h-15 laptop:w-15"
        />
        <p class="text-xl">
          {{ user.name }}
        </p>
      </div>
      <form
        @submit.prevent="submitForm"
        class="mt-8 flex w-full max-w-4xl flex-col gap-6"
      >
        <BaseMovieInput name="title.en" label="Movie Name" language="Eng" />
        <BaseMovieInput name="title.ka" label="ფილმის სახელი" language="ქარ" />
        <MovieGenreSelector
          :genres="genres"
          :resetField="resetField"
          :setFieldValue="setFieldValue"
          :selectedGenreIds="values.genres"
          :errors="errors as FormErrors<GenericObject>"
        />
        <BaseMovieInput name="release_year" label="წელი/year" />
        <BaseMovieInput
          name="director_name.en"
          label="Director"
          language="Eng"
        />
        <BaseMovieInput
          name="director_name.ka"
          label="რეჟისორი"
          language="ქარ"
        />
        <BaseMovieInput
          name="description.en"
          label="Movie Description"
          language="Eng"
          textarea
        />
        <BaseMovieInput
          name="description.ka"
          label="ფილმის აღწერა"
          language="ქარ"
          textarea
        />
        <MoviePosterInputField @input:poster="posterFile = $event" />
        <BaseRedButton
          @click.prevent.stop="submitForm"
          :text="$t('add_movie_modal.add_movie')"
          class="mt-6 w-full py-2.5 text-xl"
        />
      </form>
    </div>
    <LoadingWheelModal v-else />
  </LayoutModal>
</template>
