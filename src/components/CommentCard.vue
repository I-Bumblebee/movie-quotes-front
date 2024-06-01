<script setup lang="ts">
import type { Comment } from "@/types/quoteTypes";

const props = defineProps<Comment>();
</script>

<template>
  <div class="flex w-full flex-col gap-3 text-xl laptop:gap-0">
    <div class="flex items-center gap-6 font-medium">
      <img
        :src="props.user.image"
        class="h-10 w-10 rounded-full laptop:h-13 laptop:w-13"
        alt="profile picture"
      />
      {{ props.user.name }}
    </div>
    <div class="w-full laptop:pl-19">
      {{ props.comment }}
      <hr class="mt-6 w-full border-0 border-b border-b-whitesmoke/30" />
    </div>
  </div>
</template>
