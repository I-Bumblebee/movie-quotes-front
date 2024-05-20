<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import BaseFormField from "@/components/base/BaseFormField.vue";
import IconsGoogle from "@/components/icons/IconsGoogle.vue";
import useModal from "@/stores/modalController";
import BasePasswordField from "@/components/base/BasePasswordField.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import {
  getCsrf,
  register,
  getGoogleLoginRedirectUrl,
} from "@/services/api/auth";
import LayoutModal from "@/layouts/LayoutModal.vue";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import { useI18n } from "vue-i18n";

const { handleSubmit, setErrors, resetField } = useForm({
  validationSchema: {
    name: "required|min:3|max:15|alpha_num",
    email: "required|email",
    password: "required|min:8|max:15|alpha_num",
    password_confirmation: "required|confirmed:@password",
  },
});

const { t } = useI18n();
const modal = useModal();
const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  await getCsrf();
  register(
    values.name,
    values.email,
    values.password,
    values.password_confirmation,
  )
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
        resetField("password");
        resetField("password_confirmation");
      },
    )
    .finally(() => {
      loading.value = false;
    });
});

const loginWithGoogle = () => {
  loading.value = true;
  getGoogleLoginRedirectUrl().then(({ data: { url } }) => {
    window.location.href = url;
  });
};

const onSuccess = (email: string) => {
  modal.openActionModal("BaseDialogModal", {
    iconName: "IconsSendCheck",
    heading: t("register_modal.success_action.heading"),
    message: t("register_modal.success_action.message"),
    actionName: t("register_modal.success_action.action_name"),
    action: () => {
      const emailVendor = email.split("@")[1];
      window.location.href = `https://www.${emailVendor}`;
    },
  });
};
</script>

<template>
  <LayoutModal>
    <LoadingWheelModal v-show="loading" />
    <div
      v-show="!loading"
      v-click-outside="() => modal.close()"
      class="flex h-screen w-full flex-col items-center rounded-lg-plus pt-20 font-helvetica laptop:h-auto laptop:w-auto laptop:bg-steel-gray laptop:px-30 laptop:py-14"
    >
      <div class="gap-20 text-center">
        <h1 class="text-2xl font-semibold laptop:text-3xl">
          {{ $t("register_modal.create_an_account") }}
        </h1>
        <p class="font-base mt-2.5 font-medium text-stale-gray">
          {{ $t("register_modal.start_your_journey") }}
        </p>
      </div>
      <form
        @submit="onSubmit"
        class="mx-auto mt-6 box-content flex w-90 flex-col gap-5 overflow-y-scroll px-1 text-black"
      >
        <BaseFormField
          name="name"
          :label="$t('register_modal.name.label')"
          :placeholder="$t('register_modal.name.placeholder')"
          type="text"
          required
        />
        <BaseFormField
          name="email"
          :label="$t('register_modal.email.label')"
          :placeholder="$t('register_modal.email.placeholder')"
          type="email"
          required
        />
        <BasePasswordField
          name="password"
          :label="$t('register_modal.password.label')"
          :placeholder="$t('register_modal.password.placeholder')"
          required
        />
        <BasePasswordField
          name="password_confirmation"
          :label="$t('register_modal.password_confirmation.label')"
          :placeholder="$t('register_modal.password_confirmation.placeholder')"
          required
        />
        <BaseRedButton
          @click="onSubmit"
          :text="$t('register_modal.sign_up')"
          class="mt-2.5 border font-medium"
        />
      </form>
      <button
        @click="loginWithGoogle"
        class="mt-4 w-90 cursor-pointer rounded border border-gray-400 pb-1 pt-2 font-medium text-white hover:bg-white hover:bg-opacity-5"
      >
        <IconsGoogle class="mb-1 mr-1.5 inline" />
        {{ $t("register_modal.sign_up_with_google") }}
      </button>
      <p class="mt-9 select-none text-center text-stale-gray">
        {{ $t("register_modal.already_have_an_account") }}
        <button
          @click.prevent.stop="modal.open('LoginModal')"
          class="cursor-pointer font-medium text-indigo underline"
        >
          {{ $t("register_modal.login") }}
        </button>
      </p>
    </div>
  </LayoutModal>
</template>
