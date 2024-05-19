import { defineStore } from "pinia";
import type { User } from "@/types";
import {
  fetchUser,
  handleGoogleLogin,
  login,
  logout,
} from "@/services/api/auth";

type authState = {
  user?: User;
  loading: boolean;
  authErrors: {
    name?: string;
    email?: string;
    password?: string;
  };
};

const useUserAuthStore = defineStore({
  id: "userAuth",
  state: (): authState => ({
    user: undefined,
    loading: false,
    authErrors: {},
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    login(email: string, password: string, remember: boolean) {
      this.loading = true;
      login(email, password, remember)
        .then(({ data }) => {
          this.user = data.user;
        })
        .catch(({ response }) => {
          this.authErrors = response.data.errors;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleGoogleLogin(
      code: string,
      scope: string,
      authuser: number,
      hd: string,
      prompt: string,
    ) {
      this.loading = true;
      handleGoogleLogin(code, scope, authuser, hd, prompt)
        .then(({ data }) => {
          this.user = data.user;
        })
        .catch(({ response }) => {
          this.authErrors = response.data.errors;
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
