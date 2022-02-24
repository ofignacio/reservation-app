import types from './types';

export default {
  getUsersRequest: () => ({
    type: types.USERS_GET_REQUEST,
  }),
  getUsersFailure: message => ({
    type: types.USERS_GET_FAILURE,
    message,
  }),
  getUsersSuccess: user => ({
    type: types.USERS_GET_SUCCESS,
    user,
  }),
  modifyUsersRequest: () => ({
    type: types.USERS_MODIFY_REQUEST,
  }),
  modifyUsersFailure: message => ({
    type: types.USERS_MODIFY_FAILURE,
    message,
  }),
  modifyUsersSuccess: user => ({
    type: types.USERS_MODIFY_SUCCESS,
    user,
  }),
  clear: () => ({
    type: types.USERS_CLEAR,
  }),
};
