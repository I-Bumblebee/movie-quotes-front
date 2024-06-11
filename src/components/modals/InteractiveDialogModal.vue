<script setup lang="ts">
import LayoutModal from "@/layouts/LayoutModal.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import {
  type InteractiveDialogModal,
  useModal,
} from "@/stores/modalController";
import { defineAsyncComponent } from "vue";

const modal = useModal();
const props = defineProps<InteractiveDialogModal>();

const icon = defineAsyncComponent(
  () => import(`@/components/icons/${props.iconName}.vue`),
);
</script>

<template>
  <LayoutModal class="laptop:opacity-55">
    <div
      v-click-outside="() => modal.close()"
      class="relative mb-40 box-content flex w-10/12 flex-col items-center gap-7 rounded-lg-plus py-18 font-helvetica laptop:w-90 laptop:bg-steel-gray laptop:bg-gradient-none laptop:px-22"
    >
      <component :is="icon" />
      <h1
        class="-mt-1 text-center text-2xl font-semibold text-white laptop:text-3xl"
      >
        {{ props.heading }}
      </h1>
      <p
        class="font-base w-96 overflow-visible text-wrap px-12 text-center text-white laptop:px-0"
      >
        {{ props.message }}
      </p>
      <BaseRedButton
        @click.stop.capture="props.action"
        :text="props.actionName"
        class="mb-4 w-2/4 whitespace-nowrap border laptop:mb-0 laptop:mt-3 laptop:w-full"
      />
      <div
        class="absolute inset-0 -z-10 rotate-180 rounded-lg-plus bg-action-modal-bg opacity-30"
      ></div>
      <div
        class="border-gradient-dark absolute inset-0 -z-10 rounded-lg-plus opacity-30"
      ></div>
    </div>
  </LayoutModal>
</template>

<style>
.border-gradient-dark {
  border: 1px solid;
  border-image-source: linear-gradient(
    180deg,
    #000000 0%,
    rgba(0, 0, 0, 0.25) 100%
  );
}
</style>
