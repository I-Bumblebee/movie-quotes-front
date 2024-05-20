<script setup lang="ts">
import SharedLanguageSwitcher from "@/components/shared/SharedLanguageSwitcher.vue";
import useUserAuth from "@/stores/userAuth";
import useModal from "@/stores/modalController";
import BaseRedButton from "@/components/base/BaseRedButton.vue";

const user = useUserAuth();
const modal = useModal();
</script>

<template>
  <header
    class="box-border flex w-full items-center justify-between px-4 py-6 font-helvetica laptop:px-16"
  >
    <RouterLink
      :to="{ name: 'Quotes' }"
      class="-mb-px cursor-pointer font-medium text-almond"
    >
      MOVIE QUOTES
    </RouterLink>
    <div
      class="flex gap-2 text-sm text-white laptop:flex-row-reverse laptop:gap-4 laptop:text-base"
    >
      <button
        v-if="!user.isAuthenticated"
        @click="modal.open('LoginModal')"
        class="cursor-pointer rounded border border-white px-4 pb-1 pt-1.5 hover:bg-white hover:bg-opacity-5 laptop:px-6 laptop:pt-2"
      >
        {{ $t("header.login") }}
      </button>
      <BaseRedButton
        :text="$t('header.register')"
        @click="modal.open('RegisterModal')"
        v-if="!user.isAuthenticated"
        class="laptop:border"
      />
      <button
        v-else
        @click="user.logout"
        class="cursor-pointer rounded border border-white px-5 pb-1 pt-1.5 text-base text-white hover:bg-white hover:bg-opacity-5 laptop:pt-2"
      >
        {{ $t("header.logout") }}
      </button>
      <SharedLanguageSwitcher class="hidden laptop:block" />
    </div>
  </header>
</template>
