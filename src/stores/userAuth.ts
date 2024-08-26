import { defineStore } from "pinia";
import type { User } from "@/types";
import { fetchUser, logout } from "@/services/api/auth";
import router from "@/router";

type authState = {
  user?: User;
  loading: boolean;
  userIsBeingAuthenticated: boolean;
};

const useUserAuthStore = defineStore({
  id: "userAuth",
  state: (): authState => ({
    user: undefined,
    loading: false,
    userIsBeingAuthenticated: true,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    fetchUser() {
      this.loading = true;
      fetchUser()
        .then(({ data }) => {
          this.user = data.user;
        })
        .finally(() => {
          this.loading = false;
          this.userIsBeingAuthenticated = false;
        });
    },
    logout() {
      this.loading = true;
      logout()
        .then(() => {
          this.user = undefined;
          router.replace({ name: "Home" });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useUserAuthStore;
