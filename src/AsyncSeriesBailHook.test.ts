import { AsyncSeriesBailHook } from './AsyncSeriesBailHook';

describe('AsyncSeriesBailHook', () => {
  const hook = new AsyncSeriesBailHook<[number, string]>();

  const fn0 = vi.fn((a, b) => {
    return;
  });
  hook.tap('hook0', fn0);

  const fn1 = vi.fn((a, b) => {
    return;
  });
  hook.tap('hook1', fn1);

  it('dispatch', async () => {
    const results = await hook.dispatch(7274, 'foo');
    expect(fn0).toHaveBeenCalledWith(7274, 'foo');
    expect(fn1).toHaveBeenCalledWith(7274, 'foo');
    expect(results).eq(undefined);
  });

  const fn2 = vi.fn((a, b) => {
    return 2;
  });
  hook.tap('hook2', fn2);

  const fn3 = vi.fn((a, b) => {
    return;
  });
  hook.tap('hook3', fn3);

  it('dispatch - break with error', async () => {
    await hook.dispatch(7274, 'bar');
    expect(fn0).toHaveBeenCalledWith(7274, 'foo');
    expect(fn1).toHaveBeenCalledWith(7274, 'foo');
    expect(fn2).toHaveBeenCalledWith(7274, 'foo');
    expect(fn3).toHaveBeenCalledTimes(0);
  });
});
