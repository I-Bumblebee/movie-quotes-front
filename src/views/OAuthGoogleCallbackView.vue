<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import useModal from "@/stores/modalController";
import LayoutModal from "@/layouts/LayoutModal.vue";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import { handleGoogleLogin } from "@/services/api/auth";
import { useI18n } from "vue-i18n";
import useUserAuthStore from "@/stores/userAuth";

const router = useRouter();
const route = useRoute();
const modal = useModal();
const userStore = useUserAuthStore();
const { t } = useI18n();

onMounted(() => {
  const code = route.query.code as string;
  const scope = route.query.scope as string;
  const authuser = Number(route.query.authuser);
  const hd = route.query.hd as string;
  const prompt = route.query.prompt as string;

  handleGoogleLogin(code, scope, authuser, hd, prompt)
    .then(({ data: { user } }) => {
      userStore.user = user;
      modal.openWithProps("BaseDialogModal", {
        iconName: "IconsCircleCheckMark",
        heading: t("handle_google_callback.success.heading"),
        message: t("handle_google_callback.success.message"),
        actionName: t("handle_google_callback.success.action_name"),
        action: () => {
          router.replace({ name: "Quotes" });
          modal.close();
        },
      });
    })
    .catch(() => {
      modal.openWithProps("BaseDialogModal", {
        iconName: "IconsExpiredToken",
        heading: t("handle_google_callback.fail.heading"),
        message: t("handle_google_callback.fail.message"),
        actionName: t("handle_google_callback.fail.action_name"),
        action: () => {
          router.replace({ name: "Home" });
          modal.close();
        },
      });
    });
});
</script>

<template>
  <LayoutModal :opacity="100">
    <LoadingWheelModal />
  </LayoutModal>
</template>
