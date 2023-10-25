import Hook from './Hook';

export class SyncBailHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  dispatch(...args: Parameters<Fn>) {
    for (const tap of this.taps) {
      const result = tap.fn(...args);
      if (result !== undefined) {
        break;
      }
    }
  }
}

export default SyncBailHook;
