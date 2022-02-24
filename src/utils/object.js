export const getDiferences = (values, original, excludes = []) => {
  let result = {};
  if (typeof excludes === "string") {
    excludes = [excludes];
  }
  Object.keys(values).map((key) => {
    if (
      Object.keys(original).includes(key) &&
      values[key] !== null &&
      values[key].length > 0 &&
      values[key] !== original[key]
    ) {
      Object.assign(result, { [key]: values[key] });
    }
    return key;
  });
  excludes.forEach((item) => {
    const value = values[item];
    if (
      (typeof value === "object" && Object.keys(value).length) ||
      (typeof value === "string" && value.length)
    ) {
      Object.assign(result, { [item]: values[item] });
    }
  });
  return result;
};
