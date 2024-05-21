<script setup lang="ts">
import GandalfImage from "@/assets/images/gandalf.svg";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
</script>

<template>
  <section
    class="flex h-screen items-center justify-center bg-gradient-radial font-helvetica"
  >
    <div class="mb-24 flex flex-col items-center gap-4 laptop:mb-32">
      <img :src="GandalfImage" alt="ghost image mx-auto" class="max-w-56" />

      <h1 class="mt-6 text-2xl font-bold text-white laptop:text-5xl">
        {{ $t("unauthorized.heading") }}
      </h1>
      <p
        class="max-w-72 text-center text-base font-semibold text-white laptop:text-2xl"
      >
        {{ $t("unauthorized.message") }}
      </p>
      <BaseRedButton
        @click="() => $router.replace({ name: 'Home' })"
        :text="$t('unauthorized.action_name')"
        class="mt-2 border laptop:mt-9 laptop:px-4 laptop:pb-1.5 laptop:pt-3 laptop:text-xl"
      />
    </div>
  </section>
</template>
