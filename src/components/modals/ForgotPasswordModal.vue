<script setup lang="ts">
import LayoutModal from "@/layouts/LayoutModal.vue";
import useModal from "@/stores/modalController";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import BaseFormField from "@/components/base/BaseFormField.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import { getCsrf } from "@/services/api/auth";
import { sendResetLink } from "@/services/api/password";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import IconsArrowIcon from "@/components/icons/IconsArrowIcon.vue";

const modal = useModal();
const { t } = useI18n();
const loading = ref(false);

const { handleSubmit, setErrors } = useForm({
  validationSchema: {
    email: "required|email",
  },
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  await getCsrf();
  sendResetLink(values.email)
    .then(() => {
      onSuccess(values.email);
    })
    .catch(
      ({
        response: {
          data: { errors },
        },
      }) => {
        setErrors(errors);
      },
    )
    .finally(() => {
      loading.value = false;
    });
});

const onSuccess = (email: string) => {
  modal.openActionModal("BaseDialogModal", {
    iconName: "IconsCircleCheckMark",
    heading: t("forgot_password_modal.success_action.heading"),
    message: t("forgot_password_modal.success_action.message"),
    actionName: t("forgot_password_modal.success_action.action_name"),
    secondaryActionName: t(
      "forgot_password_modal.success_action.secondary_action_name",
    ),
    action: () => {
      const emailVendor = email.split("@")[1];
      window.location.href = `https://www.${emailVendor}`;
    },
    secondaryAction: () => {
      modal.close();
    },
  });
};
</script>

<template>
  <LayoutModal closable>
    <LoadingWheelModal v-show="loading" />
    <div
      v-show="!loading"
      v-click-outside="() => modal.close()"
      class="flex h-screen w-full flex-col items-center rounded-lg-plus pt-30 font-helvetica laptop:h-auto laptop:w-auto laptop:bg-steel-gray laptop:px-28 laptop:py-12"
    >
      <div class="inline-block w-90 text-center">
        <h1 class="inline-block text-3xl font-semibold">
          {{ $t("forgot_password_modal.forgot_password") }}
        </h1>
        <p
          class="mt-2.5 break-words text-sm font-medium text-stale-gray laptop:text-base"
        >
          {{ $t("forgot_password_modal.forgot_password_message") }}
        </p>
      </div>

      <form
        @submit="onSubmit"
        class="mx-auto mt-7 box-content flex w-90 flex-col gap-6 overflow-y-scroll px-1 text-black"
      >
        <BaseFormField
          name="email"
          :label="$t('login_modal.email.label')"
          :placeholder="$t('login_modal.email.placeholder')"
          type="email"
          required
        />
        <BaseRedButton
          @click.capture="onSubmit"
          :text="$t('forgot_password_modal.send_instructions')"
          class="border font-medium"
        />
      </form>
      <button
        @click.prevent.stop="modal.open('LoginModal')"
        class="mt-9 inline-flex select-none items-center gap-3 text-center font-medium text-stale-gray"
      >
        <IconsArrowIcon />
        <span class="-mb-1">
          {{ $t("forgot_password_modal.back_to_login") }}
        </span>
      </button>
    </div>
  </LayoutModal>
</template>
