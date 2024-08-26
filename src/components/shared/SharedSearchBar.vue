<script setup lang="ts">
import IconsSearch from "@/components/icons/IconsSearch.vue";
import { useSearchBar } from "@/composables/useSearchBar";

const props = defineProps<{
  page?: "movieList" | "quoteList";
}>();
const { active, inputRef, inputText, focusInput } = useSearchBar();
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
      <IconsSearch class="h-5 w-5 min-w-5 fill-gray-400" />
      <transition name="fade" type="transition">
        <span
          v-show="active && !inputText"
          class="absolute ml-9 whitespace-nowrap text-gray-400/80"
        >
          {{ $t("search_bar.enter") }}
          <span class="text-white">@</span>
          {{ $t("search_bar.to_search_movies") }}
          <span v-if="props.page === 'quoteList'">
            , {{ $t("search_bar.enter") }}
            <span class="text-white">#</span>
            {{ $t("search_bar.to_search_quotes") }}
          </span>
        </span>
      </transition>
    </div>
    <input
      v-model="inputText"
      ref="inputRef"
      type="text"
      class="bg-transparent placeholder-gray-400 outline-none transition-all duration-200 ease-in-out"
      :class="{
        'w-18 ': !active,
        'w-2xl': active,
      }"
      :placeholder="!active ? $t('search_bar.search_by') : ''"
      @keydown.enter="
        active = false;
        ($event.target as HTMLInputElement).blur();
      "
    />
    <hr
      v-show="active"
      class="absolute -bottom-4 left-0 w-full overflow-hidden border-0 border-b border-stale-gray"
    />
  </div>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 400ms ease-in-out;
}
.fade-leave-active {
  transition: opacity 90ms ease-in-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
