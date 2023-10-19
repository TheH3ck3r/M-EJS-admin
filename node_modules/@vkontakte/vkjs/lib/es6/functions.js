export var noop = function noop() {}; // eslint-disable-line @typescript-eslint/no-empty-function

export function throttle(fn) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var last;
  var deferTimer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = scope;
    var now = Date.now();

    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
export function debounce(fn, delay) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var timeout;
  var args;

  var later = function later() {
    return fn.apply(context, args);
  };

  return function () {
    for (var _len2 = arguments.length, a = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      a[_key2] = arguments[_key2];
    }

    args = a;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
//# sourceMappingURL=functions.js.map