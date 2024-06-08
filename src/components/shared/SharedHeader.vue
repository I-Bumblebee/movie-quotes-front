<script setup lang="ts">
import SharedLanguageSwitcher from "@/components/shared/SharedLanguageSwitcher.vue";
import useUserAuth from "@/stores/userAuth";
import useModal from "@/stores/modalController";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import NotificationDropdown from "@/components/NotificationDropdown.vue";
import IconsBurger from "@/components/icons/IconsBurger.vue";
import NavigationDropdown from "@/components/NavigationDropdown.vue";
import { computed, ref } from "vue";
import MobileSearchBar from "@/components/MobileSearchBar.vue";
import { useRoute } from "vue-router";

const user = useUserAuth();
const modal = useModal();
const isDropdownOpen = ref(false);

const route = useRoute();

const onHomePage = computed(() => route.name === "Home");
</script>

<template>
  <header
    class="box-border flex w-full items-center justify-between px-4 font-helvetica laptop:px-18"
    :class="onHomePage ? 'px-4 py-6' : 'px-9 py-7'"
  >
    <RouterLink
      :to="{ name: 'Quotes' }"
      class="-mb-px cursor-pointer font-medium text-almond"
      :class="!onHomePage && 'hidden laptop:block'"
    >
      MOVIE QUOTES
    </RouterLink>
    <div v-if="!onHomePage" class="relative laptop:hidden">
      <button @click.stop="isDropdownOpen = true">
        <IconsBurger class="cursor-pointer" />
      </button>
      <NavigationDropdown
        @close="isDropdownOpen = false"
        :isOpen="isDropdownOpen"
        class="fixed left-0 top-0"
      />
    </div>
    <div
      class="flex items-stretch gap-2 text-sm text-white laptop:flex-row-reverse laptop:gap-10 laptop:text-base"
      :class="!user.isAuthenticated && 'laptop:gap-4'"
    >
      <button
        v-if="!user.isAuthenticated"
        @click="modal.open('LoginModal')"
        class="cursor-pointer rounded border border-white px-4 hover:bg-white hover:bg-opacity-5 laptop:px-6"
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
        :class="!onHomePage && 'hidden laptop:block'"
      >
        {{ $t("header.logout") }}
      </button>
      <SharedLanguageSwitcher class="hidden laptop:block" />
      <MobileSearchBar
        v-if="$route.name === 'Quotes'"
        class="mr-3.5 block laptop:hidden"
      />
      <NotificationDropdown v-if="user.isAuthenticated" />
    </div>
  </header>
</template>
