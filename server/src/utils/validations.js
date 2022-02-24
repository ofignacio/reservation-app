export const vString = (string, minimumLength = 0) =>
  !string || string.trim().length < minimumLength;

export const vNumber = (number, minimumNumber = 0) =>
  isNaN(number) || parseInt(number, 10) < minimumNumber;

export const vArray = (array, minimumLength = 0) =>
  !array || array.length < minimumLength;

export const parseBoolean = (string) => string === "true";
