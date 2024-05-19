<script setup lang="ts">
import SharedHeader from "@/components/shared/SharedHeader.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import useModal from "@/stores/modalController";

const modal = useModal();
</script>

<template>
  <SharedHeader class="fixed" />
  <section>
    <div
      class="flex h-screen w-screen flex-col items-center gap-8 bg-red-200 bg-gradient-radial bg-cover bg-center bg-no-repeat pt-64 laptop:bg-fixed laptop:pt-80"
    >
      <h1
        class="max-w-72 text-wrap text-center font-montserrat text-2xl font-bold text-almond laptop:max-w-3xl laptop:text-6xl"
      >
        {{ $t("landing.heading") }}
      </h1>
      <BaseRedButton
        @click="modal.open('RegisterModal')"
        :text="$t('landing.get_started')"
        class="border pb-1.5 pt-3 laptop:px-4 laptop:text-xl"
      />
    </div>
    <div
      class="-mt-40 flex h-screen-3/4 w-screen items-center bg-movie-interstellar bg-cover bg-center bg-no-repeat shadow-overlay laptop:-mt-80 laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
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
      class="flex h-screen-3/4 w-screen items-center bg-movie-royal-tenenbaums bg-cover bg-center bg-no-repeat shadow-overlay laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
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
      class="flex h-screen-3/4 w-screen items-center bg-movie-lord-of-rings bg-cover bg-center bg-no-repeat shadow-overlay laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
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
