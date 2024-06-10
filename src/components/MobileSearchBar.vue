<script setup lang="ts">
import IconsSearch from "@/components/icons/IconsSearch.vue";
import { useSearchBar } from "@/composables/useSearchBar";
import IconsArrowIcon from "@/components/icons/IconsArrowIcon.vue";
import { computed } from "vue";

const { active, inputRef, inputText, focusInput } = useSearchBar();

const inputIsEmpty = computed(() => inputText.value === "");

// on enter focs set false
</script>

<template>
  <div>
    <button
      @click.stop="
        active = true;
        focusInput();
      "
      class=""
    >
      <IconsSearch class="h-6 w-6 fill-white" />
    </button>
    <div
      class="fixed inset-0 z-50 bg-cinder"
      :class="active ? 'w-full' : 'w-0 overflow-hidden'"
    >
      <div
        class="flex items-center gap-8 border-b border-b-whitesmoke/30 px-8 py-5 text-base leading-5"
      >
        <button @click.stop="active = false">
          <IconsArrowIcon class="h-4 w-4 fill-white" />
        </button>
        <button @click.stop="active = false" class="text-white">Search</button>
      </div>
      <div
        v-show="inputIsEmpty"
        class="pointer-events-none absolute left-20 flex flex-col gap-4 pt-6 text-gray-400"
      >
        <p>
          {{ $t("search_bar.enter") }}
          <span class="text-white">@</span>
          {{ $t("search_bar.to_search_movies") }}
        </p>
        <p>
          {{ $t("search_bar.enter") }}
          <span class="text-white">#</span>
          {{ $t("search_bar.to_search_quotes") }}
        </p>
      </div>
      <input
        v-model="inputText"
        ref="inputRef"
        type="text"
        class="ml-20 mt-6 w-full bg-transparent outline-none"
        @keydown="$event.key === 'Enter' && (active = false)"
      />
    </div>
  </div>
</template>
