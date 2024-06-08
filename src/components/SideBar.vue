<script setup lang="ts">
import useUserAuthStore from "@/stores/userAuth";
import IconsHouse from "@/components/icons/IconsHouse.vue";
import IconsCamera from "@/components/icons/IconsCamera.vue";

const store = useUserAuthStore();
</script>

<template>
  <div class="flex flex-col gap-10 whitespace-nowrap fill-white">
    <div class="flex items-center gap-5 laptop:gap-6">
      <img
        :src="store.user?.image"
        alt="profile image"
        class="h-10 w-10 rounded-full border-2 object-cover object-center laptop:h-15 laptop:w-15"
        :class="
          $route.name === 'Profile' ? 'border-scarlet' : 'border-transparent'
        "
      />
      <div class="flex flex-col gap-1.5 laptop:gap-0">
        <p
          class="max-w-36 overflow-visible text-xl capitalize leading-5 laptop:text-2xl"
        >
          {{ store.user?.name }}
        </p>
        <RouterLink
          :to="{ name: 'Profile' }"
          class="inline-block text-sm leading-4 text-gray-400 laptop:text-base"
        >
          {{ $t("sidebar.edit_your_profile") }}
        </RouterLink>
      </div>
    </div>
    <RouterLink
      :to="{ name: 'Quotes' }"
      class="flex items-center gap-7 pl-2 text-xl laptop:gap-10 laptop:pl-2.5 laptop:text-2xl"
      active-class="fill-red-500"
    >
      <IconsHouse class="h-6 w-6 fill-inherit laptop:h-auto laptop:w-auto" />
      {{ $t("sidebar.news_feed") }}
    </RouterLink>
    <RouterLink
      :to="{ name: 'Movies' }"
      class="flex items-center gap-7 pl-2.5 text-xl laptop:gap-10 laptop:text-2xl"
      active-class="fill-red-500"
    >
      <IconsCamera class="h-6 w-6 fill-inherit laptop:h-8 laptop:w-8" />
      {{ $t("sidebar.list_of_movies") }}
    </RouterLink>
  </div>
</template>
