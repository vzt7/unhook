import Hook from './Hook';

export class AsyncParallelBailHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  async dispatch(...args: Parameters<Fn>) {
    return Promise.race(
      this.taps.map(
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
