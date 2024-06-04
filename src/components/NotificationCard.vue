<script setup lang="ts">
import type { Notification } from "@/types";
import IconsQuote from "@/components/icons/IconsQuote.vue";
import IconsHeartFilled from "@/components/icons/IconsHeartFilled.vue";
import { ref } from "vue";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

const props = defineProps<Notification>();
const { locale } = useI18n();
const emit = defineEmits<{
  (e: "click:viewQuote", id: number): void;
}>();

const timeAgo = ref(dayjs(props.created_at).locale(locale.value).fromNow());
</script>

<template>
  <div
    @click.stop="emit('click:viewQuote', props.quote_id)"
    class="flex w-full cursor-pointer flex-col gap-2.5 rounded border border-stale-gray/50 p-4 pr-8 laptop:flex-row laptop:items-center laptop:justify-between laptop:gap-0 laptop:p-5 laptop:pl-6"
  >
    <div class="flex items-center gap-2 laptop:gap-6">
      <img
        :src="props.initiator.image"
        alt="initiators profile image"
        class="h-12 w-12 rounded-full laptop:h-20 laptop:w-20"
        :class="!props.is_read && 'border-2 border-seagreen'"
      />
      <div class="flex flex-col laptop:gap-3 laptop:text-xl">
        <p class="text-xl">{{ props.initiator.name }}</p>
        <div
          v-if="props.type === 'Comment'"
          class="flex items-center gap-3 text-gray-400"
        >
          <IconsQuote class="h-5 w-6 fill-crimson" />
          <p class="max-w-56 truncate laptop:max-w-full">
            {{ $t("notifications.commented_on_your_quote") }}
          </p>
        </div>
        <div v-else class="flex items-center gap-3 text-gray-400">
          <IconsHeartFilled class="fill-crimson" />
          <p class="max-w-56 truncate laptop:max-w-full">
            {{ $t("notifications.reacted_on_your_quote") }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex gap-3 laptop:flex-col-reverse laptop:gap-6">
      <p
        v-if="!props.is_read"
        class="w-12 text-center text-seagreen laptop:w-auto laptop:text-end"
      >
        {{ $t("notifications.new") }}
      </p>
      <p v-else class="h-6 w-12"></p>
      <p class="text-gainsboro">{{ timeAgo }}</p>
    </div>
  </div>
</template>
