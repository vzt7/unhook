import Hook from './Hook';

export class AsyncSeriesHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  async dispatch(...args: Parameters<Fn>) {
    const returns: ReturnType<Fn>[] = [];
    for (const { fn } of this.taps) {
      returns.push(await fn(...args));
    }
    return returns;
  }
}

export default AsyncSeriesHook;
