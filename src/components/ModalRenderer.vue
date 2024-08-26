<script setup lang="ts">
import useModalController from "@/stores/modalController";
import { watch } from "vue";

const modal = useModalController();

watch(
  () => modal.isOpen,
  (value) => {
    document.body.style.overflow = value ? "hidden" : "auto";
  },
  { immediate: true },
);
</script>

<template>
  <Teleport to="#modal">
    <Component :is="modal.view" v-bind="modal.props" />
  </Teleport>
</template>
