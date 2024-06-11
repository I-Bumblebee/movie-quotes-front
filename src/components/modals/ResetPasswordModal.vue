<script setup lang="ts">
import LayoutModal from "@/layouts/LayoutModal.vue";
import useModal from "@/stores/modalController";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import { getCsrf } from "@/services/api/auth";
import { resetPassword } from "@/services/api/password";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import IconsArrowIcon from "@/components/icons/IconsArrowIcon.vue";
import BasePasswordField from "@/components/base/BasePasswordField.vue";
import { useRoute } from "vue-router";

const modal = useModal();
const { t } = useI18n();
const route = useRoute();

const loading = ref(false);
const email = ref("");
const token = ref("");

const { handleSubmit } = useForm({
  validationSchema: {
    password: "required|min:8|max:15|alpha_num",
    password_confirmation: "required|confirmed:@password",
  },
});

const onSubmit = handleSubmit(async (values) => {
  if (!email.value || !token.value) return;

  loading.value = true;
  await getCsrf();
  resetPassword(
    email.value,
    values.password,
    values.password_confirmation,
    token.value,
  )
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      loading.value = false;
    });
});

const onSuccess = () => {
  modal.openWithProps("InteractiveDialogModal", {
    iconName: "IconsCircleCheckMark",
    heading: t("reset_password_modal.success_action.heading"),
    message: t("reset_password_modal.success_action.message"),
    actionName: t("reset_password_modal.success_action.action_name"),
    action: () => modal.open("LoginModal"),
  });
};
const onFail = () => {
  modal.openWithProps("InteractiveDialogModal", {
    iconName: "IconsExpiredToken",
    heading: t("reset_password_modal.fail_action.heading"),
    message: t("reset_password_modal.fail_action.message"),
    actionName: t("reset_password_modal.fail_action.action_name"),
    action: () => modal.open("ForgotPasswordModal"),
  });
};

onMounted(() => {
  email.value = route.query.email as string;
  token.value = route.query.token as string;
});
</script>

<template>
  <LayoutModal closable>
    <LoadingWheelModal v-show="loading" />
    <div
      v-show="!loading"
      v-click-outside="() => modal.close()"
      class="flex h-screen w-full flex-col items-center rounded-lg-plus pt-24 font-helvetica laptop:h-auto laptop:w-auto laptop:bg-steel-gray laptop:px-28 laptop:pb-8 laptop:pt-14"
    >
      <div class="inline-block text-center">
        <h1 class="inline-block text-3xl-plus font-semibold">
          {{ $t("reset_password_modal.create_new_password") }}
        </h1>
        <p class="mx-auto mt-2.5 w-90 break-words text-base text-stale-gray">
          {{ $t("reset_password_modal.reset_password_message") }}
        </p>
      </div>

      <form
        @submit="onSubmit"
        class="mx-auto mt-7 box-content flex w-90 flex-col gap-6 overflow-y-visible px-1 text-black"
      >
        <BasePasswordField
          name="password"
          :label="$t('reset_password_modal.password.label')"
          :placeholder="$t('reset_password_modal.password.placeholder')"
          required
        />
        <BasePasswordField
          name="password_confirmation"
          :label="$t('reset_password_modal.password_confirmation.label')"
          :placeholder="
            $t('reset_password_modal.password_confirmation.placeholder')
          "
          required
        />
        <BaseRedButton
          @click.capture="onSubmit"
          :text="$t('reset_password_modal.reset_password')"
          class="border"
        />
      </form>
      <button
        @click.prevent.stop="modal.open('LoginModal')"
        class="mt-10 inline-flex select-none items-center gap-3 text-center text-stale-gray"
      >
        <IconsArrowIcon />
        <span class="-mb-1">
          {{ $t("forgot_password_modal.back_to_login") }}
        </span>
      </button>
    </div>
  </LayoutModal>
</template>
