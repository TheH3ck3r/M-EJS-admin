import { canUseDOM, canUseEventListeners } from './dom';

/**
 * Функция для js анимации
 * @param {number} duration
 * @param {function} timing тайминг функция анимации
 * @param {function} draw коллбэк, в который прокидывается прогресс [0, 1]
 * @returns {void}
 */
export function animate(_ref) {
  var duration = _ref.duration,
      timing = _ref.timing,
      draw = _ref.draw;

  if (!canUseDOM) {
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

export var animationEvent = {
  supported: false,
  name: 'animationend'
};
export var transitionEvent = {
  supported: false,
  name: 'transitionend'
};

if (canUseDOM) {
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


export function waitAnimationEnd(listener, fallbackTime, el) {
  if (canUseEventListeners) {
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

export function cancelWaitAnimationEnd(listener, handle, el) {
  if (canUseEventListeners) {
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

export function waitTransitionEnd(el, listener, fallbackTime) {
  if (canUseEventListeners) {
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

export function cancelWaitTransitionEnd(listener, handle, el) {
  if (canUseEventListeners) {
    if (transitionEvent.supported && el) {
      el.removeEventListener(transitionEvent.name, listener);
    } else {
      window.clearTimeout(handle);
    }
  }
}
//# sourceMappingURL=animate.js.map