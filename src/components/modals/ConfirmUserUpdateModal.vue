<script setup lang="ts">
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import LayoutModal from "@/layouts/LayoutModal.vue";

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <LayoutModal class="opacity-5">
    <div
      v-click-outside="() => emit('cancel')"
      class="relative mx-9 mb-80 box-content flex w-full flex-col items-center rounded-lg-plus text-white laptop:w-auto laptop:min-w-96 laptop:bg-steel-gray laptop:bg-gradient-none"
    >
      <p class="mb-12 mt-14 text-center font-medium laptop:mx-5 laptop:text-lg">
        {{ $t("confirm_user_update_modal.text") }}
      </p>
      <hr
        class="h-px w-full border-0 border-b border-gray-400 border-opacity-20"
      />
      <div class="my-5 flex h-full w-full items-center justify-between px-5">
        <button @click.stop.prevent="emit('cancel')" class="ml-4">
          {{ $t("confirm_user_update_modal.cancel") }}
        </button>
        <BaseRedButton
          @click.stop.capture="emit('confirm')"
          :text="$t('confirm_user_update_modal.confirm')"
          class="border px-1.5"
        />
      </div>
      <div
        class="absolute inset-0 -z-10 rotate-180 rounded-lg-plus bg-action-modal-bg opacity-30"
      ></div>
    </div>
  </LayoutModal>
</template>
