<script setup lang="ts">
type PropTypes = {
  text: string;
};

const props = defineProps<PropTypes>();
</script>

<template>
  <button
    class="flex cursor-pointer items-center justify-center gap-2 rounded border-scarlet bg-scarlet px-4 py-1.5 font-helvetica text-white hover:bg-firebrick active:bg-red-orange laptop:px-6"
  >
    <slot />
    {{ props.text }}
  </button>
</template>
