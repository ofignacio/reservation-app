import types from './types';

export default {
  saveAccountRequest: () => ({
    type: types.ACCOUNT_SAVE_REQUEST,
  }),
  saveAccountFailure: message => ({
    type: types.ACCOUNT_SAVE_FAILURE,
    message,
  }),
  saveAccountSuccess: ({account, token}) => ({
    type: types.ACCOUNT_SAVE_SUCCESS,
    data: {account, token},
  }),
  tokenAccountRequest: () => ({
    type: types.ACCOUNT_TOKEN_REQUEST,
  }),
  tokenAccountFailure: message => ({
    type: types.ACCOUNT_TOKEN_FAILURE,
    message,
  }),
  tokenAccountSuccess: account => ({
    type: types.ACCOUNT_TOKEN_SUCCESS,
    account,
  }),
  logout: () => ({
    type: types.ACCOUNT_LOGOUT,
  }),
  modifyAccountRequest: () => ({
    type: types.ACCOUNT_MODIFY_REQUEST,
  }),
  modifyAccountFailure: message => ({
    type: types.ACCOUNT_MODIFY_FAILURE,
    message,
  }),
  modifyAccountSuccess: account => ({
    type: types.ACCOUNT_MODIFY_SUCCESS,
    account,
  }),
  createAccountRequest: () => ({
    type: types.ACCOUNT_CREATE_REQUEST,
  }),
  createAccountFailure: message => ({
    type: types.ACCOUNT_CREATE_FAILURE,
    message,
  }),
  createAccountSuccess: account => ({
    type: types.ACCOUNT_CREATE_SUCCESS,
    account,
  }),
  verifyAccountRequest: () => ({
    type: types.ACCOUNT_VERIFY_REQUEST,
  }),
  verifyAccountFailure: message => ({
    type: types.ACCOUNT_VERIFY_FAILURE,
    message,
  }),
  verifyAccountSuccess: token => ({
    type: types.ACCOUNT_VERIFY_SUCCESS,
    token,
  }),
  resendAccountRequest: () => ({
    type: types.ACCOUNT_RESEND_REQUEST,
  }),
  resendAccountFailure: message => ({
    type: types.ACCOUNT_RESEND_FAILURE,
    message,
  }),
  resendAccountSuccess: () => ({
    type: types.ACCOUNT_RESEND_SUCCESS,
  }),
  clear: () => ({
    type: types.ACCOUNT_CLEAR,
  }),
};
