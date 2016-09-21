/**
 * @note
 * babel transform-async-to-generator transforms async/await functions into a
 * generator pattern function which doesn't equate to the named function being a
 * generator, rather the function becomes a plain old function, which wraps a
 * generator function and some other logical constructs. this is a problem, as
 * koa will only accept generator functions for app.use in version 1.x. So I
 * copied the babel helper and modified it to just spit out a plain generator.
 * This helper won't be necessary when Koa v2 drops stable.
 */

'use strict';

const t = require('babel-types')

module.exports = function remapHelper (path, callId) {
  let node = path.node;
  if (node.generator) return;

  path.traverse(awaitVisitor);

  if (path.isClassMethod() || path.isObjectMethod()) {
    return classOrObjectMethod(path, callId);
  } else {
    return plainFunction(path, callId);
  }
};

var awaitVisitor = {
  ArrowFunctionExpression: function ArrowFunctionExpression (path) {
    if (!path.node.async) {
      path.arrowFunctionToShadowed();
    }
  },

  AwaitExpression: function AwaitExpression (expression) {
    let node = expression.node;
    node.type = 'YieldExpression';
  }
};

function classOrObjectMethod(path, callId) {
  let node = path.node,
    body = node.body,
    container;

  node.async = false;

  container = t.functionExpression(null, [], t.blockStatement(body.body), true);
  container.shadow = true;

  body.body = [t.returnStatement(t.callExpression(t.callExpression(callId, [container]), []))];
}

function plainFunction (path) {
  let node = path.node;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToShadowed();
  }

  node.async = false;
  node.generator = true;
}
