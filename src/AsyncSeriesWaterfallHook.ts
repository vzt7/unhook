import Hook from './Hook';

export function waterfall<T>(items: ((arg: T) => T)[]) {
  const next = async (prevResult: T, index = 0): Promise<T> => {
    const fn = items[index];
    if (index >= items.length) {
      return prevResult;
    }
    if (!fn || typeof fn !== 'function') {
      throw new Error(`Unexcepted type of args[${index}]: ${typeof fn}.`);
    }
    const result = await fn(prevResult);
    return next(result, index + 1);
  };
  return (arg: T) => next(arg);
}

export class AsyncSeriesWaterfallHook<Args extends unknown[], Returns> extends Hook<Args, Returns> {
  async dispatch(arg0: Args[0]) {
    const taps = this.taps.map(({ fn }) => fn);
    return waterfall(taps)(arg0);
  }
}

export default AsyncSeriesWaterfallHook;
