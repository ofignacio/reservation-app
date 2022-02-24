import types from './types';

export const INITIAL_STATE = {
  isFetching: false,
  response: {isError: false, message: null},
  account: null,
  token: null,
  openToken: null,
  logged: false,
};

export default (state, action) => {
  state = !state ? INITIAL_STATE : state;
  switch (action.type) {
    // SAVE
    case types.ACCOUNT_SAVE_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.ACCOUNT_SAVE_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.ACCOUNT_SAVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        account: action.data.account,
        token: action.data.token,
        logged: true,
      };

    // TOKEN
    case types.ACCOUNT_TOKEN_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.ACCOUNT_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.ACCOUNT_TOKEN_SUCCESS:
      return {...state, isFetching: false, openToken: action.token};

    // SESSION
    case types.ACCOUNT_LOGOUT:
      return {...state, logged: false, account: null, token: null};

    //MODIFY
    case types.ACCOUNT_MODIFY_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.ACCOUNT_MODIFY_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.ACCOUNT_MODIFY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        account: {...state.account, ...action.account},
      };

    //CREATE
    case types.ACCOUNT_CREATE_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.ACCOUNT_CREATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.ACCOUNT_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        account: action.account,
        logged: true,
      };

    //VERIFY
    case types.ACCOUNT_VERIFY_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.ACCOUNT_VERIFY_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.ACCOUNT_VERIFY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        account: {...state.account, verified: 1},
        token: action.token,
      };

    //RESEND
    case types.ACCOUNT_RESEND_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.ACCOUNT_RESEND_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.ACCOUNT_RESEND_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    // OTHER
    case types.ACCOUNT_CLEAR:
      return {
        ...state,
        response: INITIAL_STATE.response,
      };
    default:
      return state;
  }
};
