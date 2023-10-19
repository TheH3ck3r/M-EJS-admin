"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectLike = isObjectLike;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isUndefined = isUndefined;
exports.isFunction = isFunction;
exports.isFormData = isFormData;
exports.isString = isString;
exports.isNumber = isNumber;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function isObjectLike(object) {
  return (0, _typeof2["default"])(object) === 'object' && object !== null;
}

function isArray(object) {
  return Array.isArray(object);
}

function isObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
}

function isUndefined(object) {
  return typeof object === 'undefined';
}

function isFunction(object) {
  return typeof object === 'function';
}

function isFormData(object) {
  return object && Object.prototype.toString.call(object) === '[object FormData]';
}

function isString(object) {
  return typeof object === 'string';
}

function isNumber(object) {
  return typeof object === 'number';
}
//# sourceMappingURL=type_checkers.js.map