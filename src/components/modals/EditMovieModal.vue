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
import { getMovieWithTranslations, updateMovie } from "@/services/api/movie";
import type {
  StoreMovieRequestData,
  DetailedMovieWithTranslations,
} from "@/types/movieTypes";
import { useI18n } from "vue-i18n";

interface Genre {
  id: number;
  name: string;
}

const store = useUserAuthStore();
const user = computed(() => store.user);
const genres = ref<Genre[]>([]);
const modal = useModal();
const WaitingForMovieUpdate = ref(false);

const posterFile = ref<File | null>(null);
const posterUrl = ref<string | null>(null);

const { t } = useI18n();

const props = defineProps<{
  movieId: string;
}>();

const validationSchema = {
  "title.ka": "required|georgian|max:45",
  "title.en": "required|english|max:45",
  release_year: "required|numeric|length:4",
  "director_name.ka": "required|georgian|max:45",
  "director_name.en": "required|english|max:45",
  "description.ka": "required|georgian|max:500",
  "description.en": "required|english|max:500",
  genres: "required",
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

  WaitingForMovieUpdate.value = true;
  updateMovie(props.movieId, {
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
      WaitingForMovieUpdate.value = false;
      modal.close();
    });
});

onBeforeMount(() => {
  getMovieWithTranslations(props.movieId).then(
    ({ data: { data } }: { data: { data: DetailedMovieWithTranslations } }) => {
      setFieldValue("title", data.title);
      setFieldValue("release_year", data.release_year);
      setFieldValue("director_name", data.director);
      setFieldValue("description", data.description);
      setFieldValue(
        "genres",
        data.genres.reduce(
          (acc, genre) => {
            acc[genre.id] = true;
            return acc;
          },
          {} as Record<number, boolean>,
        ),
      );
      posterUrl.value = data.poster;
    },
  );

  getGenres().then(({ data }: { data: Genre[] }) => {
    genres.value = data;
  });
});
</script>

<template>
  <LayoutModal :blur="false">
    <div
      v-click-outside="() => modal.close()"
      v-if="user && !WaitingForMovieUpdate"
      class="relative flex w-full flex-col self-start rounded-xl bg-cinder p-9 laptop:mt-28 laptop:box-content laptop:max-w-4xl"
    >
      <div class="mb-6 flex items-center justify-between">
        <br />
        <h2 class="text-2xl font-medium">
          {{ $t("edit_movie_modal.edit_movie") }}
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
        <MoviePosterInputField
          @input:poster="posterFile = $event"
          :placeholderImageUrl="posterUrl as string"
        />
        <BaseRedButton
          @click.prevent.stop="submitForm"
          :text="$t('edit_movie_modal.edit_movie')"
          class="mt-6 w-full py-2.5 text-xl"
        />
      </form>
    </div>
    <LoadingWheelModal v-else />
  </LayoutModal>
</template>
