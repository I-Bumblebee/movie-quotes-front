<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import { watch } from "vue";
import useUserAuthStore from "@/stores/userAuth";
import SharedLanguageSwitcher from "@/components/shared/SharedLanguageSwitcher.vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const user = useUserAuthStore();

watch(
  () => props.isOpen,
  (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  },
);
</script>

<template>
  <div
    v-click-outside="() => emit('close')"
    @click="emit('close')"
    v-show="props.isOpen"
    class="z-50 box-content h-screen-3/4 w-4/6 rounded-r-lg-plus bg-cinder px-11 pt-10 text-white"
  >
    <SideBar />
    <button
      @click="user.logout()"
      class="ml-2 mt-10 cursor-pointer rounded border border-white px-5 py-1.5 text-base text-white hover:bg-white hover:bg-opacity-5"
    >
      {{ $t("header.logout") }}
    </button>
    <SharedLanguageSwitcher class="ml-2 mt-10 justify-self-start" />
  </div>
</template>
