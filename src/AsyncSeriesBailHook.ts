import Hook from './Hook';

export class AsyncSeriesBailHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  async dispatch(...args: Parameters<Fn>) {
    for (const tap of this.taps) {
      const result = await tap.fn(...args);
      if (result !== undefined) {
        break;
      }
    }
  }
}

export default AsyncSeriesBailHook;
