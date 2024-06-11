<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Notification } from "@/types";
import useUserAuthStore from "@/stores/userAuth";
import NotificationCard from "@/components/NotificationCard.vue";
import IconsBell from "@/components/icons/IconsBell.vue";
import { getNotifications, markAsRead } from "@/services/api/notifications";
import IconsPolygon from "@/components/icons/IconsPolygon.vue";
import useModal from "@/stores/modalController";

const notifications = ref<Notification[]>([]);
const user = useUserAuthStore();
const modal = useModal();
const isOpen = ref(false);

const unreadNotifications = computed(() =>
  notifications.value.filter((notification) => !notification.is_read),
);

const markAllAsRead = () => {
  markAsRead(unreadNotifications.value.map((notification) => notification.id));

  unreadNotifications.value.forEach((notification) => {
    notification.is_read = true;
  });
};

const openQuoteModal = (quoteId: number) => {
  modal.openWithProps("ViewQuoteModal", { quoteId });
  isOpen.value = false;
};

onMounted(() => {
  getNotifications().then(
    ({ data: { data } }: { data: { data: Notification[] } }) => {
      notifications.value = data;
    },
  );

  window.Echo.channel(`User.${user.user?.id}.notifications`).listen(
    "NotifyUser",
    ({ notification }: { notification: Notification }) => {
      notifications.value.unshift(notification);
    },
  );
});
</script>

<template>
  <div v-click-outside="() => (isOpen = false)">
    <button @click.stop="isOpen = !isOpen" class="relative">
      <IconsBell class="h-6 w-6 laptop:h-auto laptop:w-auto" />
      <span
        v-show="unreadNotifications.length > 0"
        class="absolute right-0 top-0 -translate-y-1/4 translate-x-1/2 rounded-full bg-red-500 px-1.5 laptop:px-2"
      >
        {{ unreadNotifications.length }}
      </span>
      <IconsPolygon
        v-show="isOpen"
        class="absolute left-3 top-12 -translate-x-1/2 laptop:left-3.5"
      />
    </button>
    <div
      v-if="isOpen && notifications.length > 0"
      class="absolute right-0 top-24 z-50 flex w-full flex-col gap-4 rounded-xl bg-black px-9 pb-8 pt-5 text-base laptop:right-18 laptop:box-content laptop:max-w-4xl laptop:px-8 laptop:pb-10 laptop:pt-10"
    >
      <div class="mb-2 flex w-full items-center justify-between">
        <h3 class="text-xl font-medium laptop:text-3xl">
          {{ $t("notifications.notifications") }}
        </h3>
        <button
          @click.stop="markAllAsRead"
          class="text-sm underline laptop:text-xl"
        >
          {{ $t("notifications.mark_all_as_read") }}
        </button>
      </div>
      <NotificationCard
        @click:viewQuote="openQuoteModal"
        v-for="notification in notifications"
        :key="notification.id"
        v-bind="notification"
      />
    </div>
    <div
      v-else-if="isOpen"
      class="absolute right-0 top-24 z-50 flex w-full max-w-72 flex-col gap-4 rounded-xl bg-black px-8 py-10 text-xl laptop:right-18"
    >
      No New Notifications
    </div>
  </div>
</template>
