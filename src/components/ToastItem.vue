<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToastStore } from '@/stores';
import { TOAST_TYPE, type ToastItem } from '../stores/type';

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
const isWiggleEffect = ref(false);
const isAutoClose = !props.toast?.isLoading && !props.toast?.isConfirm;

const onClickBackground = () => {
  if (!isWiggleEffect.value) {
    isWiggleEffect.value = true;
    setTimeout(() => {
      isWiggleEffect.value = false;
    }, 400);
  }
};

onMounted(() => {
  if (isAutoClose) {
    setTimeout(() => {
      removeToast(props.toast?.id);
    }, props.autoCloseTime);
  }
});
</script>

<template>
  <div :id="toast.id">
    <div :class="`toast-item ${type} ${isWiggleEffect && 'animate-wiggle'}`">
      <div class="flex items-center gap-8 text-15 font-normal leading-165">
        <v-progress-circular
          v-if="toast?.isLoading"
          indeterminate
          :size="15"
          :width="2"
        />
        <div>
          <p v-for="(message, i) in toast.message" :key="i">
            {{ message }}
          </p>
        </div>
      </div>
      <div v-if="toast.isConfirm" class="confirm-button-wrapper">
        <button @click="toast.onClickProceed">확인</button>
        <button @click="toast.onClickCancel">취소</button>
      </div>
    </div>
    <div v-if="toast.isConfirm" class="background-cover" @click="onClickBackground"></div>
  </div>
</template>

<style scoped>
.toast-item {
  @apply w-fit max-w-[390px] px-21 py-18 m-auto bg-white relative mt-10 z-70;
  @apply rounded-9 shadow-[0px_4px_9px_0px_rgba(0,0,0,0.05)];
}

.confirm-button-wrapper {
  @apply flex justify-end gap-16 min-w-[312px] text-blue mt-10;
}

.background-cover {
  @apply fixed w-screen h-screen top-0 left-0 ml-centerCalc z-60;
}

.success {
  @apply border border-[#0075ff26] bg-[#f1f8ff] text-blue;
}

.error {
  @apply border border-[#f12a2a26] bg-[#fff1f1] text-red;
}
</style>
