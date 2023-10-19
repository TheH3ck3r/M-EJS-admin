"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSmoothScrollSupported = exports.isPassiveEventsSupported = void 0;

var _functions = require("./functions");

var _dom = require("./dom");

var isPassiveEventsSupported = false;
exports.isPassiveEventsSupported = isPassiveEventsSupported;

if (_dom.canUseEventListeners) {
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        exports.isPassiveEventsSupported = isPassiveEventsSupported = true;
      }
    });
    window.addEventListener('test', _functions.noop, options);
    window.removeEventListener('test', _functions.noop, options);
  } catch (e) {}
}

function detectSmoothScrollSupport() {
  if (!_dom.canUseDOM) {
    return false;
  }

  var isSupported = false;

  try {
    var div = document.createElement('div');
    div.scrollTo({
      top: 0,

      // @ts-ignore
      get behavior() {
        isSupported = true;
        return 'smooth';
      }

    });
  } catch (e) {}

  return isSupported;
}

var isSmoothScrollSupported = detectSmoothScrollSupport();
exports.isSmoothScrollSupported = isSmoothScrollSupported;
//# sourceMappingURL=detections.js.map