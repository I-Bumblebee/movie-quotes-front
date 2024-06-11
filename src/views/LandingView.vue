<script setup lang="ts">
import SharedHeader from "@/components/shared/SharedHeader.vue";
import BaseRedButton from "@/components/base/BaseRedButton.vue";
import useModal from "@/stores/modalController";

const modal = useModal();
</script>

<template>
  <SharedHeader class="absolute" />
  <section>
    <div
      class="bg-landing-view-gradient bg-200 laptop:bg-150 laptop:pt-84 flex flex-col items-center gap-8 pb-36 pt-48 laptop:aspect-auto laptop:h-screen laptop:p-0"
    >
      <h1
        class="max-w-72 text-wrap text-center font-montserrat text-2xl font-bold text-almond laptop:max-w-3xl laptop:text-6xl laptop:leading-normal"
      >
        {{ $t("landing.heading") }}
      </h1>
      <BaseRedButton
        @click="modal.open('RegisterModal')"
        :text="$t('landing.get_started')"
        class="py-2.5 laptop:px-4 laptop:text-xl"
      />
    </div>
    <div class="relative laptop:-mt-60">
      <div
        class="flex aspect-square items-center bg-movie-interstellar bg-cover bg-center bg-no-repeat laptop:aspect-auto laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
      >
        <div class="z-10 ml-9 flex gap-2 text-white laptop:ml-40 laptop:gap-8">
          <span
            class="text-center text-xl laptop:text-5xl laptop:leading-relaxed"
          >
            ―
          </span>
          <div
            class="flex max-w-80 flex-col gap-2.5 laptop:max-w-3xl laptop:gap-6"
          >
            <h2
              class="align-text-center font-montserrat text-xl font-bold tracking-tight laptop:text-5xl laptop:leading-relaxed"
            >
              “{{ $t("landing.movie_interstellar.quote") }}“
            </h2>
            <p
              class="font-helvetica text-base font-bold text-gainsboro laptop:text-3xl"
            >
              {{ $t("landing.movie_interstellar.title") }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="laptop:bg-movie-royal-tenenbaums-with-gradient relative flex aspect-square items-center bg-movie-royal-tenenbaums bg-cover bg-center bg-no-repeat bg-blend-multiply laptop:aspect-auto laptop:h-screen laptop:bg-fixed"
      >
        <div class="z-10 ml-9 flex gap-2 text-white laptop:ml-40 laptop:gap-8">
          <span
            class="text-center text-xl laptop:text-5xl laptop:leading-relaxed"
          >
            ―
          </span>
          <div
            class="flex max-w-80 flex-col gap-2.5 laptop:max-w-3xl laptop:gap-0"
          >
            <h2
              class="align-text-center font-montserrat text-xl font-bold tracking-tight laptop:text-5xl laptop:leading-relaxed"
            >
              “{{ $t("landing.movie_royal_tenenbaums.quote") }}“
            </h2>
            <p
              class="font-helvetica text-base font-bold text-gainsboro laptop:text-3xl"
            >
              {{ $t("landing.movie_royal_tenenbaums.title") }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex aspect-square items-center bg-movie-lord-of-rings bg-cover bg-right bg-no-repeat laptop:aspect-auto laptop:h-screen laptop:bg-fixed laptop:shadow-overlay-lg"
      >
        <div class="z-10 ml-9 flex gap-2 text-white laptop:ml-40 laptop:gap-8">
          <span
            class="text-center text-xl laptop:text-5xl laptop:leading-relaxed"
          >
            ―
          </span>
          <div
            class="flex max-w-80 flex-col gap-2.5 laptop:max-w-3xl laptop:gap-0"
          >
            <h2
              class="align-text-center font-montserrat text-xl font-bold tracking-tight laptop:text-5xl laptop:leading-relaxed"
            >
              “{{ $t("landing.movie_lord_of_the_rings.quote") }}“
            </h2>
            <p
              class="font-helvetica text-base font-bold text-gainsboro laptop:text-3xl"
            >
              {{ $t("landing.movie_lord_of_the_rings.title") }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="bg-landing-view-section-overlay laptop:bg-landing-view-section-overlay-laptop absolute inset-0 -translate-y-10 laptop:translate-y-0"
      />
    </div>
    <div class="bg-gradient-radial px-8 py-2.5 laptop:px-16 laptop:py-3.5">
      <p
        class="text-xs-minus ml-1.5 font-medium uppercase text-almond laptop:ml-0.5 laptop:text-xs"
      >
        {{ $t("landing.footer_cc") }}
      </p>
    </div>
  </section>
</template>
