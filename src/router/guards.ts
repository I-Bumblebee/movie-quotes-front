import { watch } from "vue";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import useUserAuthStore from "@/stores/userAuth";

const waitForAuthentication = async (
  store: ReturnType<typeof useUserAuthStore>,
) => {
  if (store.userIsBeingAuthenticated) {
    await new Promise<void>((resolve) => {
      const stopWatching = watch(
        () => store.userIsBeingAuthenticated,
        (newValue) => {
          if (!newValue) {
            stopWatching();
            resolve();
          }
        },
        { immediate: true },
      );
    });
  }
};

export const guestGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const store = useUserAuthStore();
  await waitForAuthentication(store);

  if (store.isAuthenticated) {
    next({ name: "Quotes" });
  } else {
    next();
  }
};

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const store = useUserAuthStore();
  await waitForAuthentication(store);

  if (store.isAuthenticated) {
    next();
  } else {
    next({ name: "Home" });
  }
};
