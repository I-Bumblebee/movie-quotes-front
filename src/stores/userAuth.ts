import { defineStore } from "pinia";
import type { User } from "@/types";
import { fetchUser, logout } from "@/services/api/auth";

type authState = {
  user?: User;
  loading: boolean;
};

const useUserAuthStore = defineStore({
  id: "userAuth",
  state: (): authState => ({
    user: undefined,
    loading: false,
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
        });
    },
    logout() {
      this.loading = true;
      logout()
        .then(() => {
          this.user = undefined;
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
