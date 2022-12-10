import Hook from './Hook';

export class AsyncParallelHook<Args extends unknown[], Returns> extends Hook<Args, Returns> {
  async dispatch(...args: Args) {
    return Promise.all<Returns>(this.taps.map(({ fn }) => fn(...args)));
  }
}

export default AsyncParallelHook;
