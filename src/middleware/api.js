import {PORT, IP, PROTOCOL} from './constants';
import {API} from './constants';
import {store} from '../store';

const headers = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

const login = params => ({
  ...headers,
  headers: {
    ...headers.headers,
    'x-access-token': store.getState().account.token,
  },
  body: JSON.stringify(params),
});

const open = params => ({
  ...headers,
  headers: {
    ...headers.headers,
    'o-access-token': store.getState().account.openToken,
  },
  body: JSON.stringify(params),
});

const handleFetch = async (route, params, callback) => {
  const json = await fetch(
    `${PROTOCOL}://${IP}:${PORT}${API}${route}`,
    callback(params),
  ).then(async response => await response.json());
  if (json.status !== 200) throw json.error;
  return json;
};

export const executeAnonymous = async (route, params) =>
  handleFetch(route, params, open);

export const execute = async (route, params) =>
  handleFetch(route, params, login);
