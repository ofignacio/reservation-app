import types from './types';

export default {
  reserveRequest: () => ({
    type: types.RESERVE_REQUEST,
  }),
  reserveFailure: message => ({
    type: types.RESERVE_FAILURE,
    message,
  }),
  reserveSuccess: () => ({
    type: types.RESERVE_SUCCESS,
  }),
};
