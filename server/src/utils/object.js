export const createQuery = (values, validate = []) => {
  let result = '';
  let array = [];
  if (typeof validate === 'string') validate = [validate];
  Object.keys(values).forEach(key => {
    if (validate.includes(key)) {
      result += `${key} = ?,`;
      array.push(values[key]);
    }
  });
  result = result.substring(0, result.length - 1);
  return {result, array};
};

export const removeElemnt = (array, field, value) => {
  const result = array;
  const index = array.findIndex(x => x[field] === value);
  if (index > 0) {
    result.splice(index, 1);
  } else {
    return [];
  }
  return result;
};
