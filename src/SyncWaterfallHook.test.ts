import { SyncWaterfallHook } from './SyncWaterfallHook';

describe('SyncWaterfallHook', () => {
  const hook = new SyncWaterfallHook<(arg0: string) => number>();

  const fn0 = vi.fn((arg0) => {
    return 0;
  });
  hook.tap('hook0', fn0);

  const fn1 = vi.fn((arg0) => {
    return 1;
  });
  hook.tap('hook1', fn1);

  const fn2 = vi.fn((arg0) => {
    return 2;
  });
  hook.tap('hook2', fn2);

  it('dispatch', () => {
    const results = hook.dispatch('foo');
    expect(fn0).toHaveBeenCalledWith('foo');
    expect(fn1).toHaveBeenCalledWith(0);
    expect(fn2).toHaveBeenCalledWith(1);
    expect(results).toBe(2);
  });
});
