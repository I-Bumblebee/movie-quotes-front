<script setup lang="ts">
import SharedLanguageSwitcher from "@/components/shared/SharedLanguageSwitcher.vue";
import useUserAuth from "@/stores/userAuth";
import useModal from "@/stores/modalController";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import NotificationDropdown from "@/components/NotificationDropdown.vue";

const user = useUserAuth();
const modal = useModal();
</script>

<template>
  <header
    class="box-border flex w-full items-center justify-between px-4 py-6 font-helvetica laptop:px-18"
  >
    <RouterLink
      :to="{ name: 'Quotes' }"
      class="-mb-px cursor-pointer font-medium text-almond"
    >
      MOVIE QUOTES
    </RouterLink>
    <div
      class="flex items-center gap-2 text-sm text-white laptop:flex-row-reverse laptop:gap-10 laptop:text-base"
      :class="!user.isAuthenticated && 'laptop:gap-4'"
    >
      <button
        v-if="!user.isAuthenticated"
        @click="modal.open('LoginModal')"
        class="cursor-pointer rounded border border-white px-4 py-1.5 hover:bg-white hover:bg-opacity-5 laptop:px-6"
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
        class="cursor-pointer rounded border border-white px-5 py-1.5 text-base text-white hover:bg-white hover:bg-opacity-5"
      >
        {{ $t("header.logout") }}
      </button>
      <SharedLanguageSwitcher class="hidden laptop:block" />
      <NotificationDropdown v-if="user.isAuthenticated" />
    </div>
  </header>
</template>
