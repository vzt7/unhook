import { AsyncSeriesHook } from './AsyncSeriesHook';

describe('AsyncSeriesHook', () => {
  const hook = new AsyncSeriesHook<[number, string], number>();

  const fn0 = vi.fn((a, b) => {
    return 0;
  });
  hook.tap('hook0', fn0);

  const fn1 = vi.fn((a, b) => {
    return 1;
  });
  hook.tap('hook1', fn1);

  it('dispatch', async () => {
    const results = await hook.dispatch(7274, 'foo');
    expect(fn0).toHaveBeenCalledWith(7274, 'foo');
    expect(fn1).toHaveBeenCalledWith(7274, 'foo');
    expect(results).toStrictEqual([0, 1]);
  });
});
