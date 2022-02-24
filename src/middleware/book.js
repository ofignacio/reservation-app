import * as API from './api';

const URL = '/book';

export const reserve = params => API.execute(`${URL}/reserve`, params);

export const drop = params => API.execute(`${URL}/delete`, params);
