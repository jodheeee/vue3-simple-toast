<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useToastStore } from '../stores/toast';
import { TOAST_TYPE } from '../constant';
import type { ToastItem } from '../types/toast';

const props = withDefaults(
  defineProps<{
    toast: ToastItem;
    type: ToastItem['type'];
    autoCloseTime: ToastItem['autoCloseTime'];
  }>(),
  {
    type: TOAST_TYPE.NORMAL,
    autoCloseTime: 3000,
  }
);

const { removeToast } = useToastStore();
const isAutoClosed = !props.toast.isLoading;

onMounted(() => {
  if (isAutoClosed) {
    setTimeout(() => {
      removeToast(props.toast.id);
    }, props.autoCloseTime);
  }
});

onUnmounted(() => {
  if (props.toast?.onClose) props.toast.onClose();
});
</script>
<template>
  <div :id="toast.id" :data-testId="`${type}-toast-item`">
    <div :class="`toast-item ${type}`">
      <div class="toast-content">
        <div v-if="toast.isLoading" class="spinner"></div>
        <div class="toast-body">
          <p v-for="(message, i) in toast.message" :key="i">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-item {
  width: fit-content;
  max-width: 390px;
  padding: 18px 21px;
  margin: 10px auto 0;
  background: #ffffff;
  position: relative;
  z-index: 70;
  border-radius: 9px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.05);
}
@media (max-width: 390px) {
  .toast-item {
    max-width: 100%;
  }
}

.toast-item.success {
  border: 1px solid rgba(0, 117, 255, 0.15);
  background: #f1f8ff;
  color: #0075ff;
}
.toast-item.error {
  border: 1px solid rgba(241, 42, 42, 0.15);
  background: #fff1f1;
  color: #f12a2a;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.toast-body p {
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.65;
}
</style>
