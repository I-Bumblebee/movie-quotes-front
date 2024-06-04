import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/en";
import "dayjs/locale/ka";
import { relative_time_locales as relativeTimeEn } from "@/locales/en.json";
import { relative_time_locales as relativeTimeKa } from "@/locales/ka.json";
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeEn,
});
dayjs.updateLocale("ka", {
  relativeTime: relativeTimeKa,
});
