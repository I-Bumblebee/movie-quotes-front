<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, nextTick } from "vue";

type PropTypes = {
  name: string;
  label?: string;
  language?: string;
  placeholder?: string;
  placeholderClass?: string;
  disabled?: boolean;
  textarea?: boolean;
  defaultValue?: string;
};

const props = withDefaults(defineProps<PropTypes>(), {
  disabled: false,
  textarea: false,
});

const {
  value: fieldValue,
  errors,
  meta,
} = useField(props.name, undefined, {
  bails: false,
  initialValue: props.defaultValue && `“${props.defaultValue}”`,
});

const filled = computed(() => !!fieldValue.value);

const setCaretToEnd = (el: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLElement;
  fieldValue.value = target.innerText.trim();
  nextTick(() => setCaretToEnd(target));
};
</script>

<template>
  <div>
    <div
      class="group rounded border border-stale-gray/70 bg-cinder px-3.5 py-2.5 outline-none"
    >
      <span
        v-if="props.label"
        class="pointer-events-none float-left inline pr-2 not-italic leading-7 group-focus-within:font-medium group-focus-within:text-stale-gray laptop:group-focus-within:text-base laptop:group-focus-within:leading-7"
        :class="
          filled
            ? 'text-base font-medium text-stale-gray laptop:text-base laptop:leading-7'
            : 'laptop:text-xl'
        "
      >
        {{ props.label }}:
      </span>
      <span
        v-if="!filled && props.placeholder"
        class="pointer-events-none float-left leading-7"
        :class="placeholderClass"
      >
        {{ props.placeholder }}
      </span>
      <span
        v-if="props.language"
        class="pointer-events-none float-right pl-2 not-italic leading-7 text-stale-gray laptop:text-xl"
      >
        {{ props.language }}
      </span>
      <p
        @focusin="setCaretToEnd($event.target as HTMLElement)"
        @input="handleInput"
        :contenteditable="!props.disabled"
        class="resize-y whitespace-pre-wrap break-words break-all leading-7 outline-none"
        :class="{ 'min-h-20': props.textarea }"
      >
        {{ fieldValue || " " }}
      </p>
    </div>
    <ul v-show="!meta.valid" class="ml-1">
      <li
        v-for="(error, index) in errors"
        :key="index"
        class="text-sm text-scarlet"
      >
        • {{ error }}
      </li>
    </ul>
  </div>
</template>
