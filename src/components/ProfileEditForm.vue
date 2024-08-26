<script setup lang="ts">
import DisabledFormField from "@/components/DisabledFormField.vue";
import BaseFormField from "@/components/base/BaseFormField.vue";
import BasePasswordField from "@/components/base/BasePasswordField.vue";
import useUserAuthStore from "@/stores/userAuth";
import type { GenericObject } from "vee-validate";
import { computed } from "vue";

const props = defineProps<{
  editingName: boolean;
  editingPassword: boolean;
  values: GenericObject;
}>();

const emit = defineEmits<{
  (e: "startEditingName"): void;
  (e: "startEditingPassword"): void;
  (e: "submit"): void;
}>();

const store = useUserAuthStore();

const eightOrMoreCharacters = computed(
  () => props.values.password?.length >= 8,
);
const fifteenLowercaseCharacters = computed(
  () =>
    props.values.password?.length === 15 &&
    props.values.password === props.values.password?.toLowerCase(),
);
</script>

<template>
  <form
    v-if="store.user"
    @submit.prevent="emit('submit')"
    class="flex w-full flex-col gap-8 px-8 laptop:w-96 laptop:min-w-xl-plus laptop:gap-14 laptop:px-0"
    @keydown.enter="emit('submit')"
  >
    <DisabledFormField
      @edit="emit('startEditingName')"
      :label="$t('profile_view.username')"
      :value="store.user.name"
      editable
      class="placeholder-white"
    />
    <span v-if="props.editingName" class="w-full pr-16">
      <BaseFormField
        name="name"
        :label="$t('profile_view.new_username')"
        type="text"
        :placeholder="$t('profile_view.enter_new_username')"
        class="py-2.5 text-xl"
      />
    </span>
    <DisabledFormField
      :label="$t('profile_view.email')"
      :value="store.user.email"
      class="placeholder-gray-400/100"
    />
    <DisabledFormField
      v-if="!store.user.oauth"
      @edit="emit('startEditingPassword')"
      :label="$t('profile_view.password')"
      value="••••••••••••"
      editable
      class="placeholder-gray-400/50"
    />
    <div v-if="props.editingPassword" class="flex w-full flex-col gap-12 pr-16">
      <div class="rounded border border-gray-400/30 p-6 text-white">
        <p class="mb-4">
          {{ $t("profile_view.password_should_contain") }}
        </p>
        <p :class="eightOrMoreCharacters && 'text-darkgray'">
          <span
            :class="eightOrMoreCharacters ? 'text-darkgray' : 'text-seagreen'"
          >
            •
          </span>
          {{ $t("profile_view.eight_or_more_characters") }}
        </p>
        <p :class="fifteenLowercaseCharacters && 'text-darkgray'">
          <span
            :class="
              fifteenLowercaseCharacters ? 'text-darkgray' : 'text-seagreen'
            "
          >
            •
          </span>
          {{ $t("profile_view.fifteen_lowercase_characters") }}
        </p>
      </div>
      <BasePasswordField
        name="password"
        :label="$t('profile_view.new_password')"
        :placeholder="$t('profile_view.enter_new_password')"
        class="py-2 text-xl"
      />
      <BasePasswordField
        name="password_confirmation"
        :label="$t('profile_view.confirm_new_password')"
        :placeholder="$t('profile_view.confirm_new_password')"
        class="py-2 text-xl"
      />
    </div>
  </form>
</template>
