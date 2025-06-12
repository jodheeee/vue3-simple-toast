<script setup lang="ts">
import { useToast } from '../stores/toast';
import ToastItem from './ToastItem.vue';

const store = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="toast-wrapper">
      <TransitionGroup name="toast">
        <ToastItem
          v-for="toast in store.toasts"
          :key="toast.id"
          :toast="toast"
          :type="toast.type"
          :auto-close-time="toast.autoCloseTime"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 100%;
  pointer-events: none;
}

.toast-wrapper > * {
  pointer-events: auto;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease-in-out;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
