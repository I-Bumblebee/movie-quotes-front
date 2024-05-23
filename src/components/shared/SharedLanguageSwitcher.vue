<script setup lang="ts">
import { ref } from "vue";
import IconsCaret from "@/components/icons/IconsCaret.vue";
import Cookies from "js-cookie";
import { useI18n } from "vue-i18n";
import { setLocale } from "@vee-validate/i18n";

const languages: Record<string, string> = {
  en: "Eng",
  ka: "Geo",
};

const { locale, availableLocales } = useI18n();
console.log(locale.value);

const selectedLanguage = ref(locale.value);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectLanguage = (lang: string) => {
  isDropdownOpen.value = false;
  window.location.reload();
  Cookies.set("locale", lang, { expires: 365 });

  selectedLanguage.value = lang as keyof typeof availableLocales.values;
  locale.value = lang as keyof typeof availableLocales.values;
  setLocale(lang);
};
</script>

<template>
  <div class="relative m-auto w-14">
    <div @click="toggleDropdown" class="w-full cursor-pointer">
      {{ languages[selectedLanguage] }}
      <IconsCaret
        class="absolute right-1 top-1 transition duration-300"
        :class="isDropdownOpen ? '-rotate-90 transform' : 'rotate-0 transform'"
      />
    </div>
    <div
      v-if="isDropdownOpen"
      class="absolute mt-2 flex w-full flex-col gap-1.5 bg-transparent"
    >
      <div
        v-for="(label, lang) in languages"
        :key="lang"
        @click="selectLanguage(lang)"
        class="cursor-pointer"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>
