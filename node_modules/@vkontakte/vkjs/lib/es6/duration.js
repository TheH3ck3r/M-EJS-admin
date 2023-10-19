import { leadingZero } from './numbers';
/**
 * @param durationInSeconds
 * @param forceHours
 */

export function formatDuration(durationInSeconds, forceHours) {
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
    return [hours, leadingZero(minutes), leadingZero(seconds)].join(':');
  } else {
    return [minutes, leadingZero(seconds)].join(':');
  }
}
//# sourceMappingURL=duration.js.map