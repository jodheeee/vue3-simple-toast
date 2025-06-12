import { reactive } from 'vue';
import type { ToastItem, ToastStore, ToastConfig } from '../types/toast';

let uid = 0;

const createToastStore = () => {
  const toastState = reactive<ToastStore>({
    toasts: [],
  });

  const generateId = (): string => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    const time = Date.now().toString(36);
    const count = (++uid).toString(36);
    return `tst-${time}-${count}`;
  };

  const addToast = (item: ToastItem): void => {
    if (!toastState.toasts.find((toast) => toast.id === item.id)) {
      toastState.toasts.unshift(item);

      if (process.env.NODE_ENV === 'development') {
        console.log('[Toast] Added:', item, 'Total:', toastState.toasts.length);
      }
    }
  };

  const removeToast = (id: ToastItem['id']): void => {
    const index = toastState.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      toastState.toasts.splice(index, 1);

      if (process.env.NODE_ENV === 'development') {
        console.log('[Toast] Removed:', id, 'Total:', toastState.toasts.length);
      }
    }
  };

  const clearToast = (): void => {
    toastState.toasts.splice(0, toastState.toasts.length);
  };

  const toast = (message: ToastItem['message'], config?: ToastConfig): void => {
    const id = config?.id ?? generateId();
    addToast({ id, message, ...config });
  };

  return {
    toasts: toastState.toasts,
    addToast,
    removeToast,
    clearToast,
    toast,
    generateId,
  };
};

let globalToastStore: ReturnType<typeof createToastStore> | null = null;

const isSSR = typeof window === 'undefined';

export const useToast = () => {
  if (isSSR) {
    return createToastStore();
  }

  if (!globalToastStore) {
    globalToastStore = createToastStore();
  }
  return globalToastStore;
};

export const createToastStoreForTest = () => {
  return createToastStore();
};

export type UseToastReturn = ReturnType<typeof useToast>;
