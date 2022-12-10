import Hook from './Hook';

export class AsyncParallelBailHook<Args extends unknown[]> extends Hook<Args, void> {
  async dispatch(...args: Args) {
    return Promise.race(
      this._taps.map(
        ({ fn }) =>
          new Promise<void>((resolve) => {
            return Promise.resolve(fn(...args)).then((result: unknown) => {
              if (result !== undefined) {
                return resolve();
              }
            });
          })
      )
    );
  }
}

export default AsyncParallelBailHook;
