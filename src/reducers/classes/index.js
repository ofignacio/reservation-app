import {removeElemnt} from '../../../server/src/utils/object';
import types from './types';

export const INITIAL_STATE = {
  isFetching: false,
  response: {isError: false, message: null},
  classes: [],
  myClass: [],
  date: null,
};

export default (state, action) => {
  state = !state ? INITIAL_STATE : state;
  switch (action.type) {
    // SAVE
    case types.CLASSES_SAVE_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.CLASSES_SAVE_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.CLASSES_SAVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        classes: action.data.classes,
        date: action.data.date,
      };

    // CREATE
    case types.CLASSES_CREATE_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.CLASSES_CREATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.CLASSES_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        classes: [...state.classes, action.myClass],
      };
    case types.CLASSES_CREATE_MASIVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    // SEARCH
    case types.CLASSES_SEARCH_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.CLASSES_SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.CLASSES_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        myClass: action.myClass,
      };

    // REMOVE
    case types.CLASSES_REMOVE_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.CLASSES_REMOVE_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.CLASSES_REMOVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        myClass: removeElemnt(state.myClass, 'username', action.data.idUser),
      };

    // MODIFY
    case types.CLASSES_MODIFY_REQUEST:
      return {...state, isFetching: true, response: INITIAL_STATE.response};
    case types.CLASSES_MODIFY_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: {isError: true, message: action.message},
      };
    case types.CLASSES_MODIFY_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    // OTHER
    case types.CLASSES_CLEAR:
      return {
        ...state,
        response: INITIAL_STATE.response,
      };
    default:
      return state;
  }
};
