export const enum TOAST_TYPE {
  NORMAL = 'normal',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ToastConfig {
  id?: string;
  type?: TOAST_TYPE;
  isLoading?: boolean;
  isConfirm?: boolean;
  autoCloseTime?: number;
  onClickProceed?: (e: MouseEvent) => void;
  onClickCancel?: (e: MouseEvent) => void;
}

export interface ToastItem extends ToastConfig {
  message: string[];
}

export interface ToastStore {
  toasts: ToastItem[];
}
