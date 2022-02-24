import * as API from './api';

const URL = '/classes';

export const get = params => API.execute(`${URL}/get`, params);

export const create = params => API.execute(`${URL}/create`, params);

export const modify = params => API.execute(`${URL}/modify`, params);

export const removeClass = params => API.execute(`${URL}/removeClass`, params);

export const createMasive = params =>
  API.execute(`${URL}/create/masive`, params);

export const search = params => API.execute(`${URL}/search`, params);

export const remove = params => API.execute(`${URL}/remove`, params);
