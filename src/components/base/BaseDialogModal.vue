<script setup lang="ts">
import LayoutModal from "@/layouts/LayoutModal.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import { type ActionPropTypes, useModal } from "@/stores/modalController";
import { defineAsyncComponent } from "vue";

const modal = useModal();
const props = defineProps<ActionPropTypes>();

const icon = defineAsyncComponent(
  () => import(`@/components/icons/${props.iconName}.vue`),
);
</script>

<template>
  <LayoutModal>
    <div
      v-click-outside="() => modal.close()"
      class="laptop:bg-gradient-none test mb-40 box-content flex w-10/12 flex-col items-center gap-7 rounded-lg-plus bg-action-modal-bg py-18 font-helvetica laptop:w-90 laptop:bg-steel-gray laptop:px-22"
    >
      <component :is="icon" />
      <h1 class="-mt-1 text-2xl font-semibold text-white laptop:text-3xl">
        {{ props.heading }}
      </h1>
      <p
        class="font-base w-96 overflow-visible text-wrap px-12 text-center font-medium text-white laptop:px-0"
      >
        {{ props.message }}
      </p>
      <BaseRedButton
        :text="props.actionName"
        class="mb-4 w-2/4 border font-medium laptop:mb-0 laptop:mt-3 laptop:w-full"
      />
    </div>
  </LayoutModal>
</template>
