import { SyncLoopHook } from './SyncLoopHook';

describe('SyncLoopHook', () => {
  const hook = new SyncLoopHook<(arg0: number, arg1: string) => void>();

  let index = 1;

  const fn0 = vi.fn(() => {});
  hook.tap('hook0', fn0);

  const fn1 = vi.fn(() => {
    if (index > 0) {
      index -= 1;
      return index;
    }
  });
  hook.tap('hook1', fn1);

  const fn2 = vi.fn(() => {});
  hook.tap('hook1', fn2);

  it('dispatch', () => {
    const results = hook.dispatch(7274, 'foo');
    expect(fn0).toHaveBeenCalledWith(7274, 'foo');
    expect(fn1).toHaveBeenCalledWith(7274, 'foo');
    expect(fn2).toHaveBeenCalledWith(7274, 'foo');
    expect(fn0).toHaveBeenCalledTimes(2);
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(results).toStrictEqual([undefined, undefined, undefined]);
  });
});
