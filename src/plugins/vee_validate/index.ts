import { defineRule, configure } from "vee-validate";
import {
  localize,
  type RootI18nDictionary,
  setLocale,
} from "@vee-validate/i18n";
import en from "@/locales/en.json";
import ka from "@/locales/ka.json";
import {
  required,
  email,
  confirmed,
  min,
  max,
  alpha_num as alphaNum,
  numeric,
  length,
} from "@vee-validate/rules";
import Cookies from "js-cookie";

defineRule("required", required);
defineRule("email", email);
defineRule("confirmed", confirmed);
defineRule("min", min);
defineRule("max", max);
defineRule("alpha_num", alphaNum);
defineRule("numeric", numeric);
defineRule("length", length);
defineRule("georgian", (value: string) => {
  const pattern = /^[ა-ჰ0-9\s.,!?(){}[\]<>:;"“„'`—~@#$%^&*_\-+=|\\/]*$/;
  return pattern.test(value);
});
defineRule("english", (value: string) => {
  const pattern = /^[a-zA-Z0-9\s.,!?(){}[\]<>:;"“„'`—~@#$%^&*_\-+=|\\/]*$/;
  return pattern.test(value);
});
defineRule("lowercase", (value: string) => {
  return !value || value === value.toLowerCase();
});

const messages = {
  ka: {
    fields: ka.validations,
  },
  en: {
    fields: en.validations,
  },
} as RootI18nDictionary;

configure({
  generateMessage: localize(messages),
  bails: false,
});

const locale = Cookies.get("locale") || "en";
setLocale(locale);
