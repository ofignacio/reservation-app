export default {
  getAccount: ({account}) => account.account,
  getResponse: ({account}) => account.response,
  isFetching: ({account}) => account.isFetching,
  isLogged: ({account}) => account.logged,
  getToken: ({account}) => account.token,
  getOpenToken: ({account}) => account.openToken,
};
