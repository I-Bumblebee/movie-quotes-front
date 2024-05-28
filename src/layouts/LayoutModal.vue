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
    class="fixed inset-0 h-full"
    :class="props.blur ? 'backdrop-blur-sm backdrop-filter' : ''"
  >
    <div
      class="h-full w-full bg-black bg-gradient-radial laptop:opacity-50"
      :class="props.class"
    ></div>
  </div>
  <div class="fixed inset-0">
    <div
      class="relative flex h-full w-full items-center justify-center overflow-y-scroll pb-24 text-white"
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
