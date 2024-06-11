<script setup lang="ts">
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import LoadingWheelModal from "@/components/modals/LoadingWheelModal.vue";
import IconsArrowIcon from "@/components/icons/IconsArrowIcon.vue";
import useUserAuthStore from "@/stores/userAuth";
import { updateUser as updateUserData } from "@/services/api/user";
import { useForm } from "vee-validate";
import { computed, ref } from "vue";
import ConfirmUserUpdateModal from "@/components/modals/ConfirmUserUpdateModal.vue";
import ProfileEditForm from "@/components/ProfileEditForm.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import ProfileEditFormMobile from "@/components/ProfileEditFormMobile.vue";
import { useWindowSize } from "@vueuse/core";

const editingName = ref(false);
const editingPassword = ref(false);
const editingImage = ref(false);
const imageUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);

const isConfirmModalVisible = ref(false);
const confirmed = ref(false);

const showToast = ref(false);

const { width } = useWindowSize();

const editingUser = computed(
  () => editingName.value || editingPassword.value || editingImage.value,
);

const store = useUserAuthStore();

const { handleSubmit, setErrors } = useForm({
  validationSchema: {
    name: "min:3|max:15|alpha_num",
    password: "min:8|max:15|alpha_num",
    password_confirmation: "confirmed:@password",
  },
});

const updateUser = handleSubmit(async (values) => {
  if (editingPassword.value && !values.password) {
    return;
  }

  if (editingName.value && !values.name) {
    return;
  }

  if (!confirmed.value) {
    isConfirmModalVisible.value = true;
    return;
  }

  updateUserData(
    imageFile.value as File | undefined,
    values.name,
    values.password,
    values.password_confirmation,
  )
    .then(({ data: { user } }) => {
      store.user = user;
      displayToast();
      stopEditing();
    })
    .catch((err) => {
      setErrors(err);
    })
    .finally(() => {
      confirmed.value = false;
    });
});

const stopEditing = () => {
  editingName.value = false;
  editingPassword.value = false;
  editingImage.value = false;
  imageUrl.value = null;
  imageFile.value = null;
};

const onImageInput = (event: Event) => {
  editingImage.value = true;
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
    imageFile.value = file;
  }
};

const displayToast = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 1300);
};
</script>

<template>
  <ToastNotification
    v-if="showToast"
    @close="showToast = false"
    :message="$t('profile_view.toast_changes_updated_successfully')"
    class="laptop:hidden"
  />
  <ConfirmUserUpdateModal
    v-if="isConfirmModalVisible"
    @confirm="
      isConfirmModalVisible = false;
      confirmed = true;
      updateUser();
    "
    @cancel="isConfirmModalVisible = false"
  />
  <div v-show="!isConfirmModalVisible">
    <div class="mb-4 ml-8 font-medium laptop:mb-32 laptop:ml-32">
      <h1 class="hidden text-2xl laptop:inline-flex">
        {{ $t("profile_view.my_profile") }}
      </h1>
      <button
        @click.stop.prevent="editingUser ? stopEditing() : $router.back()"
        class="inline-block -translate-y-0.5 laptop:hidden"
      >
        <IconsArrowIcon class="h-3.5 w-4" />
      </button>
    </div>
    <LoadingWheelModal v-show="!store.user" class="laptop:bg-transparent" />
    <div v-if="store.user" class="laptop:ml-16 laptop:inline-block">
      <div
        class="flex flex-col items-center rounded-xl bg-white/5 pb-40 pt-6 laptop:inline-flex laptop:bg-cinder/100 laptop:px-48"
        :class="(editingPassword || editingName) && 'hidden laptop:flex'"
      >
        <img
          :src="imageUrl || store.user.image"
          alt="profile image"
          class="h-47 w-47 rounded-full object-cover object-center laptop:-mt-20"
        />
        <label type="file" class="mb-10 cursor-pointer text-xl">
          {{ $t("profile_view.upload_new_photo") }}
          <input accept="image/*" type="file" hidden @input="onImageInput" />
        </label>
        <ProfileEditForm
          @submit="updateUser"
          @startEditingName="editingName = true"
          @startEditingPassword="editingPassword = true"
          :editingName="editingName"
          :editingPassword="editingPassword"
        />
      </div>
      <ProfileEditFormMobile
        @submit="updateUser"
        :editingName="editingName"
        :editingPassword="editingPassword"
        v-if="width < 1399"
      />
      <div
        v-if="editingUser"
        class="my-8 flex w-full justify-between gap-7 px-12 laptop:my-12 laptop:justify-end laptop:px-0 laptop:text-xl"
      >
        <button @click="stopEditing">
          {{ $t("profile_view.cancel") }}
        </button>
        <BaseRedButton
          @click="updateUser"
          :text="$t('profile_view.save_changes')"
          class="border laptop:border-none laptop:py-2.5"
        />
      </div>
    </div>
  </div>
</template>
