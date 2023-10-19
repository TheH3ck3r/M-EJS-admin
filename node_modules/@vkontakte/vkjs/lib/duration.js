"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDuration = formatDuration;

var _numbers = require("./numbers");

/**
 * @param durationInSeconds
 * @param forceHours
 */
function formatDuration(durationInSeconds, forceHours) {
  if (!durationInSeconds) {
    durationInSeconds = 0;
  }

  durationInSeconds = Math.abs(durationInSeconds);
  var MINUTE = 60;
  var HOUR = 3600;
  var hours = Math.floor(durationInSeconds / HOUR);
  var minutes = Math.floor(durationInSeconds / MINUTE) % MINUTE;
  var seconds = durationInSeconds % MINUTE;

  if (durationInSeconds >= HOUR || forceHours) {
    return [hours, (0, _numbers.leadingZero)(minutes), (0, _numbers.leadingZero)(seconds)].join(':');
  } else {
    return [minutes, (0, _numbers.leadingZero)(seconds)].join(':');
  }
}
//# sourceMappingURL=duration.js.map