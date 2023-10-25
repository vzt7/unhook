import Hook from './Hook';

export class SyncHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  dispatch(...args: Parameters<Fn>) {
    return this.taps.map(({ fn }) => fn(...args));
  }
}

export default SyncHook;
