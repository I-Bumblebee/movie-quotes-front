import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import ka from "@/locales/ka.json";
import Cookies from "js-cookie";

const locale = Cookies.get("locale") || "en";

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale,
  fallbackLocale: "en",
  messages: {
    en,
    ka,
  },
});

export default i18n;
