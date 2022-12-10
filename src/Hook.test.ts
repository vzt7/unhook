import { Hook } from './Hook';

class TestHook<T extends any[], R> extends Hook<T, R> {
  dispatch(...args: T) {
    return Promise.all<R>(this._taps.map(({ fn }) => fn(...args)));
  }
}

describe('Hook', () => {
  const hook = new TestHook<[number, string], number>();

  const fn0 = vi.fn((a, b) => {
    return 0;
  });
  hook.tap('hook0', fn0);

  const fn1 = vi.fn((a, b) => {
    return 1;
  });
  hook.tap('hook1', fn1);

  const fn2 = vi.fn((a, b) => {
    return 2;
  });
  hook.tap({ name: 'hook2', stage: -10 }, fn2);

  const fn3 = vi.fn((a, b) => {
    return 3;
  });
  hook.tap({ name: 'hook3', before: 'hook1' }, fn3);

  const fn4 = vi.fn((a, b) => {
    return 4;
  });
  hook.tap({ name: 'hook4', before: ['hook2', 'hook3'] }, fn4);

  it('dispatch', async () => {
    await hook.dispatch(7274, 'foo');
    expect(fn0).toHaveBeenCalledWith(7274, 'foo');
    expect(fn1).toHaveBeenCalledWith(7274, 'foo');
    expect(fn2).toHaveBeenCalledWith(7274, 'foo');
    expect(fn3).toHaveBeenCalledWith(7274, 'foo');
    expect(fn4).toHaveBeenCalledWith(7274, 'foo');
  });
  it('dispatch - stage & before', async () => {
    const results = await hook.dispatch(7274, 'bar');
    expect(results).toStrictEqual([4, 2, 0, 3, 1]);
  });

  it('intercept', async () => {
    const hook = new TestHook<[number, string], number>();
    const fnRegisterTap = vi.fn((tap) => tap);
    const fnCallTap = vi.fn((...args) => 0);
    const fnTapTap = vi.fn((tap) => {});
    const fn0 = vi.fn(() => 0);
    hook.intercept({
      register: fnRegisterTap,
      call: fnCallTap,
      tap: fnTapTap,
    });
    hook.tap('hook0', fn0);
    expect(fnRegisterTap).toHaveBeenCalledTimes(1);
    expect(fnRegisterTap).toHaveBeenCalledTimes(1);
    expect(fnTapTap).toHaveBeenCalledTimes(1);

    await hook.dispatch(7274, 'foo');
    expect(fnCallTap).toHaveBeenCalledWith(7274, 'foo');
    expect(fnCallTap).toHaveBeenCalledTimes(1);
  });
});
