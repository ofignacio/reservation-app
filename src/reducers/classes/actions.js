import types from './types';

export default {
  saveClassesRequest: () => ({
    type: types.CLASSES_SAVE_REQUEST,
  }),
  saveClassesFailure: message => ({
    type: types.CLASSES_SAVE_FAILURE,
    message,
  }),
  saveClassesSuccess: (classes, date) => ({
    type: types.CLASSES_SAVE_SUCCESS,
    data: {classes, date},
  }),
  createClassesRequest: () => ({
    type: types.CLASSES_CREATE_REQUEST,
  }),
  createClassesFailure: message => ({
    type: types.CLASSES_CREATE_FAILURE,
    message,
  }),
  createClassesSuccess: myClass => ({
    type: types.CLASSES_CREATE_SUCCESS,
    myClass,
  }),
  createMasiveClassesSuccess: () => ({
    type: types.CLASSES_CREATE_MASIVE_SUCCESS,
  }),
  searchClassesRequest: () => ({
    type: types.CLASSES_SEARCH_REQUEST,
  }),
  searchClassesFailure: message => ({
    type: types.CLASSES_SEARCH_FAILURE,
    message,
  }),
  searchClassesSuccess: myClass => ({
    type: types.CLASSES_SEARCH_SUCCESS,
    myClass,
  }),
  removeClassesRequest: () => ({
    type: types.CLASSES_REMOVE_REQUEST,
  }),
  removeClassesFailure: message => ({
    type: types.CLASSES_REMOVE_FAILURE,
    message,
  }),
  removeClassesSuccess: data => ({
    type: types.CLASSES_REMOVE_SUCCESS,
    data,
  }),
  modifyClassRequest: () => ({
    type: types.CLASSES_MODIFY_REQUEST,
  }),
  modifyClassFailure: message => ({
    type: types.CLASSES_MODIFY_FAILURE,
    message,
  }),
  modifyClassSuccess: () => ({
    type: types.CLASSES_MODIFY_SUCCESS,
  }),
  clear: () => ({
    type: types.CLASSES_CLEAR,
  }),
};
