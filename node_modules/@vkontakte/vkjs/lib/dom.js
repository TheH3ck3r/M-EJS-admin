"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDOMLoaded = onDOMLoaded;
exports.canUseEventListeners = exports.canUseDOM = void 0;
var canUseDOM = !!(typeof window !== 'undefined' && window.document &&
/* eslint-disable */
window.document.createElement
/* eslint-enable */
);
exports.canUseDOM = canUseDOM;
var canUseEventListeners = canUseDOM && !!window.addEventListener;
exports.canUseEventListeners = canUseEventListeners;

function onDOMLoaded(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}
//# sourceMappingURL=dom.js.map