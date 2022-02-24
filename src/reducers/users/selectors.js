export default {
  getUser: ({users}) => users.user,
  getResponse: ({users}) => users.response,
  isFetching: ({users}) => users.isFetching,
};
