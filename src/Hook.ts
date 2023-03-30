export interface InternalTap {
  name: string;
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any) => any;
  once?: boolean;
  stage: number;
  before?: InternalTap['name'] | InternalTap['name'][];
  _freeze?: boolean;
}

export interface Tap extends Partial<Omit<InternalTap, '_freeze'>> {
  name: string;
  stage?: number;
}

export abstract class Hook<Fn extends (...args: any[]) => any, Args extends Parameters<Fn> = Parameters<Fn>> {
  /** @internal */
  protected readonly _interceptor: Parameters<typeof this['intercept']>['0'][] = [];
  /** @internal */
  protected readonly _taps: InternalTap[] = [];

  /** @internal */
  protected _wrap(data: InternalTap) {
    const { fn } = data;
    const interceptorHook = (...args: Args) => this._interceptor?.forEach((item) => item?.call?.call(null, ...args));
    const wrappedData = {
      ...data,
      fn: function (...args: Args) {
        if (wrappedData.once) {
          wrappedData._freeze = true;
        }
        interceptorHook?.(...args);
        return fn(...args);
      }.bind(fn),
    };
    return wrappedData;
  }

  /** @internal */
  protected _tap(data: InternalTap) {
    data = this._wrap(data);
    this._interceptor?.forEach((item) => item?.register?.call(null, data));
    this._interceptor?.forEach((item) => item?.tap?.call(null, data));

    const isTargetTap = (item: InternalTap) => {
      if (Array.isArray(data.before) ? data.before.includes(item.name) : data.before === item.name) {
        return true;
      }
      if (data.stage === 0 && item.stage !== 0) {
        return false;
      }
      return data.stage < item.stage;
    };
    const index = this._taps.findIndex(isTargetTap);

    switch (index) {
      case -1:
        this._taps.push(data);
        break;
      case 0:
        this._taps.unshift(data);
        break;
      default:
        this._taps.splice(Math.max(0, index), 0, data);
    }
  }

  get taps() {
    return this._taps.filter((item) => !item._freeze);
  }

  tap(name: string | Tap, fn: Fn) {
    if (typeof name === 'string') {
      this._tap({
        stage: 0,
        name,
        fn,
      });
      return;
    }
    this._tap({
      stage: 0,
      ...name,
      fn,
    });
  }

  intercept(
    options: {
      register?: (tap: Tap) => Tap;
      tap?: (tap: Tap) => void;
      call?: Fn;
    } = {}
  ) {
    this._interceptor.push({ ...options });
  }

  abstract dispatch(...args: unknown[]): unknown;
}

export default Hook;
