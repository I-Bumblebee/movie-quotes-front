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
import LayoutAuthorizedUser from "@/layouts/LayoutAuthorizedUser.vue";
import MovieDetailView from "@/views/MovieDetailView.vue";

const PlaceHolderView = defineComponent({});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: LandingView,
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
    path: "/unauthorized",
    name: "UnauthorizedError",
    component: UnauthorizedErrorView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: RouteNotFoundView,
  },
  {
    path: "/",
    component: LayoutAuthorizedUser,
    children: [
      {
        path: "quotes",
        children: [
          {
            path: "",
            name: "Quotes",
            component: PlaceHolderView,
          },
          {
            path: ":id",
            name: "QuoteDetail",
            component: PlaceHolderView,
          },
        ],
      },
      {
        path: "/movies",
        children: [
          {
            path: "",
            name: "Movies",
            component: MovieListView,
          },
          {
            path: ":id",
            name: "MovieDetail",
            component: MovieDetailView,
          },
        ],
      },
      {
        path: "/profile",
        name: "Profile",
        component: ProfileView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
