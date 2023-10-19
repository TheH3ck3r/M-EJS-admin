"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;
exports.getRandomString = getRandomString;

function getRandomInt(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
/**
 * Генерирует случайную строку из символов латинского алфавита и цифр
 */


function getRandomString() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = [];

  for (var i = 0; i < length; i++) {
    result.push(source.charAt(Math.floor(Math.random() * source.length)));
  }

  return result.join('');
}
//# sourceMappingURL=random.js.map