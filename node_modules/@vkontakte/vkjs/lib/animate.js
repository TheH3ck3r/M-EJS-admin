"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = animate;
exports.waitAnimationEnd = waitAnimationEnd;
exports.cancelWaitAnimationEnd = cancelWaitAnimationEnd;
exports.waitTransitionEnd = waitTransitionEnd;
exports.cancelWaitTransitionEnd = cancelWaitTransitionEnd;
exports.transitionEvent = exports.animationEvent = void 0;

var _dom = require("./dom");

/**
 * Функция для js анимации
 * @param {number} duration
 * @param {function} timing тайминг функция анимации
 * @param {function} draw коллбэк, в который прокидывается прогресс [0, 1]
 * @returns {void}
 */
function animate(_ref) {
  var duration = _ref.duration,
      timing = _ref.timing,
      draw = _ref.draw;

  if (!_dom.canUseDOM) {
    return;
  }

  var start = window.performance.now();
  window.requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    var progress = timing(timeFraction);
    draw(progress);

    if (timeFraction < 1) {
      window.requestAnimationFrame(animate);
    }
  });
} // WebKitAnimationEvent и WebKitTransitionEvent не существуют в глобальном контексте


var animationEvent = {
  supported: false,
  name: 'animationend'
};
exports.animationEvent = animationEvent;
var transitionEvent = {
  supported: false,
  name: 'transitionend'
};
exports.transitionEvent = transitionEvent;

if (_dom.canUseDOM) {
  if (typeof AnimationEvent !== 'undefined') {
    animationEvent.supported = true;
  } else if (typeof WebKitAnimationEvent !== 'undefined') {
    animationEvent.supported = true; // webkitAnimationEnd не входит в перечисление событий, но соответствует animationend

    animationEvent.name = 'webkitAnimationEnd';
  }

  if (typeof TransitionEvent !== 'undefined') {
    transitionEvent.supported = true;
  } else if (typeof WebKitTransitionEvent !== 'undefined') {
    transitionEvent.supported = true; // webkitTransitionEnd не входит в перечисление событий, но соответствует transitionend

    transitionEvent.name = 'webkitTransitionEnd';
  }
}
/**
 * Ожидание окончания анимации на элементе
 *
 * @param listener коллбэк окончания ожидания
 * @param fallbackTime сколько ждать в мс если событие не поддерживается
 * @param el элемент
 */


function waitAnimationEnd(listener, fallbackTime, el) {
  if (_dom.canUseEventListeners) {
    if (animationEvent.supported && el) {
      el.addEventListener(animationEvent.name, listener);
    } else {
      return window.setTimeout(listener, fallbackTime);
    }
  }
}
/**
 * Прекращение ожидания окончания анимации на элементе
 *
 * @param listener коллбэк окончания ожидания
 * @param handle то, что вернулось из ```waitAnimationEnd```
 * @param el элемент
 */


function cancelWaitAnimationEnd(listener, handle, el) {
  if (_dom.canUseEventListeners) {
    if (animationEvent.supported && el) {
      el.removeEventListener(animationEvent.name, listener);
    } else {
      window.clearTimeout(handle);
    }
  }
}
/**
 * Ожидание окончания анимации перехода на элементе
 *
 * @param listener коллбэк окончания ожидания
 * @param fallbackTime сколько ждать в мс если событие не поддерживается
 * @param el элемент
 */


function waitTransitionEnd(el, listener, fallbackTime) {
  if (_dom.canUseEventListeners) {
    if (transitionEvent.supported && el) {
      el.addEventListener(transitionEvent.name, listener);
    } else {
      return window.setTimeout(listener, fallbackTime);
    }
  }
}
/**
 * Прекращение ожидания окончания анимации перехода на элементе
 *
 * @param listener коллбэк окончания ожидания
 * @param handle то, что вернулось из ```waitTransitionEnd```
 * @param el элемент
 */


function cancelWaitTransitionEnd(listener, handle, el) {
  if (_dom.canUseEventListeners) {
    if (transitionEvent.supported && el) {
      el.removeEventListener(transitionEvent.name, listener);
    } else {
      window.clearTimeout(handle);
    }
  }
}
//# sourceMappingURL=animate.js.map