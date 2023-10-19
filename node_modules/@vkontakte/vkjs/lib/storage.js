"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionStorage = exports.localStorage = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var CustomStorage = /*#__PURE__*/function () {
  function CustomStorage() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, CustomStorage);
    (0, _defineProperty2["default"])(this, "data", {});
    (0, _defineProperty2["default"])(this, "getItem", function (key) {
      return _this.data.hasOwnProperty(key) ? _this.data[key] : null;
    });
    (0, _defineProperty2["default"])(this, "keys", function () {
      return Object.keys(_this.data);
    });
  }

  (0, _createClass2["default"])(CustomStorage, [{
    key: "setItem",
    value: function setItem(key, val) {
      this.data[key] = String(val);
    }
  }, {
    key: "removeItem",
    value: function removeItem(id) {
      delete this.data[id];
    }
  }, {
    key: "clear",
    value: function clear() {
      this.data = {};
    }
  }, {
    key: "key",
    value: function key(index) {
      return Object.keys(this.data)[index];
    }
  }, {
    key: "length",
    get: function get() {
      return Object.keys(this.data).length;
    }
  }]);
  return CustomStorage;
}();

var dummyKey = 'vk-ls-dummy';
var dummyContent = 'test';
var ls;

function getLocalStorage() {
  if (ls) {
    return ls;
  }

  try {
    // Проверяем, нет ли в FF или Safari cross domain security restrictions
    window.localStorage.setItem(dummyKey, dummyContent);

    if (dummyContent !== window.localStorage.getItem(dummyKey)) {
      throw new Error('localStorage is broken');
    }

    window.localStorage.removeItem(dummyKey);
    ls = window.localStorage;
  } catch (e) {
    ls = new CustomStorage();
  }

  return ls;
}
/**
 * Обертка над localStorage для кода, который может использоваться на других сайтах
 * Firefox блокирует доступ к localStorage для скриптов с других доменов
 */


var localStorage = {
  setItem: function setItem(key, val) {
    return getLocalStorage().setItem(key, val);
  },
  getItem: function getItem(key) {
    return getLocalStorage().getItem(key);
  },
  removeItem: function removeItem(key) {
    return getLocalStorage().removeItem(key);
  },
  clear: function clear() {
    return getLocalStorage().clear();
  },
  length: function length() {
    return getLocalStorage().length;
  },
  key: function key(index) {
    return getLocalStorage().key(index);
  },
  keys: function keys() {
    var storage = getLocalStorage();

    if (storage instanceof CustomStorage) {
      return storage.keys();
    } else {
      return Object.keys(storage);
    }
  },
  getPrefixedKeys: function getPrefixedKeys(prefix) {
    return localStorage.keys().filter(function (key) {
      return key.startsWith(prefix);
    });
  }
};
exports.localStorage = localStorage;
var sessionStorageCache;

function getSessionStorage() {
  if (sessionStorageCache) {
    return sessionStorageCache;
  }

  try {
    // Проверяем, нет ли в FF или Safari cross domain security restrictions
    window.sessionStorage.setItem(dummyKey, dummyContent);

    if (dummyContent !== window.sessionStorage.getItem(dummyKey)) {
      throw new Error('sessionStorage is broken');
    }

    window.sessionStorage.removeItem(dummyKey);
    sessionStorageCache = window.sessionStorage;
  } catch (e) {
    sessionStorageCache = new CustomStorage();
  }

  return sessionStorageCache;
}

var sessionStorage = {
  setItem: function setItem(key, val) {
    return getSessionStorage().setItem(key, val);
  },
  getItem: function getItem(key) {
    return getSessionStorage().getItem(key);
  },
  removeItem: function removeItem(key) {
    return getSessionStorage().removeItem(key);
  },
  clear: function clear() {
    return getSessionStorage().clear();
  },
  length: function length() {
    return getSessionStorage().length;
  },
  key: function key(index) {
    return getSessionStorage().key(index);
  },
  keys: function keys() {
    var storage = getSessionStorage();

    if (storage instanceof CustomStorage) {
      return storage.keys();
    } else {
      return Object.keys(storage);
    }
  },
  getPrefixedKeys: function getPrefixedKeys(prefix) {
    return sessionStorage.keys().filter(function (key) {
      return key.startsWith(prefix);
    });
  }
};
exports.sessionStorage = sessionStorage;
//# sourceMappingURL=storage.js.map