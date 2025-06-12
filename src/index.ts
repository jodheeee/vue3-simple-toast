import type { App, Plugin } from 'vue';
import ToastContainer from './components/ToastContainer.vue';
import { useToast } from './stores/toast';
import type { ToastItem, ToastConfig } from './types/toast';

const ToastPlugin: Plugin = {
  install(app: App) {
    app.component('ToastContainer', ToastContainer);
    app.config.globalProperties.$toast = useToast();
    app.provide('toast', useToast());
  },
};

export default ToastPlugin;

export { ToastContainer };

export { useToast };

export function generateId(): string {
  return useToast().generateId();
}

export function addToast(item: ToastItem): void {
  useToast().addToast(item);
}

export function removeToast(id: ToastItem['id']): void {
  useToast().removeToast(id);
}

export function clearToast(): void {
  useToast().clearToast();
}

export function toast(message: ToastItem['message'], config?: ToastConfig): void {
  useToast().toast(message, config);
}
