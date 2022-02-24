import * as API from './api';

const URL = '/notification';

export const get = params => API.execute(`${URL}/get`, params);

export const create = params => API.execute(`${URL}/create`, params);
