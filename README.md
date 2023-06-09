# unhook

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]

<!-- [![Codecov][codecov-src]][codecov-href] -->

> Can be used to create hooks for plugins.

## 🦭 Why ?

- ✅ 获取每个钩子的返回值。 Get all returns of each hook.
- ✅ 类型友好，可指定你的钩子类型。 Types friendly, specify the hook type you want.
- ✅ 可扩展出你的定制钩子。 Extends to create a hook you need.

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

你可以使用各种类型的钩子。 The following hooks you can use.

- Hook _(Abstract)_
- AsyncParallelBailHook
- AsyncParallelHook
- AsyncSeriesBailHook
- AsyncSeriesHook
- AsyncSeriesWaterfallHook
- _TODO: Sync hooks_

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

每个钩子只有 dispatch 方法不同，所以全部钩子都遵循下面的用法。 All hooks follow the usage below, only the dispatch method of each hook is different implementation.

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

你也可以基于基础钩子扩展出你自己的钩子。 Extends the basic hook to create your own.

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

[npm-version-src]: https://img.shields.io/npm/v/@vzt7/unhook?style=flat-square
[npm-version-href]: https://npmjs.com/package/@vzt7/unhook
[npm-downloads-src]: https://img.shields.io/npm/dm/@vzt7/unhook?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@vzt7/unhook
[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/@vzt7/unhook/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/@vzt7/unhook/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@vzt7/unhook/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/@vzt7/unhook
