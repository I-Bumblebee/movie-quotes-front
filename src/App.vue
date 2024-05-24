<script setup lang="ts">
import ModalRenderer from "@/components/ModalRenderer.vue";
import useUserAuthStore from "@/stores/userAuth";
import { getCsrf } from "@/services/api/auth";
import { onBeforeMount } from "vue";
const user = useUserAuthStore();

onBeforeMount(async () => {
  await getCsrf();
  user.fetchUser();
});
</script>

<template>
  <ModalRenderer />
  <RouterView />
</template>
