<script setup lang="ts">
import IconsDots from "@/components/icons/IconsDots.vue";
import IconsComment from "@/components/icons/IconsComment.vue";
import IconsHeart from "@/components/icons/IconsHeart.vue";
import QuoteCardMenu from "@/components/QuoteCardMenu.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { Quote } from "@/types/quoteTypes";

const props = defineProps<Quote>();
const router = useRouter();
const isMenuOpen = ref(false);
</script>

<template>
  <div
    class="relative w-full rounded-none bg-cinder px-9 py-4 laptop:w-7/12 laptop:rounded-lg-plus laptop:px-8 laptop:py-6"
  >
    <button
      @click.stop="isMenuOpen = !isMenuOpen"
      class="absolute bottom-8 right-10 laptop:bottom-auto laptop:right-6 laptop:top-6"
    >
      <IconsDots />
      <QuoteCardMenu
        v-if="isMenuOpen"
        @delete="console.log('delete')"
        @edit="console.log('edit')"
        @show="router.push({ name: 'QuoteDetail', params: { id } })"
        @close="isMenuOpen = false"
        :isOpen="isMenuOpen"
        class="absolute -right-1 bottom-4 laptop:bottom-auto laptop:left-0 laptop:mt-2"
      />
    </button>
    <div
      class="flex flex-col gap-6 laptop:flex-row laptop:items-center laptop:gap-8"
    >
      <img
        :src="props.image"
        alt="quote image"
        class="h-36 w-full max-w-min rounded-sm object-cover object-center laptop:max-w-56"
      />
      <p class="text-2xl italic text-gray-400">"{{ props.quote }}"</p>
    </div>
    <hr class="my-6 block border-0 border-b border-dimgray" />
    <div class="flex gap-6">
      <span class="flex items-center gap-3 text-2xl">
        {{ props.comments_count }}
        <IconsComment />
      </span>
      <span class="flex items-center gap-3 text-2xl">
        {{ props.likes_count }}
        <IconsHeart class="fill-white" />
      </span>
    </div>
  </div>
</template>
