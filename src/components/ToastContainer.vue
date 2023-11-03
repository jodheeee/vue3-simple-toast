<script setup lang="ts">
import { useToastStore } from '@/stores';
import { storeToRefs } from 'pinia';
import ToastItem from './ToastItem.vue';

const store = useToastStore();
const { toasts } = storeToRefs(store);
</script>

<template>
  <Teleport to="body">
    <div class="toast-wrapper">
      <TransitionGroup name="toast">
        <ToastItem
          v-for="toast in toasts"
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
  @apply fixed w-full top-0 left-[50%] translate-x-[-50%];
}

.toast-enter-active,
.toast-leave-active {
  @apply transition-all;
}

.toast-enter-from,
.toast-leave-to {
  @apply opacity-0 translate-y-[-20px];
}
</style>
