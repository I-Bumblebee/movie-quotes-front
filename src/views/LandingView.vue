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
      class="flex flex-col items-center gap-8 bg-landing-view-gradient bg-200 pb-36 pt-48 laptop:aspect-auto laptop:h-screen laptop:bg-landing-view-gradient-laptop laptop:bg-auto laptop:bg-fixed laptop:p-0 laptop:pt-84"
    >
      <h1
        class="max-w-72 text-wrap text-center font-montserrat text-2xl font-bold text-almond laptop:max-w-3xl laptop:text-6xl laptop:leading-normal"
      >
        {{ $t("landing.heading") }}
      </h1>
      <BaseRedButton
        @click="modal.open('LoginModal')"
        :text="$t('landing.get_started')"
        class="py-2.5 laptop:px-4 laptop:text-xl"
      />
    </div>
    <div class="relative laptop:-mt-60">
      <div
        class="flex aspect-auto h-screen items-center bg-movie-interstellar bg-cover bg-fixed bg-center bg-no-repeat laptop:shadow-overlay-lg"
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
        class="relative flex h-screen items-center bg-movie-royal-tenenbaums bg-cover bg-fixed bg-center bg-no-repeat bg-blend-multiply laptop:bg-movie-royal-tenenbaums-with-gradient"
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
        class="flex h-screen items-center bg-movie-lord-of-rings bg-cover bg-fixed bg-right bg-no-repeat laptop:shadow-overlay-lg"
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
        class="absolute inset-0 -mt-13 box-content bg-landing-view-section-overlay laptop:mt-0 laptop:bg-landing-view-section-overlay-laptop"
      ></div>
    </div>
    <div class="bg-gradient-radial px-8 py-2.5 laptop:px-16 laptop:py-3.5">
      <p
        class="ml-1.5 text-xs-minus font-medium uppercase text-almond laptop:ml-0.5 laptop:text-xs"
      >
        {{ $t("landing.footer_cc") }}
      </p>
    </div>
  </section>
</template>

<style>
.test {
  //background-image: linear-gradient(
  //  180deg,
  //  hsl(240deg 24% 4%) 0%,
  //  hsl(241deg 24% 4%) 5%,
  //  hsl(241deg 24% 5%) 9%,
  //  hsl(242deg 24% 5%) 14%,
  //  hsl(242deg 24% 6%) 18%,
  //  hsl(243deg 24% 6%) 23%,
  //  hsl(243deg 24% 6%) 27%,
  //  hsl(244deg 24% 7%) 32%,
  //  hsl(244deg 24% 7%) 36%,
  //  hsl(245deg 24% 7%) 41%,
  //  hsl(245deg 24% 8%) 45%,
  //  hsl(246deg 24% 8%) 50%,
  //  hsl(246deg 21% 9%) 55%,
  //  hsl(246deg 19% 10%) 59%,
  //  hsl(246deg 16% 11%) 64%,
  //  hsl(246deg 14% 12%) 68%,
  //  hsl(246deg 12% 13%) 73%,
  //  hsl(246deg 10% 14%) 77%,
  //  hsl(246deg 8% 15%) 82%,
  //  hsl(246deg 6% 16%) 86%,
  //  hsl(246deg 4% 17%) 91%,
  //  hsl(246deg 2% 18%) 95%,
  //  hsl(0deg 0% 19%) 100%
  //);
  //background-image: linear-gradient(
  //  180deg,
  //  hsl(240deg 24% 4%) 0%,
  //  hsl(240deg 22% 5%) 5%,
  //  hsl(250deg 25% 5%) 9%,
  //  hsl(240deg 26% 5%) 14%,
  //  hsl(240deg 24% 6%) 18%,
  //  hsl(240deg 23% 6%) 23%,
  //  hsl(248deg 25% 6%) 27%,
  //  hsl(248deg 24% 7%) 32%,
  //  hsl(240deg 22% 7%) 36%,
  //  hsl(240deg 23% 8%) 41%,
  //  hsl(246deg 25% 8%) 45%,
  //  hsl(246deg 24% 8%) 50%,
  //  hsl(246deg 24% 16%) 55%,
  //  hsl(246deg 24% 25%) 59%,
  //  hsl(246deg 24% 33%) 64%,
  //  hsl(246deg 24% 42%) 68%,
  //  hsl(246deg 24% 50%) 73%,
  //  hsl(246deg 24% 58%) 77%,
  //  hsl(246deg 24% 67%) 82%,
  //  hsl(246deg 23% 75%) 86%,
  //  hsl(246deg 25% 83%) 91%,
  //  hsl(246deg 24% 92%) 95%,
  //  hsl(0deg 0% 100%) 100%
  //);
  //background-image: linear-gradient(
  //  rgba(17, 16, 26, 1) 0%,
  //  rgba(8, 8, 13, 1) 50%,
  //  rgba(255, 255, 255, 1) 100%
  //);
}
</style>
