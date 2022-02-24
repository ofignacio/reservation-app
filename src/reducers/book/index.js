import types from './types';

export const INITIAL_STATE = {
  isFetching: false,
  response: {isError: false, message: null},
};

export default (state, action) => {
  state = !state ? INITIAL_STATE : state;
  switch (action.type) {
    // SAVE
    case types.RESERVE_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.RESERVE_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.RESERVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    //DELETE
    case types.RESERVE_DELETE_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.RESERVE_DELETE_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.RESERVE_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: {isError: false, message: 'Se logró desagendarse'},
      };

    // OTHER
    case types.RESERVE_CLEAR:
      return {
        ...state,
        response: INITIAL_STATE.response,
      };
    default:
      return state;
  }
};
