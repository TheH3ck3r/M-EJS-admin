import { leadingZero } from './numbers';
export var SECONDS_IN_THE_DAY = 86400;
var MILLISECONDS_IN_THE_DAY = SECONDS_IN_THE_DAY * 1000;
/**
 * Проверяет, что переданная дата является сегодняшним днём
 */

export function isDateToday(date) {
  var now = new Date();
  var d = now.getDate();
  var m = now.getMonth();
  var y = now.getFullYear();
  return date.getFullYear() === y && date.getMonth() === m && date.getDate() === d;
}
/**
 * Проверяет, что переданная дата - вчерашний день
 */

export function isDateYesterday(date) {
  var yesterdayDate = new Date(date.getTime() + MILLISECONDS_IN_THE_DAY);
  return isDateToday(yesterdayDate);
}
/**
 * Проверяет, что переданная дата - завтрашний день
 */

export function isDateTomorrow(date) {
  var tomorrowDate = new Date(date.getTime() - MILLISECONDS_IN_THE_DAY);
  return isDateToday(tomorrowDate);
}
/**
 * Проверяет что переданные даты находятся в одном дне
 */

export function isSameDate(d1, d2) {
  return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
}
/**
 * Возвращает новую дату — начало переданного дня
 */

export function getBeginningOfDay(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return new Date(year, month, day, 0, 0, 0, 0);
}
export function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * Возвращает кол-во дней в месяце (последнее число месяца)
 */

export function getLastDayOfMonth(year, month) {
  if (+month === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else if (month > 0 && (month < 8 && month % 2 === 0 || month > 7 && month % 2 === 1)) {
    return 30;
  }

  return 31;
}
/**
 * Ближайший понедельник в прошлом относительно date
 */

export function getStartOfWeek(date) {
  var weekDay = date.getDay();

  if (weekDay === 0) {
    return addDays(date, -6);
  }

  return addDays(date, -weekDay + 1);
}
/**
 * Добавляет дни к дате и возвращает новый объект
 */

export function addDays(date, dayCount) {
  var modified = new Date(date.getTime());
  modified.setDate(modified.getDate() + dayCount);
  return modified;
}
/**
 * Создаёт дату из Unix Timestamp
 */

export function createDateFromUnixTimestamp(timestamp) {
  return new Date(timestamp * 1000);
}
/**
 * Возвращает Unix Timestamp из даты
 */

export function getUnixTimestampFromDate(date) {
  return Math.floor(date.getTime() / 1000);
}
/**
 * Возвращает дату в формате YYYY-MM-DD
 */

export function convertDateToInputFormat(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return [year, leadingZero(month), leadingZero(day)].join('-');
}
//# sourceMappingURL=date.js.map