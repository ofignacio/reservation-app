import * as API from './api';

const URL = '/users';

export const get = params => API.execute(`${URL}/search`, params);

export const modify = params => API.execute(`${URL}/modify`, params);

export const pass = params => API.execute(`${URL}/modify/pass`, params);
