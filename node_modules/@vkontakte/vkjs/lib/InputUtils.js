"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasTouch = exports.hasTouchEvents = exports.hasHover = exports.hasMouse = void 0;

var _IOSDetections = require("./IOSDetections");

var _dom = require("./dom");

var hasMouse;
exports.hasMouse = hasMouse;
var hasTouchEvents;
exports.hasTouchEvents = hasTouchEvents;
var hasHover;
exports.hasHover = hasHover;
var hasTouch;
exports.hasTouch = hasTouch;

if (_dom.canUseDOM) {
  if (_IOSDetections.isIOS && !_IOSDetections.isIPadOS) {
    exports.hasMouse = hasMouse = false;
    exports.hasHover = hasHover = false;
    exports.hasTouchEvents = hasTouchEvents = true;
    exports.hasTouch = hasTouch = true;
  } else {
    exports.hasTouchEvents = hasTouchEvents = 'ontouchstart' in document;
    exports.hasTouch = hasTouch = hasTouchEvents || 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0;

    if (hasTouch) {
      var notMobile = !/android|mobile|tablet/i.test(navigator.userAgent);
      exports.hasMouse = hasMouse = window.matchMedia && matchMedia('(pointer)').matches ? matchMedia('(pointer: fine)').matches : notMobile;
      exports.hasHover = hasHover = hasMouse && (window.matchMedia && matchMedia('(hover)').matches ? matchMedia('(hover: hover)').matches : notMobile);
    } else {
      exports.hasMouse = hasMouse = true;
      exports.hasHover = hasHover = true;
    }
  }
} else {
  exports.hasMouse = hasMouse = false;
  exports.hasTouchEvents = hasTouchEvents = false;
  exports.hasHover = hasHover = false;
  exports.hasTouch = hasTouch = false;
}
//# sourceMappingURL=InputUtils.js.map