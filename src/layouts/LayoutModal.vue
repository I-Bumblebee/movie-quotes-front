<script setup lang="ts">
import IconsArrowIcon from "@/components/icons/IconsArrowIcon.vue";
import useModal from "@/stores/modalController";

type PropTypes = {
  class?: string;
  closable?: boolean;
  blur?: boolean;
};
const props = withDefaults(defineProps<PropTypes>(), {
  blur: true,
});
const modal = useModal();
</script>

<template>
  <div
    class="fixed inset-0 z-50 h-full"
    :class="props.blur ? 'backdrop-blur-sm backdrop-filter' : ''"
  >
    <div
      class="h-full w-full bg-black bg-gradient-radial laptop:bg-gradient-none"
      :class="props.class"
    />
  </div>
  <div class="fixed inset-0 z-50">
    <div
      class="relative flex h-full w-full items-center justify-center overflow-y-scroll font-helvetica text-white laptop:pb-24"
    >
      <slot />
      <button
        @click.stop.capture="modal.close"
        v-if="props.closable"
        class="absolute right-9 top-8 z-50 cursor-pointer laptop:hidden"
      >
        <IconsArrowIcon class="h-4 w-4 rotate-180 scale-x-110" />
      </button>
    </div>
  </div>
</template>
