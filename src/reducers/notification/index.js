import types from './types';

export const INITIAL_STATE = {
  isFetching: false,
  response: {isError: false, message: null},
  notifications: [],
};

export default (state, action) => {
  state = !state ? INITIAL_STATE : state;
  switch (action.type) {
    // SAVE
    case types.NOTIFICATION_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.NOTIFICATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.NOTIFICATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.notifications,
      };

    // SEND
    case types.NOTIFICATION_SEND_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.NOTIFICATION_SEND_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.NOTIFICATION_SEND_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    // OTHER
    case types.NOTIFICATION_CLEAR:
      return {
        ...state,
        response: INITIAL_STATE.response,
      };
    default:
      return state;
  }
};
