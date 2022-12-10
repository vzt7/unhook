# patable

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> The patable package expose many Hook classes, which can be used to create hooks for plugins.

## Installation

```sh
# npm
npm install patable

# yarn
yarn add patable

# pnpm
pnpm install patable
```

## Usage

```js
// ESM
import { AsyncParallelBailHook, AsyncParallelHook, AsyncSeriesBailHook, AsyncSeriesHook, AsyncSeriesWaterfallHook } from 'patable';

// CommonJS
const { AsyncParallelBailHook, AsyncParallelHook, AsyncSeriesBailHook, AsyncSeriesHook, AsyncSeriesWaterfallHook } = require('patable');
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

[npm-version-src]: https://img.shields.io/npm/v/patable?style=flat-square
[npm-version-href]: https://npmjs.com/package/patable
[npm-downloads-src]: https://img.shields.io/npm/dm/patable?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/patable
[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/patable/ci/main?style=flat-square
[github-actions-href]: https://github.com/unjs/patable/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/patable/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/patable
