# unhook

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]

<!-- [![Codecov][codecov-src]][codecov-href] -->

> Can be used to create hooks for plugins.

## 🦭 Why ?

- ✅ Get all returns of each hook.
- ✅ Types friendly, specify the hook type you want.
- ✅ Almost likes [tapable](https://github.com/webpack/tapable), more light & clear.

## 📦 Installation

```sh
# with pnpm
pnpm install unhook

# with yarn
yarn add unhook

# with npm
npm install unhook
```

## ⚡️ Usage

Almost refer to [tapable](https://github.com/webpack/tapable).

- AsyncParallelBailHook
- AsyncParallelHook
- AsyncSeriesBailHook
- AsyncSeriesHook
- AsyncSeriesWaterfallHook
- _TODO: Sync hooks_

```ts
import { AsyncSeriesHook } from 'unhook';

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

Only the dispatch method is different implementation for each hook, and all hooks follow the usage below.

```ts
import { AsyncSeriesHook } from 'unhook';

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
// Hello World!!!
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

[npm-version-src]: https://img.shields.io/npm/v/unhook?style=flat-square
[npm-version-href]: https://npmjs.com/package/unhook
[npm-downloads-src]: https://img.shields.io/npm/dm/unhook?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/unhook
[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/unhook/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/unhook/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/unhook/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/unhook
