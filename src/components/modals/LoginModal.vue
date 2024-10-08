<script setup lang="ts">
import LayoutModal from "@/layouts/LayoutModal.vue";
import useModal from "@/stores/modalController";
import IconsGoogle from "@/components/icons/IconsGoogle.vue";
import BasePasswordField from "@/components/base/BasePasswordField.vue";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import BaseFormField from "@/components/base/BaseFormField.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import { getCsrf, getGoogleLoginRedirectUrl, login } from "@/services/api/auth";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import useUserAuthStore from "@/stores/userAuth";
import { useRouter } from "vue-router";

const modal = useModal();
const userStore = useUserAuthStore();
const loading = ref(false);
const router = useRouter();

const { handleSubmit, resetField, setFieldError } = useForm({
  validationSchema: {
    login: "required",
    password: "required",
  },
});

const { value: remember } = useField("remember");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  await getCsrf();
  login(values.login, values.password, values.remember)
    .then(({ data: { user } }) => {
      modal.close();
      userStore.user = user;
      router.replace({ name: "Quotes" });
    })
    .catch(
      ({
        response: {
          data: { errors },
        },
      }) => {
        if (errors.email) {
          setFieldError("login", errors.email);
        } else {
          setFieldError("login", errors.name);
        }
        resetField("password");
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
</script>

<template>
  <LayoutModal closable class="laptop:opacity-55">
    <LoadingWheelModal v-show="loading" />
    <div
      v-show="!loading"
      v-click-outside="() => modal.close()"
      class="flex h-screen w-full flex-col items-center rounded-lg-plus pt-20 font-helvetica laptop:h-auto laptop:w-auto laptop:bg-steel-gray laptop:px-28 laptop:py-14"
    >
      <div class="gap-20 text-center">
        <h1 class="text-2xl font-semibold laptop:text-3xl">
          {{ $t("login_modal.log_in_to_your_account") }}
        </h1>
        <p class="font-base mt-2.5 text-stale-gray">
          {{ $t("login_modal.welcome_back") }}
        </p>
      </div>
      <form
        @submit="onSubmit"
        class="mx-auto mt-6 box-content flex w-90 flex-col gap-5 overflow-y-visible px-1 text-black"
      >
        <BaseFormField
          name="login"
          :label="$t('login_modal.email.label')"
          :placeholder="$t('login_modal.email.placeholder')"
          type="text"
          required
        />
        <BasePasswordField
          name="password"
          :label="$t('login_modal.password.label')"
          :placeholder="$t('login_modal.password.placeholder')"
          required
        />
        <div class="flex h-3.5 items-center justify-between text-white">
          <label class="flex items-center gap-2">
            <input v-model="remember" type="checkbox" />
            {{ $t("login_modal.remember_me") }}
          </label>
          <button
            type="button"
            @click.prevent.stop="modal.open('ForgotPasswordModal')"
            class="text-indigo underline"
          >
            {{ $t("login_modal.forgot_password") }}
          </button>
        </div>
        <BaseRedButton
          @click.capture="onSubmit"
          :text="$t('login_modal.sign_in')"
          class="border"
        />
      </form>
      <button
        @click="loginWithGoogle"
        class="mt-4 w-90 cursor-pointer rounded border border-gray-400 py-1.5 text-white hover:bg-white hover:bg-opacity-5"
      >
        <IconsGoogle class="mb-1 mr-1.5 inline" />
        {{ $t("login_modal.login_with_google") }}
      </button>
      <p class="mt-9 select-none text-center text-stale-gray">
        {{ $t("login_modal.already_have_an_account") }}
        <button
          @click.prevent.stop="modal.open('RegisterModal')"
          class="cursor-pointer text-indigo underline"
        >
          {{ $t("login_modal.sign_up") }}
        </button>
      </p>
    </div>
  </LayoutModal>
</template>
