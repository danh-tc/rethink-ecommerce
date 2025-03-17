export function isEmail(value) {
  const isEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return isEmail.test(value);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function hasMaxLength(value, maxLength) {
  return value.length <= maxLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
