import { describe, it, beforeEach, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from '../src/stores/toast';

describe('toast store test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('add toast test', () => {
    const store = useToastStore();
    const message = ['add-toast-test-message'];

    expect(store.toasts).toStrictEqual([]);

    store.toast(message, { id: 'test-toast-id-1' });
    store.toast(message, { id: 'test-toast-id-2' });
    store.toast(message, { id: 'test-toast-id-3' });

    expect(store.toasts).toStrictEqual([
      { message, id: 'test-toast-id-3' },
      { message, id: 'test-toast-id-2' },
      { message, id: 'test-toast-id-1' },
    ]);
  });

  it('remove toast test', () => {
    const store = useToastStore();
    const message = ['remove-toast-test-message'];

    store.toast(message, { id: 'test-toast-id-1' });
    store.toast(message, { id: 'test-toast-id-2' });
    store.toast(message, { id: 'test-toast-id-3' });

    store.removeToast('test-toast-id-2');

    expect(store.toasts).toStrictEqual([
      { message, id: 'test-toast-id-3' },
      { message, id: 'test-toast-id-1' },
    ]);
  });

  it('clear toast test', () => {
    const store = useToastStore();
    const message = ['clear-toast-test-message'];

    store.toast(message, { id: 'test-toast-id-1' });
    store.toast(message, { id: 'test-toast-id-2' });
    store.toast(message, { id: 'test-toast-id-3' });

    store.clearToast();

    expect(store.toasts).toStrictEqual([]);
  });
});
