import { describe, it, expect } from 'vitest';
import { createToastStoreForTest } from '../src/stores/toast';

describe('toast store test', () => {
  it('add toast test', () => {
    const store = createToastStoreForTest();
    const message = 'add-toast-test-message';

    expect(store.toasts).toStrictEqual([]);

    store.toast([message], { id: 'test-toast-id-1' });
    store.toast([message], { id: 'test-toast-id-2' });
    store.toast([message], { id: 'test-toast-id-3' });

    expect(store.toasts).toStrictEqual([
      { message: [message], id: 'test-toast-id-3' },
      { message: [message], id: 'test-toast-id-2' },
      { message: [message], id: 'test-toast-id-1' },
    ]);
  });

  it('remove toast test', () => {
    const store = createToastStoreForTest();
    const message = 'remove-toast-test-message';

    store.toast([message], { id: 'test-toast-id-1' });
    store.toast([message], { id: 'test-toast-id-2' });
    store.toast([message], { id: 'test-toast-id-3' });

    store.removeToast('test-toast-id-2');

    expect(store.toasts).toStrictEqual([
      { message: [message], id: 'test-toast-id-3' },
      { message: [message], id: 'test-toast-id-1' },
    ]);
  });

  it('clear toast test', () => {
    const store = createToastStoreForTest();
    const message = 'clear-toast-test-message';

    store.toast([message], { id: 'test-toast-id-1' });
    store.toast([message], { id: 'test-toast-id-2' });
    store.toast([message], { id: 'test-toast-id-3' });

    store.clearToast();

    expect(store.toasts).toStrictEqual([]);
  });
});
