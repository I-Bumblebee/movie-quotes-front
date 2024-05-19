<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emit = defineEmits<{ click }>();
type PropTypes = {
  text: string;
};

const props = defineProps<PropTypes>();
</script>

<template>
  <button
    @click="emit('click')"
    class="cursor-pointer rounded border-scarlet bg-scarlet px-4 pb-1 pt-2 font-helvetica text-white hover:bg-firebrick active:bg-red-orange laptop:px-6"
  >
    {{ props.text }}
  </button>
</template>
