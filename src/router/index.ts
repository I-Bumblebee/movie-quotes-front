import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LandingView from "@/views/LandingView.vue";
import RouteNotFoundView from "@/views/RouteNotFoundView.vue";
import UnauthorizedErrorView from "@/views/UnauthorizedErrorView.vue";
import VerifyEmailCallbackView from "@/views/VerifyEmailCallbackView.vue";
import { defineComponent } from "vue";
import OAuthGoogleCallbackView from "@/views/OAuthGoogleCallbackView.vue";
import ForgotPasswordCallbackView from "@/views/ForgotPasswordCallbackView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MovieListView from "@/views/MovieListView.vue";

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
    path: "/quotes/:id",
    name: "QuoteDetail",
    component: PlaceHolderView,
  },
  {
    path: "/movies",
    name: "Movies",
    component: MovieListView,
  },
  {
    path: "/movies/:id",
    name: "MovieDetail",
    component: PlaceHolderView,
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: VerifyEmailCallbackView,
  },
  {
    path: "/oauth/google/callback",
    name: "GoogleCallback",
    component: OAuthGoogleCallbackView,
  },
  {
    path: "/reset-password",
    name: "ForgotPasswordCallback",
    component: ForgotPasswordCallbackView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
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
