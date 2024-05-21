import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LandingView from "@/views/LandingView.vue";
import RouteNotFoundView from "@/views/RouteNotFoundView.vue";
import UnauthorizedErrorView from "@/views/UnauthorizedErrorView.vue";
import { defineComponent } from "vue";

const PlaceHolderView = defineComponent({});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: LandingView,
  },
  {
    path: "/quotes",
    name: "Quotes",
    component: PlaceHolderView,
  },
  {
    path: "/unauthorized",
    name: "UnauthorizedError",
    component: UnauthorizedErrorView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: RouteNotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
