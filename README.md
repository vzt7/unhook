# unhook

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

[@vzt7/unhook](https://github.com/vzt7/unhook) is an alternative to [tapable](https://github.com/webpack/tapable).

## 🦭 Why

- ✅ Get all returns of each hook.
- ✅ Types friendly, specify the hook type you want.
- ✅ Extends the basic hook to customize a hook you need.

## 📦 Installation

```sh
# with pnpm
pnpm install @vzt7/unhook

# with yarn
yarn add @vzt7/unhook

# with npm
npm install @vzt7/unhook
```

## ⚡️ Usage

The following hooks you can use.

- Hook _(Abstract)_
- SyncHook
- SyncBailHook
- SyncLoopHook
- SyncWaterfallHook
- AsyncParallelHook
- AsyncParallelBailHook
- AsyncSeriesHook
- AsyncSeriesBailHook
- AsyncSeriesLoopHook
- AsyncSeriesWaterfallHook

```ts
import { AsyncSeriesHook } from '@vzt7/unhook';

const hook = new AsyncSeriesHook();

hook.tap('say', () => {
  console.log('Hello World');
});

hook.tap('scream', () => {
  console.log('Hello World!!!');
});

hook.dispatch();

// Hello World
// Hello World!!!
```

All hooks follow the usage below, only the dispatch method of each hook is different implementation.

```ts
import { AsyncSeriesHook } from '@vzt7/unhook';

const hook = new AsyncSeriesHook<(arg0: string) => string>();

hook.tap({ name: 'say', once: true }, (arg0) => {
  console.log('Hello World');
});

hook.tap('scream', (arg0) => {
  console.log('Hello World!!!');
  return 'screaming';
});

hook.tap({ name: 'smile', stage: -10 }, async (arg0) => {
  return 'smiling';
});

hook.tap({ name: 'silent', before: 'scream' }, (arg0) => {
  console.log(arg0);
});

hook.dispatch('Anyone else').then((result) => {
  console.log(result); // ['smiling', undefined, undefined, 'screaming'];
});

// Hello World
// Anyone else
//
// Hello World!!!
// ['smiling', undefined, undefined, 'screaming'];
```

Extends the basic hook to create your own.

```ts
import { Hook } from '@vzt7/unhook';

class CustomHook<Fn extends (...args: any[]) => any> extends Hook<Fn> {
  dispatch(...args: any) {
    return Promise.all<ReturnType<Fn>>(this.taps.map(({ fn }) => fn(...args)));
  }
}

const hook = new CustomHook();

hook.tap('foo', () => {
  return 'foo results';
});

const result = await hook.dispatch(); // ['foo results'];
```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Published under [WTFPL](./LICENSE).

```
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```

<!-- Badges -->

[npm-version-src]: https://badgen.net/npm/v/@vzt7/unhook
[npm-version-href]: https://npmjs.com/package/@vzt7/unhook
[npm-downloads-src]: https://badgen.net/npm/dt/@vzt7/unhook
[npm-downloads-href]: https://npmjs.com/package/@vzt7/unhook
[github-actions-src]: https://github.com/vzt7/unhook/actions/workflows/ci.yml/badge.svg
[github-actions-href]: https://github.com/vzt7/unhook/actions
[codecov-src]: https://codecov.io/gh/vzt7/unhook/branch/main/graph/badge.svg?token=1IKH46O19F
[codecov-href]: https://codecov.io/gh/vzt7/unhook
