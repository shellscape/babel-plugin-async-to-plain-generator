# babel-plugin-async-to-plain-generator
Transform async functions into non-wrapped ES2015 generators

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
