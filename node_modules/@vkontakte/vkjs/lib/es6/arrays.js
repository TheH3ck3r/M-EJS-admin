import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

/**
 * Вычисляет сумму элементов массива
 */
export function sumArray(array) {
  if (!Array.isArray(array) || !array.length) {
    return 0;
  }

  return array.reduce(function (previous, current) {
    return current + previous;
  });
}
/**
 * Находит среднее арифметическое элементов массива
 */

export function averageArray(array) {
  if (!Array.isArray(array) || !array.length) {
    return 0;
  }

  return sumArray(array) / array.length;
}
/**
 * Возвращает новый массив с уникальными элементами
 */

export function uniqueArray(array) {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}
/**
 * Перемешивает исходный массив и возвращает новый
 */

export function shuffleArray(array) {
  return array.map(function (a) {
    return [Math.random(), a];
  }).sort(function (a, b) {
    return a[0] - b[0];
  }).map(function (a) {
    return a[1];
  });
}
/**
 * Разбивает массив на чанки
 */

export function chunkArray(array, size) {
  if (!array.length) {
    return [];
  }

  var head = array.slice(0, size);
  var tail = array.slice(size);
  return [head].concat(_toConsumableArray(chunkArray(tail, size)));
}
/**
 * Удаляет из массива элемент по значению.
 * Если элемент был удалён – возвращает новый массив.
 *
 * @example
 *
 * omitFromArray([1, 2, 3], 3) // [1, 2]
 * omitFromArray([1, 2, 3], 5) // [1, 2, 3]
 */

export function omitFromArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments.length > 1 ? arguments[1] : undefined;
  var index = array.indexOf(value);

  if (index < 0) {
    return array;
  } else {
    return [].concat(_toConsumableArray(array.slice(0, index)), _toConsumableArray(array.slice(index + 1)));
  }
}
/**
 * Возвращает разницу между двумя массивами.
 * Вернёт элементы, которых не хватает во втором массиве.
 *
 * @example
 *
 * difference([1, 2, 3], [1, 2, 3]) // []
 * difference([1, 2, 3], [1]) // [2, 3]
 * difference([1, 2, 3], [1, 10, 100]) // [2, 3]
 */

export function difference() {
  var array1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var array2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return array1.reduce(function (res, item) {
    if (array2.indexOf(item) < 0) {
      res.push(item);
    }

    return res;
  }, []);
}
//# sourceMappingURL=arrays.js.map