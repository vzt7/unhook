# unhook

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> The unhook package expose many Hook classes, which can be used to create hooks for plugins.

## Installation

```sh
# npm
npm install unhook

# yarn
yarn add unhook

# pnpm
pnpm install unhook
```

## Usage

```js
// ESM
import { AsyncParallelBailHook, AsyncParallelHook, AsyncSeriesBailHook, AsyncSeriesHook, AsyncSeriesWaterfallHook } from 'unhook';

// CommonJS
const { AsyncParallelBailHook, AsyncParallelHook, AsyncSeriesBailHook, AsyncSeriesHook, AsyncSeriesWaterfallHook } = require('unhook');
```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unhook?style=flat-square
[npm-version-href]: https://npmjs.com/package/unhook
[npm-downloads-src]: https://img.shields.io/npm/dm/unhook?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/unhook
[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/unhook/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/unhook/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/unhook/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/unhook
