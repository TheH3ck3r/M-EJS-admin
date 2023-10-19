export function getOffsetRect(elem) {
  var isElement = elem instanceof HTMLElement;

  if (typeof window === 'undefined' || !isElement) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    };
  }

  var el = elem;
  var box = el.getBoundingClientRect();
  var body = document.body;
  var doc = document.documentElement;
  var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || doc.scrollLeft || body.scrollLeft;
  var clientTop = doc.clientTop || body.clientTop || 0;
  var clientLeft = doc.clientLeft || body.clientLeft || 0;
  return {
    top: Math.round(box.top + scrollTop - clientTop),
    left: Math.round(box.left + scrollLeft - clientLeft),
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}
//# sourceMappingURL=getOffsetRect.js.map