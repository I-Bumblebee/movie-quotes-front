<script setup lang="ts">
type PropTypes = {
  text: string;
};

const props = defineProps<PropTypes>();
</script>

<template>
  <button
    class="cursor-pointer rounded border-scarlet bg-scarlet px-4 pb-1 pt-2 font-helvetica text-white hover:bg-firebrick active:bg-red-orange laptop:px-6"
  >
    {{ props.text }}
  </button>
</template>
