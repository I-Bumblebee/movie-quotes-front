import axios from "@/plugins/axios";

const getNotifications = () => {
  return axios.get("/notifications");
};

const markAsRead = (notifications: number[]) => {
  return axios.post("/notifications/mark-as-read?_method=PATCH", {
    notification_ids: notifications,
  });
};

export { getNotifications, markAsRead };
