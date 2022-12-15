import Hook from './Hook';

export class AsyncSeriesBailHook<Args extends unknown[]> extends Hook<Args, void> {
  async dispatch(...args: Args) {
    for (const tap of this.taps) {
      const result = await tap.fn(...args);
      if (result !== undefined) {
        break;
      }
    }
  }
}

export default AsyncSeriesBailHook;
