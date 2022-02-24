export const validateError = error => {
  if (typeof error === 'object' && error.message) return error.message;
  else if (typeof error === 'string') return error;
  else return 'client.internalerror';
};
