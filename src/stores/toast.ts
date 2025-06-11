import { defineStore } from 'pinia';
import type { ToastItem, ToastStore, ToastConfig } from '@/types/toast';

let uid = 0;
const toastInitialize: ToastStore = {
  toasts: [],
};

export const useToastStore = defineStore('toast', {
  state: () => ({
    ...toastInitialize,
  }),

  actions: {
    generateId(): string {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      const time = Date.now().toString(36);
      const count = (++uid).toString(36);
      return `tst-${time}-${count}`;
    },

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
      const id = config?.id ?? this.generateId();
      this.addToast({ id, message, ...config });
    },
  },
});
