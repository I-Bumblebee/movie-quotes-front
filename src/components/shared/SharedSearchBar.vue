<script setup lang="ts">
import IconsSearch from "@/components/icons/IconsSearch.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const active = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const inputText = ref("");
const router = useRouter();
const timer = ref<NodeJS.Timeout | null>(null);

const props = defineProps<{
  page?: "movieList" | "quoteList";
}>();

watch(inputText, () => {
  const input = inputText.value.trim();
  if (timer.value) {
    clearTimeout(Number(timer.value));
  }
  timer.value = setTimeout(() => {
    if (input.startsWith("@")) {
      router.push({ query: { "filter[title]": input.slice(1) } });
    } else if (input.startsWith("#")) {
      router.push({ query: { "filter[quote]": input } });
    } else {
      router.push({ query: { "filter[title]": "" } });
    }
  }, 550);
});

const focusInput = () => {
  if (inputRef.value) {
    (inputRef.value as HTMLInputElement).focus();
  }
};
</script>

<template>
  <div
    v-click-outside="() => (active = false)"
    @click.stop="
      active = true;
      focusInput();
    "
    class="relative inline-flex items-center justify-end gap-4 text-xl"
  >
    <div class="relative flex cursor-pointer items-center gap-4">
      <IconsSearch class="h-5 w-5 min-w-5" />
      <span v-show="!active"> {{ $t("search_bar.search_by") }} </span>
      <span
        v-show="active && !inputText"
        class="absolute ml-9 whitespace-nowrap text-gray-400"
      >
        {{ $t("search_bar.enter") }}
        <span class="text-white">@</span>
        {{ $t("search_bar.to_search_movies") }}
        <span v-if="props.page === 'quoteList'">
          <span class="text-white">#</span>
          , {{ $t("search_bar.enter") }}
          <span class="text-white">#</span>
          {{ $t("search_bar.to_search_quotes") }}
        </span>
      </span>
    </div>
    <input
      v-model="inputText"
      ref="inputRef"
      type="text"
      class="bg-transparent outline-none transition-all"
      :class="{
        'w-0 ': !active,
        'w-2xl': active,
      }"
    />
    <hr
      v-show="active"
      class="absolute -bottom-4 left-0 w-full border-0 border-b border-stale-gray"
    />
  </div>
</template>
