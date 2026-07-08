import { create } from "zustand";
import { api } from "@/api";

export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  similarity_score: number | null;
  is_read: boolean;
  created_at: string;
  matched_item: {
    group_id: string;
    title: string;
    slug: string;
    source: string;
  } | null;
  source_item: {
    group_id: string;
    title: string;
    slug: string;
    source: string;
  } | null;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;

  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: NotificationItem) => void;
}

export const useNotifications = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/notification/notifications");
      set({ notifications: data.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const { data } = await api.get("/notification/notifications/unread-count");
      set({ unreadCount: data.count });
    } catch {
      // silent
    }
  },

  markAsRead: async (id: number) => {
    try {
      await api.put(`/notification/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, is_read: true } : n,
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch {
      // silent
    }
  },

  markAllAsRead: async () => {
    try {
      await api.put("/notification/notifications/read-all");
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
        unreadCount: 0,
      }));
    } catch {
      // silent
    }
  },

  addNotification: (notification: NotificationItem) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));
