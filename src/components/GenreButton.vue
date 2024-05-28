<script setup lang="ts">
import IconsBoldX from "@/components/icons/IconsBoldX.vue";
import type { Genre } from "@/types";

const props = withDefaults(
  defineProps<{
    genre: Genre;
    selected?: boolean;
    showIcon?: boolean;
  }>(),
  {
    selected: true,
    showIcon: false,
  },
);

const emit = defineEmits<{
  (e: "click", id: number): void;
}>();
</script>

<template>
  <div
    @click.stop="emit('click', props.genre.id)"
    class="flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded px-1.5 py-1 text-sm"
    :class="selected ? 'bg-stale-gray' : 'bg-steel-gray/95 hover:bg-stale-gray'"
  >
    {{ genre.name }}
    <button v-if="showIcon" type="button">
      <IconsBoldX />
    </button>
  </div>
</template>
