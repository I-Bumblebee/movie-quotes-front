<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import useModal from "@/stores/modalController";
import LayoutModal from "@/layouts/LayoutModal.vue";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";

const router = useRouter();
const route = useRoute();
const modal = useModal();

const currentQueryParams = { ...route.query };
router.replace({ name: "Home", query: currentQueryParams });

modal.open("ResetPasswordModal");
</script>

<template>
  <LayoutModal class="laptop:bg-gradient-radial">
    <LoadingWheelModal />
  </LayoutModal>
</template>
