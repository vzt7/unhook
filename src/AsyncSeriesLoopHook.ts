import Hook from './Hook';

export class AsyncSeriesLoopHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  async dispatch(...args: Parameters<Fn>): Promise<ReturnType<Fn>[]> {
    const results: ReturnType<Fn>[] = [];
    for (const { fn } of this.taps) {
      const ret = await fn(...args);
      if (ret !== undefined) {
        return this.dispatch(...args);
      }
      results.push(ret);
    }
    return results;
  }
}

export default AsyncSeriesLoopHook;
