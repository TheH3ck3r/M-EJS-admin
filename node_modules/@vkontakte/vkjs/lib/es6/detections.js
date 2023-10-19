import { noop } from './functions';
import { canUseDOM, canUseEventListeners } from './dom';
export var isPassiveEventsSupported = false;

if (canUseEventListeners) {
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        isPassiveEventsSupported = true;
      }
    });
    window.addEventListener('test', noop, options);
    window.removeEventListener('test', noop, options);
  } catch (e) {}
}

function detectSmoothScrollSupport() {
  if (!canUseDOM) {
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

export var isSmoothScrollSupported = detectSmoothScrollSupport();
//# sourceMappingURL=detections.js.map