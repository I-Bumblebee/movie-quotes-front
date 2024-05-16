<script setup lang="ts">
import SharedLanguageSwitcher from "@/components/shared/SharedLanguageSwitcher.vue";
</script>

<template>
  <header
    class="fixed top-6 z-50 box-border flex w-full items-center justify-between px-4 font-helvetica laptop:px-16"
  >
    <RouterLink
      :to="{ name: 'movie-quotes' }"
      class="cursor-pointer font-medium text-almond"
      >MOVIE QUOTES</RouterLink
    >
    <div
      class="flex gap-2 text-sm text-white laptop:flex-row-reverse laptop:gap-4 laptop:text-base"
    >
      <RouterLink
        :to="{ name: 'login' }"
        class="cursor-pointer rounded border border-white px-4 pb-1 pt-1.5 hover:bg-white hover:bg-opacity-5 laptop:px-6 laptop:pt-2"
      >
        {{ $t("landing.login") }}
      </RouterLink>
      <RouterLink
        :to="{ name: 'register' }"
        class="cursor-pointer rounded border border-scarlet bg-scarlet px-4 pb-1 pt-1.5 hover:bg-firebrick laptop:px-6 laptop:pt-2"
      >
        {{ $t("landing.register") }}
      </RouterLink>
      <SharedLanguageSwitcher class="hidden laptop:block" />
    </div>
  </header>

  <section>
    <div
      class="flex h-screen w-screen flex-col items-center gap-8 bg-red-200 bg-gradient-radial bg-cover bg-center bg-no-repeat pt-64 laptop:bg-fixed laptop:pt-80"
    >
      <h1
        class="max-w-72 text-wrap text-center font-montserrat text-2xl font-bold text-almond laptop:max-w-3xl laptop:text-6xl"
      >
        {{ $t("landing.heading") }}
      </h1>
      <RouterLink
        :to="{ name: 'register' }"
        class="cursor-pointer rounded border border-scarlet bg-scarlet px-4 pb-1.5 pt-3 font-helvetica text-base text-white laptop:text-xl"
      >
        {{ $t("landing.get_started") }}
      </RouterLink>
    </div>
    <div
      class="bg-movie-interstellar -mt-40 flex h-screen-3/4 w-screen items-center bg-cover bg-center bg-no-repeat shadow-overlay laptop:-mt-80 laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
    >
      <div class="ml-9 flex gap-2 text-white laptop:ml-40 laptop:gap-8">
        <span class="text-center text-xl laptop:text-5xl">―</span>
        <div class="flex max-w-80 flex-col gap-8 laptop:max-w-3xl">
          <h2
            class="align-text-center font-montserrat text-xl font-bold tracking-tight laptop:text-5xl"
          >
            "{{ $t("landing.movie_interstellar.quote") }}"
          </h2>
          <p class="font-helvetica text-base font-bold laptop:text-3xl">
            {{ $t("landing.movie_interstellar.title") }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="bg-movie-royal-tenenbaums flex h-screen-3/4 w-screen items-center bg-cover bg-center bg-no-repeat shadow-overlay laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
    >
      <div class="ml-9 flex gap-2 text-white laptop:ml-40 laptop:gap-8">
        <span class="text-center text-xl laptop:text-5xl">―</span>
        <div class="flex max-w-66 flex-col gap-8 laptop:max-w-3xl">
          <h2
            class="align-text-center font-montserrat text-xl font-bold tracking-tight laptop:text-5xl"
          >
            "{{ $t("landing.movie_royal_tenenbaums.quote") }}"
          </h2>
          <p class="font-helvetica text-base font-bold laptop:text-3xl">
            {{ $t("landing.movie_royal_tenenbaums.title") }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="bg-movie-lord-of-rings flex h-screen-3/4 w-screen items-center bg-cover bg-center bg-no-repeat shadow-overlay laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
    >
      <div class="ml-9 flex gap-2 text-white laptop:ml-40 laptop:gap-8">
        <span class="text-center text-xl laptop:text-5xl">―</span>
        <div class="flex max-w-66 flex-col gap-8 laptop:max-w-3xl">
          <h2
            class="align-text-center font-montserrat text-xl font-bold tracking-tight laptop:text-5xl"
          >
            "{{ $t("landing.movie_lord_of_the_rings.quote") }}"
          </h2>
          <p class="font-helvetica text-base font-bold laptop:text-3xl">
            {{ $t("landing.movie_lord_of_the_rings.title") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
