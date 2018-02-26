/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
export function isError(value) {
  return Object.prototype.toString.call(value) == "[object Error]";
}

export function isException(value) {
  return Object.prototype.toString.call(value) == "[object Exception]";
}

export function isDOMException(value) {
  return Object.prototype.toString.call(value) == "[object DOMException]";
}

export function isPlainObject(value) {
  return Object.prototype.toString.call(value) == "[object object]";
}

export function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}

export function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

export function isEmptyObject(value) {
  if (!isPlainObject(value)) return false;

  for (var _ in value) {
    if (value.hasOwnProperty(_)) {
      return false;
    }
  }
  return true;
}

export function uuid() {
  return '123456';
}
