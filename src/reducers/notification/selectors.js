export default {
  getResponse: ({notification}) => notification.response,
  isFetching: ({notification}) => notification.isFetching,
  getNotifications: ({notification}) => notification.notifications,
};
