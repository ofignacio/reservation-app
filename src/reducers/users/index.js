import types from './types';

export const INITIAL_STATE = {
  isFetching: false,
  response: {isError: false, message: null},
  user: {},
};

export default (state, action) => {
  state = !state ? INITIAL_STATE : state;
  switch (action.type) {
    // GET
    case types.USERS_GET_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.USERS_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.USERS_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.user,
      };

    // MODIFY
    case types.USERS_MODIFY_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.USERS_MODIFY_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.USERS_MODIFY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: {...state.user, ...action.user},
      };

    // OTHER

    case types.USERS_CLEAR:
      return {
        ...state,
        response: INITIAL_STATE.response,
      };
    default:
      return state;
  }
};
