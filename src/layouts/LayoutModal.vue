<script setup lang="ts">
import IconsArrowIcon from "@/components/icons/IconsArrowIcon.vue";
import useModal from "@/stores/modalController";

type PropTypes = {
  opacity?: number;
  closable?: boolean;
};
const props = defineProps<PropTypes>();
const modal = useModal();
</script>

<template>
  <div class="fixed inset-0 h-full backdrop-blur-sm">
    <div
      class="h-full w-full bg-black bg-gradient-radial"
      :class="`laptop:opacity-${props.opacity ?? 50}`"
    ></div>
  </div>
  <div class="fixed inset-0">
    <div
      class="relative flex h-full w-full items-center justify-center text-white"
    >
      <slot />
      <IconsArrowIcon
        @click.stop="modal.close"
        v-if="props.closable"
        class="absolute right-9 top-8 h-4 w-4 rotate-180 scale-x-110 cursor-pointer laptop:hidden"
      />
    </div>
  </div>
</template>
