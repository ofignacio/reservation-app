import * as API from './api';

const URL = '/recover';

export const verify = params => API.executeAnonymous(`${URL}/verify`, params);
