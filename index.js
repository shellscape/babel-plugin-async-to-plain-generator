/**
 * @note
 * babel transform-async-to-generator transforms async/await functions into a
 * generator pattern function which doesn't equate to the named function being a
 * generator, rather the function becomes a plain old function, which wraps a
 * generator function and some other logical constructs. this is a problem, as
 * koa will only accept generator functions for app.use in version 1.x. So I
 * copied the babel plugin and modified it to just spit out a plain generator.
 * This plugin won't be necessary when Koa v2 drops stable.
 */

'use strict';

const remapHelper = require('./remap');

exports.__esModule = true;

exports.default = function () {
  return {
    inherits: require('babel-plugin-syntax-async-functions'),

    visitor: {
      Function: function Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapHelper(path, state.addHelper('asyncToGenerator'));
      }
    }
  };
};

module.exports = exports["default"];
