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
  required: boolean;
};

const props = defineProps<PropTypes>();

const isFocused = ref(false);
const { value, meta, errors, resetField } = useField(props.name, undefined, {
  bails: false,
});

const valid = computed(() => meta.dirty && meta.valid);
const invalid = computed(() => meta.dirty && !meta.valid);
</script>

<template>
  <div
    v-click-outside="() => (isFocused = false)"
    @click.stop="isFocused = true"
  >
    <label
      class="group relative flex w-full flex-col gap-1.5 font-helvetica text-base font-medium leading-4 text-gray-700"
    >
      <span class="-mb-1 font-helvetica text-base text-white">
        {{ props.label }}
        <span
          v-if="props.required"
          class="text-lg leading-6 text-cardinal"
          aria-hidden="true"
        >
          *
        </span>
      </span>
      <input
        v-model="value"
        :type="props.type"
        :name="props.name"
        :placeholder="props.placeholder"
        class="w-full rounded border bg-gray-400 p-4 px-3 pb-1 pt-2 text-base text-gray-900 placeholder-stale-gray outline-none ring-offset-0"
        :class="[
          valid && 'border-seagreen',
          invalid && 'border-cardinal',
          !(valid || invalid) &&
            'border-gray-400 focus:ring-4 focus:ring-indigo focus:ring-opacity-20',
        ]"
      />
      <span class="absolute right-2.5 top-9 flex gap-2">
        <slot />
        <IconsX
          @click="resetField"
          v-if="!!value && isFocused"
          class="mt-0.5"
        />
        <IconsCheckMark v-else-if="valid" />
        <IconsInvalidAlert v-else-if="invalid" />
      </span>
    </label>
    <div v-if="invalid" class="mt-1.5 flex flex-col gap-1">
      <p
        v-for="(error, index) in errors"
        :key="index"
        class="text-sm capitalize text-cardinal"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
