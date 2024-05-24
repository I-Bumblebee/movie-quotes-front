<script setup lang="ts">
import IconsToastSuccess from "@/components/icons/IconsToastSuccess.vue";
import IconsCloseToast from "@/components/icons/IconsCloseToast.vue";

const props = defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex h-screen items-start justify-center bg-black/60 pt-28"
  >
    <div
      v-click-outside="() => emit('close')"
      class="inline-flex min-w-96 items-center gap-4 rounded border-beige bg-beige px-4 py-4 font-medium"
    >
      <IconsToastSuccess />
      <p class="text-teal">{{ props.message }}</p>
      <IconsCloseToast
        @click="emit('close')"
        class="ml-auto justify-self-end opacity-50"
      />
    </div>
  </div>
</template>
