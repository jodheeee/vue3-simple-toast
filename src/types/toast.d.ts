import type { TOAST_TYPE } from '@/constant';

export interface ToastConfig {
  id?: string;
  type?: TOAST_TYPE;
  isLoading?: boolean;
  autoCloseTime?: number;
  onClose?: () => void;
}

export interface ToastItem extends ToastConfig {
  message: string[];
}

export interface ToastStore {
  toasts: ToastItem[];
}
