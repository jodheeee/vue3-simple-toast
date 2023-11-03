import { defineStore } from 'pinia';
import { ulid } from 'ulid';
import type { ToastItem, ToastStore, ToastConfig } from '@/types';

const toastInitialize: ToastStore = {
  toasts: [],
};

export const useToastStore = defineStore('toast', {
  state: () => ({
    ...toastInitialize,
  }),

  actions: {
    addToast(item: ToastItem): void {
      if (!this.toasts.find((toast) => toast.id === item.id)) {
        this.toasts = [item, ...this.toasts];
      }
    },

    removeToast(id: ToastItem['id']): void {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },

    clearToast(): void {
      this.toasts = [];
    },

    toast(message: ToastItem['message'], config?: ToastConfig): void {
      const id = config?.id ?? ulid();
      this.addToast({ id, message, ...config });
    },
  },
});
