import { create } from "zustand";
import { useWalletStore } from "./walletStore";
import api from '../lib/api.js';
import { NOTIFICATION_TYPES, NOTIFICATION_SEVERITIES, NOTIFICATION_MAX_MESSAGE_LENGTH } from '../lib/constants';
import { addNotificationToContract } from '../lib/soroban';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    const wallet = useWalletStore.getState().wallet;
    if (!wallet?.address) {
      set({ error: "Wallet not connected" });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const {data} = await api.fetchNotifications();
      if (response.ok) {
        set({
          notifications: data.data.notifications,
          isLoading: false,
        });
      } else {
        set({
          error: data.message || "Failed to fetch notifications",
          isLoading: false,
        });
      }
    } catch (err) {
      set({ error: "Network error occurred", isLoading: false });
    }
  },

  addNotification: async (
    type,
    severity,
    message,
    templateId = null,
    poolId = null
  ) => {
    const wallet = useWalletStore.getState().wallet;
    if (!wallet?.address) {
      set({ error: "Wallet not connected" });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      if (!Object.values(NOTIFICATION_TYPES).includes(type) || !Object.values(NOTIFICATION_SEVERITIES).includes(severity) || message.length > NOTIFICATION_MAX_MESSAGE_LENGTH) {
      set({ error: ERROR_MESSAGES.INVALID_INPUT });
      return;
    }
    
      const {data} = await api.addNotification(type, severity, message, templateId, poolId);
      await addNotificationToContract(type, severity, message, templateId, poolId);

      if (response.ok) {
        set((state) => ({
          notifications: [...state.notifications, data.data.notification],
          isLoading: false,
        }));
        return data.data.notification;
      } else {
        set({
          error: data.message || "Failed to add notification",
          isLoading: false,
        });
      }
    } catch (err) {
      set({ error: "Network error occurred", isLoading: false });
    }
  },

  clearNotification: async (notificationId) => {
    const wallet = useWalletStore.getState().wallet;
    if (!wallet?.address) {
      set({ error: "Wallet not connected" });
      return;
    }

    set({ isLoading: true, error: null });
    try { 
      const {data} = await api.clearNotification();
      if (response.ok) {
        set((state) => ({
          notifications: state.notifications.filter(
            (n) => n.id !== notificationId
          ),
          isLoading: false,
        }));
      } else {
        set({
          error: data.message || "Failed to clear notification",
          isLoading: false,
        });
      }
    } catch (err) {
      set({ error: "Network error occurred", isLoading: false });
    }
  },

  clearAllNotifications: async () => {
    const wallet = useWalletStore.getState().wallet;
    if (!wallet?.address) {
      set({ error: "Wallet not connected" });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const {data} = await api.clearAllNotifications();
      if (response.ok) {
        set({ notifications: [], isLoading: false });
      } else {
        set({
          error: data.message || "Failed to clear all notifications",
          isLoading: false,
        });
      }
    } catch (err) {
      set({ error: "Network error occurred", isLoading: false });
      throw err;
    }
  },

  resetError: () => set({ error: null }),
}));

export default useNotificationStore;
