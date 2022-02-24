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
  deleteRequest: () => ({
    type: types.RESERVE_DELETE_REQUEST,
  }),
  deleteFailure: message => ({
    type: types.RESERVE_DELETE_FAILURE,
    message,
  }),
  deleteSuccess: () => ({
    type: types.RESERVE_DELETE_SUCCESS,
  }),
  clear: () => ({
    type: types.RESERVE_CLEAR,
  }),
};
