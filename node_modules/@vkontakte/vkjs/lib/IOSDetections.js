"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectIOS = detectIOS;
exports.isLandscapePhone = isLandscapePhone;
exports.checkIPadOS = checkIPadOS;
exports.isIOSChrome = exports.isIPhoneX = exports.isScrollBasedViewport = exports.isWKWebView = exports.iosMinor = exports.iosMajor = exports.isIPadOS = exports.isIOS = exports.isIPhone = exports.isIPad = exports.IOS_NO_KEYBOARD_ALLOWED_OFFSET = exports.IPHONE_KEYBOARD_REJECT_OFFSET = exports.IPHONE_X_SAFARI_BOTTOM_BAR = exports.IPHONE_SAFARI_BOTTOM_BAR = void 0;

var _dom = require("./dom");

var IPHONE_SAFARI_BOTTOM_BAR = 45;
exports.IPHONE_SAFARI_BOTTOM_BAR = IPHONE_SAFARI_BOTTOM_BAR;
var IPHONE_X_SAFARI_BOTTOM_BAR = 85;
exports.IPHONE_X_SAFARI_BOTTOM_BAR = IPHONE_X_SAFARI_BOTTOM_BAR;
var IPHONE_KEYBOARD_REJECT_OFFSET = 180; // 44 iPhone, 55 iPad, iPad Pro 69

exports.IPHONE_KEYBOARD_REJECT_OFFSET = IPHONE_KEYBOARD_REJECT_OFFSET;
var IOS_NO_KEYBOARD_ALLOWED_OFFSET = 70;
exports.IOS_NO_KEYBOARD_ALLOWED_OFFSET = IOS_NO_KEYBOARD_ALLOWED_OFFSET;

function detectIOS(ua) {
  if (!ua) {
    ua = _dom.canUseDOM ? navigator.userAgent.toLowerCase() : '';
  }

  var isIPadOS = checkIPadOS(ua);
  var isIPad = isIPadOS || ua.indexOf('ipad') !== -1;
  var isIPhone = !isIPad && ua.search(/iphone|ipod/) !== -1;
  var isIOS = isIPhone || isIPad;
  var iosVersion = isIOS && ua.match(/OS ([\d_]+) like Mac OS X/i);
  var iosMajor = 0;
  var iosMinor = 0;

  if (isIPadOS) {
    iosMajor = 13;
    iosMinor = 0;
  } else if (iosVersion) {
    iosVersion = iosVersion[1].split('_');
    iosMajor = +iosVersion[0];
    iosMinor = +iosVersion[1];
  }

  iosVersion = null;
  var isScrollBasedViewport = iosMajor < 13 && !(iosMajor === 11 && iosMinor < 3);
  var isWKWebView = isIOS && checkWKWebView(ua);
  var isIPhoneX = false;

  if (_dom.canUseDOM) {
    isIPhoneX = isIOS && screen.width === 375 && screen.height === 812 && window.devicePixelRatio === 3;
  }

  var isIOSChrome = ua.search(/crios/i) !== -1;
  return {
    isIPad: isIPad,
    isIPhone: isIPhone,
    isIOS: isIOS,
    isIPadOS: isIPadOS,
    iosMajor: iosMajor,
    iosMinor: iosMinor,
    isWKWebView: isWKWebView,
    isScrollBasedViewport: isScrollBasedViewport,
    isIPhoneX: isIPhoneX,
    isIOSChrome: isIOSChrome
  };
}

var _detectIOS = detectIOS(),
    isIPad = _detectIOS.isIPad,
    isIPhone = _detectIOS.isIPhone,
    isIOS = _detectIOS.isIOS,
    isIPadOS = _detectIOS.isIPadOS,
    iosMajor = _detectIOS.iosMajor,
    iosMinor = _detectIOS.iosMinor,
    isWKWebView = _detectIOS.isWKWebView,
    isScrollBasedViewport = _detectIOS.isScrollBasedViewport,
    isIPhoneX = _detectIOS.isIPhoneX,
    isIOSChrome = _detectIOS.isIOSChrome;

exports.isIOSChrome = isIOSChrome;
exports.isIPhoneX = isIPhoneX;
exports.isScrollBasedViewport = isScrollBasedViewport;
exports.isWKWebView = isWKWebView;
exports.iosMinor = iosMinor;
exports.iosMajor = iosMajor;
exports.isIPadOS = isIPadOS;
exports.isIOS = isIOS;
exports.isIPhone = isIPhone;
exports.isIPad = isIPad;

function isLandscapePhone() {
  return Math.abs(window.orientation) === 90 && !isIPad;
} // Reference:
// https://stackoverflow.com/questions/28795476/detect-if-page-is-loaded-inside-wkwebview-in-javascript/30495399#30495399


function checkWKWebView(ua) {
  if (!_dom.canUseDOM) {
    return false;
  }

  var webkit = window.webkit;

  if (webkit && webkit.messageHandlers) {
    return true;
  }

  var lte9 = /constructor/i.test(String(window.HTMLElement));
  var idb = !!window.indexedDB;

  if (ua.indexOf('safari') !== -1 && ua.indexOf('version') !== -1 && !navigator.standalone) {// Safari (WKWebView/Nitro since 6+)
  } else if (!idb && lte9 || !(window.statusbar && window.statusbar.visible)) {// UIWebView
  } else if (!lte9 || idb) {
    // WKWebView
    return true;
  }

  return false;
}

function checkIPadOS(ua) {
  if (!_dom.canUseDOM) {
    return false;
  }

  var notIOS = !/ipad|iphone|ipod/.test(ua);
  var macOS = /mac os/.test(ua);

  if (macOS && notIOS && typeof navigator.standalone === 'boolean') {
    return true;
  }

  return false;
}
//# sourceMappingURL=IOSDetections.js.map