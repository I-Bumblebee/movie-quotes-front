<script setup lang="ts">
import IconsX from "@/components/icons/IconsX.vue";
import IconsInvalidAlert from "@/components/icons/IconsInvalidAlert.vue";
import IconsCheckMark from "@/components/icons/IconsCheckMark.vue";
import { useField } from "vee-validate";
import { computed, defineProps, ref } from "vue";

type PropTypes = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  class?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<PropTypes>(), {
  required: false,
  disabled: false,
});

const isDeleteButtonVisible = ref(false);

const { value, meta, errors, resetField } = useField(props.name);

const valid = computed(() => meta.dirty && meta.valid);
const invalid = computed(() => meta.dirty && !meta.valid);

const hideDeleteIcon = () => {
  isDeleteButtonVisible.value = false;
};
</script>

<template>
  <div v-click-outside="() => hideDeleteIcon()" class="w-full">
    <label
      class="relative flex w-full flex-col gap-1.5 font-helvetica text-base leading-4 text-gray-700"
    >
      <span class="font-helvetica text-base text-white">
        {{ props.label }}
        <span
          v-if="props.required"
          class="text-lg leading-6 text-cardinal"
          aria-hidden="true"
        >
          *
        </span>
      </span>
      <span class="relative">
        <input
          v-model="value"
          :disabled="props.disabled"
          :type="props.type"
          :name="props.name"
          :placeholder="props.placeholder"
          class="w-full rounded border bg-gray-400 px-3.5 py-1.5 text-base text-gray-900 placeholder-stale-gray outline-none"
          :class="[
            props.class,
            valid && 'border-seagreen',
            invalid && 'border-cardinal',
            !(valid || invalid) &&
              'border-gray-400 focus:ring-4 focus:ring-indigo focus:ring-opacity-20',
          ]"
          @focus="isDeleteButtonVisible = true"
          @keydown.enter.tab="isDeleteButtonVisible = false"
        />
        <span
          class="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 translate-x-1/2 gap-2"
        >
          <slot>
            <IconsX
              @click.stop="resetField"
              v-if="!!value && isDeleteButtonVisible"
            />
            <IconsCheckMark v-else-if="valid" />
            <IconsInvalidAlert v-else-if="invalid" />
          </slot>
        </span>
      </span>
    </label>
    <ul v-if="invalid" class="m-0 mt-1.5 flex list-none flex-col gap-1 p-0">
      <li
        v-for="(error, index) in errors"
        :key="index"
        class="text-sm capitalize text-cardinal"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>
