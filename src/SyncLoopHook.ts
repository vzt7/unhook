import Hook from './Hook';

export class SyncLoopHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  dispatch(...args: Parameters<Fn>): ReturnType<Fn>[] {
    const results: ReturnType<Fn>[] = [];
    for (const { fn } of this.taps) {
      const ret = fn(...args);
      if (ret !== undefined) {
        return this.dispatch(...args);
      }
      results.push(ret);
    }
    return results;
  }
}

export default SyncLoopHook;
