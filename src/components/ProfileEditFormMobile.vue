<script setup lang="ts">
import BaseFormField from "@/components/base/BaseFormField.vue";
import BasePasswordField from "@/components/base/BasePasswordField.vue";

const props = defineProps<{
  editingPassword: boolean;
  editingName: boolean;
}>();

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>

<template>
  <form
    @submit.prevent="emit('submit')"
    v-if="props.editingPassword || props.editingName"
    class="w-full rounded-xl bg-white/5 px-8 py-20 laptop:hidden"
    @keydown.enter="emit('submit')"
  >
    <BaseFormField
      v-if="props.editingName"
      name="name"
      :label="$t('profile_view.new_username')"
      type="text"
      :placeholder="$t('profile_view.enter_new_username')"
      class="py-2.5 text-xl"
    />
    <div v-else-if="props.editingPassword">
      <BasePasswordField
        name="password"
        :label="$t('profile_view.new_password')"
        :placeholder="$t('profile_view.enter_new_password')"
        class="py-2 text-xl"
      />
      <br />
      <BasePasswordField
        name="password_confirmation"
        :label="$t('profile_view.confirm_new_password')"
        :placeholder="$t('profile_view.confirm_new_password')"
        class="py-2 text-xl"
      />
    </div>
  </form>
</template>
