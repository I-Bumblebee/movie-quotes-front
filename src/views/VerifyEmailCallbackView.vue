<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import useModal from "@/stores/modalController";
import LayoutModal from "@/layouts/LayoutModal.vue";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import { verifyEmail } from "@/services/api/email";
import { useI18n } from "vue-i18n";

const router = useRouter();
const route = useRoute();
const modal = useModal();
const { t } = useI18n();

onMounted(() => {
  const user = route.query.user as string;
  const hash = route.query.hash as string;
  const expires = route.query.expires as string;
  const signature = route.query.signature as string;

  if (!user || !hash || !expires || !signature) {
    router.replace({ name: "UnauthorizedError" });
  }

  verifyEmail(user, hash, expires, signature)
    .then(() => {
      modal.openActionModal("BaseDialogModal", {
        iconName: "IconsCircleCheckMark",
        heading: t("verify_email_callback.success.heading"),
        message: t("verify_email_callback.success.message"),
        actionName: t("verify_email_callback.success.action_name"),
        action: () => modal.open("LoginModal"),
      });
    })
    .catch(() => {
      modal.openActionModal("BaseDialogModal", {
        iconName: "IconsExpiredToken",
        heading: t("verify_email_callback.fail.heading"),
        message: t("verify_email_callback.fail.message"),
        actionName: t("verify_email_callback.fail.action_name"),
        action: () => modal.close(),
      });
    })
    .finally(() => {
      router.replace({ name: "Home" });
    });
});
</script>

<template>
  <LayoutModal class="opacity-100">
    <LoadingWheelModal />
  </LayoutModal>
</template>
