<script setup lang="ts">
import { computed, ref } from "vue";
import IconsPhotoCamera from "@/components/icons/IconsPhotoCamera.vue";

const props = defineProps<{
  placeholderImageUrl?: string;
}>();

const imageUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  (e: "input:poster", file: File): void;
}>();

const onImageInput = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
    imageFile.value = file;
    emit("input:poster", file);
  }
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const onDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
    imageFile.value = file;
    emit("input:poster", file);
  }
};

const filled = computed(() => !!imageUrl.value || !!props.placeholderImageUrl);
</script>

<template>
  <div
    class="flex items-center gap-4 rounded border border-stale-gray px-4 py-5"
    @dragover="onDragOver"
    @drop.prevent="onDrop"
  >
    <img
      v-if="filled"
      :src="imageUrl || props.placeholderImageUrl"
      alt="movie poster"
      class="h-28 w-44 object-cover object-center laptop:h-36 laptop:w-1/2"
    />
    <div
      class="flex items-center justify-start gap-3 laptop:w-1/2"
      :class="
        filled
          ? 'flex-col justify-center gap-2.5 laptop:justify-between'
          : 'w-full flex-row justify-between laptop:justify-start'
      "
    >
      <span
        v-show="filled"
        class="self-start text-xs font-semibold text-almond laptop:self-center laptop:text-base"
      >
        Replace photo
      </span>
      <span class="flex flex-nowrap gap-3">
        <IconsPhotoCamera :class="filled && 'hidden laptop:inline'" />
        <span class="hidden laptop:flex">Drag & Drop your image here or</span>
        <span class="laptop:hidden" :class="filled && 'hidden'">
          Upload image
        </span>
      </span>
      <input
        type="file"
        name="poster"
        ref="inputRef"
        class="hidden"
        accept="image/*"
        @input="onImageInput"
      />
      <button
        @click.stop.prevent="inputRef?.click()"
        type="button"
        class="inline-block cursor-pointer rounded-sm bg-blueviolet/40 p-2.5"
      >
        Choose file
      </button>
    </div>
  </div>
</template>
