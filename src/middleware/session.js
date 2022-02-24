import * as API from './api';

const URL = '/session';

export const enter = params => API.executeAnonymous(`${URL}/login`, params);

export const register = params =>
  API.executeAnonymous(`${URL}/register`, params);

export const verify = params => API.executeAnonymous(`${URL}/verify`, params);

export const resend = params => API.executeAnonymous(`${URL}/resend`, params);
