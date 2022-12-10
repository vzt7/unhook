import Hook from './Hook';

export class AsyncSeriesHook<Args extends unknown[], Returns> extends Hook<Args, Returns> {
  async dispatch(...args: Args) {
    const returns: Returns[] = [];
    for (const { fn } of this.taps) {
      returns.push(await fn(...args));
    }
    return returns;
  }
}

export default AsyncSeriesHook;
