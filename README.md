# babel-plugin-async-to-plain-generator

Babel plugin to transform async functions into plain, unwrapped generator functions.

## &nbsp;
<p align="center">
  <b>:rocket: &nbsp; Are you ready to tackle ES6 and hone your JavaScript Skills?</b> &nbsp; :rocket:<br/>
  Check out these outstanding <a href="https://es6.io/friend/POWELL">ES6 courses</a> by <a href="https://github.com/wesbos">@wesbos</a>
</p>
---

While working with [KoaJS v1](https://github.com/koajs/koa) we found that the resulting output from [transform-async-to-generator](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-async-to-generator) was incompatible with Koa's requirements - that `app.use` must be passed a generator function. 

This plugin was created by modifying the transform-async-to-generator plugin. While that plugin works well in most situations, it curiously (and extraneously?) wraps async functions and results in a generator function wrapped in a regular function of the same name. This plugin was created so that babel would produce plain old vanilla generator functions from async function declarations.

## Transformations:

```js
// in

[].forEach(async (a) => {
  await a;
});

async function foo (bar) {
  await bar;
};

// out

[].forEach(function* (a) {
  yield a;
});

function* foo (bar) {
  yield bar;
}
```

## Installation

```sh
$ npm install babel-plugin-async-to-plain-generator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["async-to-plain-generator"]
}
```

### Via CLI

```sh
$ babel --plugins async-to-plain-generator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["async-to-plain-generator"]
});
```
