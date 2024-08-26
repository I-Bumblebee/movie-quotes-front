<script setup lang="ts">
import BaseFormField from "@/components/base/BaseFormField.vue";

const emit = defineEmits<{
  (e: "edit"): void;
}>();
type PropTypes = {
  label: string;
  value: string;
  editable?: boolean;
  class?: string;
};
const props = withDefaults(defineProps<PropTypes>(), {
  editable: false,
});
</script>

<template>
  <div class="relative flex items-end">
    <BaseFormField
      :name="`disabled-${props.label}`"
      :label="props.label"
      :placeholder="props.value"
      type="text"
      class="laptop:mt-0 laptop:rounded laptop:bg-opacity-100 laptop:px-3.5 laptop:text-xl laptop:placeholder-gray-900"
      :class="`${props.class} -mt-3.5 rounded-none border-0 border-b border-gray-400 border-opacity-50 bg-opacity-0 py-2.5 pl-0 text-lg placeholder-gray-400 `"
      disabled
    />
    <button
      type="button"
      v-if="props.editable"
      @click="emit('edit')"
      class="absolute right-0 mb-3 ml-8 w-8 overflow-visible text-center text-lg text-gray-400 laptop:static laptop:text-xl"
    >
      Edit
    </button>
    <div v-else class="absolute ml-2 w-16 laptop:static"></div>
  </div>
</template>
