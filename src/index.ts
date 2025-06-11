import type { App } from 'vue';
import ToastContainer from './components/ToastContainer.vue';

export { ToastContainer };

export default {
  install(app: App) {
    app.component('ToastContainer', ToastContainer);
  },
};
