<script setup lang="ts">
import useUserAuthStore from "@/stores/userAuth";
import IconsHouse from "@/components/icons/IconsHouse.vue";
import IconsCamera from "@/components/icons/IconsCamera.vue";

const store = useUserAuthStore();
</script>

<template>
  <div class="flex flex-col gap-10 whitespace-nowrap fill-white">
    <div class="flex items-center gap-6">
      <img
        :src="store.user?.image"
        alt="profile image"
        class="h-15 w-15 rounded-full border-2 object-cover object-center"
        :class="
          $route.name === 'Profile' ? 'border-scarlet' : 'border-transparent'
        "
      />
      <div class="flex flex-col gap-2.5">
        <p class="max-w-36 overflow-visible text-2xl capitalize leading-5">
          {{ store.user?.name }}
        </p>
        <RouterLink
          :to="{ name: 'Profile' }"
          class="inline-block text-base leading-4 text-gray-400"
        >
          {{ $t("sidebar.edit_your_profile") }}
        </RouterLink>
      </div>
    </div>
    <RouterLink
      :to="{ name: 'Quotes' }"
      class="flex items-center gap-10 pl-2.5 text-2xl"
      active-class="fill-red-500"
    >
      <IconsHouse class="fill-inherit" />
      {{ $t("sidebar.news_feed") }}
    </RouterLink>
    <RouterLink
      :to="{ name: 'Movies' }"
      class="flex items-center gap-10 pl-2.5 text-2xl"
      active-class="fill-red-500"
    >
      <IconsCamera class="fill-inherit" />
      {{ $t("sidebar.list_of_movies") }}
    </RouterLink>
  </div>
</template>
