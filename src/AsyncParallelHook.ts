import Hook from './Hook';

export class AsyncParallelHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  async dispatch(...args: Parameters<Fn>) {
    return Promise.all<ReturnType<Fn>>(this.taps.map(({ fn }) => fn(...args)));
  }
}

export default AsyncParallelHook;
