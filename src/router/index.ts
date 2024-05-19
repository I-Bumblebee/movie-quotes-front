import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LandingView from "@/views/LandingView.vue";
import { defineComponent } from "vue";

const PlaceHolderView = defineComponent({});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/quotes",
    name: "Quotes",
    component: PlaceHolderView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
