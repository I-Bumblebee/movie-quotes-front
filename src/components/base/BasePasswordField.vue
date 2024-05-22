<script setup lang="ts">
import BaseFormField from "@/components/base/BaseFormField.vue";
import { computed, defineProps, ref } from "vue";
import IconsEyeClosed from "@/components/icons/IconsEyeClosed.vue";
import IconsEyeOpen from "@/components/icons/IconsEyeOpen.vue";

type PropTypes = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const props = defineProps<PropTypes>();
const type = ref("password");
const toggleType = () => {
  type.value = type.value === "password" ? "text" : "password";
};
const passwordVisible = computed(() => type.value === "text");
</script>

<template>
  <BaseFormField
    :name="props.name"
    :label="props.label"
    :placeholder="props.placeholder"
    :type="type"
    :required="props.required"
  >
    <IconsEyeOpen
      v-if="passwordVisible"
      @click.prevent.stop="toggleType"
      class="mt-0.5 cursor-pointer fill-stale-gray"
    />
    <IconsEyeClosed
      v-else
      @click.prevent.stop="toggleType"
      class="mt-0.5 cursor-pointer fill-stale-gray"
    />
  </BaseFormField>
</template>

<style scoped>
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
</style>
