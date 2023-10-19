"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasReactNode = hasReactNode;
exports.isPrimitiveReactNode = isPrimitiveReactNode;

function hasReactNode(value) {
  return value !== undefined && value !== false && value !== null;
}

function isPrimitiveReactNode(node) {
  return typeof node === 'string' || typeof node === 'number';
}
//# sourceMappingURL=react_utils.js.map