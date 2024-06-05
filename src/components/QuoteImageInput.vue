<script setup lang="ts">
import { computed, ref } from "vue";
import IconsPhotoCamera from "@/components/icons/IconsPhotoCamera.vue";
import ChangePhotoLogo from "@/assets/images/change_photo.svg";
const props = defineProps<{
  placeholderImageUrl?: string;
}>();

const imageUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  (e: "input:image", file: File): void;
}>();

const onImageInput = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
    imageFile.value = file;
    emit("input:image", file);
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
    emit("input:image", file);
  }
};

const filled = computed(() => !!imageUrl.value || !!props.placeholderImageUrl);
</script>

<template>
  <div
    :style="
      filled && {
        backgroundImage: `url(${imageUrl || props.placeholderImageUrl || ''})`,
      }
    "
    class="relative flex items-center gap-4 rounded border border-stale-gray/70 bg-cover bg-center bg-no-repeat px-4 py-5"
    :class="filled && 'h-76 border-none laptop:h-lg'"
    @dragover="onDragOver"
    @drop.prevent="onDrop"
  >
    <input
      hidden
      type="file"
      name="image"
      ref="inputRef"
      accept="image/*"
      @input="onImageInput"
    />
    <div
      v-if="!filled"
      class="flex w-full flex-row items-center justify-between gap-3 laptop:w-1/2 laptop:justify-start"
    >
      <span class="flex flex-nowrap gap-3">
        <IconsPhotoCamera />
        <span class="hidden laptop:flex">Drag & Drop your image here or</span>
        <span class="laptop:hidden"> Upload image </span>
      </span>

      <button
        @click.stop.prevent="inputRef?.click()"
        type="button"
        class="inline-block cursor-pointer rounded-sm bg-blueviolet/40 p-2.5"
      >
        Choose file
      </button>
    </div>
    <div v-else class="absolute inset-0 flex items-center justify-center">
      <button type="button" @click.stop.prevent="inputRef?.click()">
        <img :src="ChangePhotoLogo" alt="change photo" />
      </button>
    </div>
  </div>
</template>
