import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/plugins/notifications";
import "@/plugins/vee_validate";
import "@/plugins/dayjs";
import i18n from "@/plugins/i18n";
import router from "@/router";
import ClickOutsideDirective from "@/directives/click-outside";

import App from "@/App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.directive("click-outside", ClickOutsideDirective);

app.mount("#app");
