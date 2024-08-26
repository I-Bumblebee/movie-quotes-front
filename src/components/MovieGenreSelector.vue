<script setup lang="ts">
import IconsCaret from "@/components/icons/IconsCaret.vue";
import { computed, ref } from "vue";
import GenreButton from "@/components/GenreButton.vue";
import { useField, useFieldArray } from "vee-validate";
import type { Genre } from "@/types";

const props = defineProps<{
  genres: Genre[];
}>();

const isOpen = ref(false);

const { fields, remove, push } = useFieldArray("genres");
const { errors: genreErrors, validate } = useField("genres");

const selectedGenres = computed(() =>
  props.genres.filter((genre) =>
    fields.value.some(
      (field) => (field.value as { id: number }).id === genre.id,
    ),
  ),
);

const unSelectGenre = (genreId: number) => {
  const index = fields.value.findIndex(
    (field) => (field.value as { id: number }).id === genreId,
  );
  remove(index);
  validate();
};

const selectGenre = (genreId: number) => {
  push({ id: genreId });
  validate();
};
</script>

<template>
  <div>
    <div class="relative">
      <div
        @click.stop="isOpen = !isOpen"
        class="no-scrollbar flex min-h-[50px] items-start gap-3 overflow-x-scroll rounded border border-stale-gray bg-cinder px-3.5 py-2.5 laptop:text-xl"
      >
        <span
          class="select-none leading-7"
          :class="
            selectedGenres.length &&
            'whitespace-nowrap text-base font-medium text-stale-gray'
          "
        >
          {{ $t("movie_genre_selector.select_genre") }}:
        </span>
        <GenreButton
          @click="unSelectGenre"
          v-for="genre in selectedGenres"
          :key="genre.name"
          :genre="genre"
          showIcon
          class="rounded-sm"
        />
        <button
          type="button"
          @click.stop="isOpen = !isOpen"
          class="absolute right-0 top-1/2 z-50 h-full -translate-y-1/2 rounded-r border border-l-0 border-stale-gray bg-cinder px-3"
        >
          <IconsCaret
            :class="isOpen ? 'rotate-90' : 'rotate-0'"
            class="transition-all duration-300"
          />
        </button>
      </div>
      <div
        v-if="isOpen"
        v-click-outside="() => (isOpen = false)"
        class="absolute left-0 top-16 z-50 flex w-full flex-wrap gap-2.5 gap-y-2 rounded border border-stale-gray bg-cinder px-3.5 py-3"
      >
        <GenreButton
          @click="selectGenre"
          v-for="genre in genres"
          :key="genre.name"
          :genre="genre"
          :selected="
            selectedGenres.some(
              (selectedGenre) => selectedGenre.id === genre.id,
            )
          "
          class="rounded-sm"
        />
      </div>
    </div>
    <ul v-show="genreErrors" class="ml-1 mt-0.5">
      <li
        :key="key"
        v-for="(error, key) in genreErrors"
        class="text-sm text-scarlet"
      >
        • {{ error }}
      </li>
    </ul>
  </div>
</template>
