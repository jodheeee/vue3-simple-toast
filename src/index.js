import ToastContainer from './components/ToastContainer.vue';
import { useToastStore } from './stores';

const Components = {
  ToastContainer,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export const toast = useToastStore();

export default Components;
