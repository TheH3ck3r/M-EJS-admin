export var canUseDOM = !!(typeof window !== 'undefined' && window.document &&
/* eslint-disable */
window.document.createElement
/* eslint-enable */
);
export var canUseEventListeners = canUseDOM && !!window.addEventListener;
export function onDOMLoaded(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}
//# sourceMappingURL=dom.js.map