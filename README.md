# patable

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
<!-- [![Codecov][codecov-src]][codecov-href] -->

> The patable package expose many Hook classes, which can be used to create hooks for plugins.

## 📦 Installation

```sh
# with pnpm
pnpm install patable

# with yarn
yarn add patable

# with npm
npm install patable
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
import { AsyncSeriesHook } from 'patable';

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

Every hook only the dispatch method is different implementation, and all follow the usage below.

```ts
import { AsyncSeriesHook } from 'patable';

type Args = [string]; // Args of every fn
type Returns = string; // Returns of every fn

const hook = new AsyncSeriesHook<Args, Returns>();

hook.tap('say', (arg0) => {
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

Made with ❤

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/patable?style=flat-square
[npm-version-href]: https://npmjs.com/package/patable
[npm-downloads-src]: https://img.shields.io/npm/dm/patable?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/patable
[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/patable/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/patable/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/patable/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/patable
