import _typeof from "@babel/runtime/helpers/typeof";
export function isObjectLike(object) {
  return _typeof(object) === 'object' && object !== null;
}
export function isArray(object) {
  return Array.isArray(object);
}
export function isObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
}
export function isUndefined(object) {
  return typeof object === 'undefined';
}
export function isFunction(object) {
  return typeof object === 'function';
}
export function isFormData(object) {
  return object && Object.prototype.toString.call(object) === '[object FormData]';
}
export function isString(object) {
  return typeof object === 'string';
}
export function isNumber(object) {
  return typeof object === 'number';
}
//# sourceMappingURL=type_checkers.js.map