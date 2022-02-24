import types from './types';

export default {
  notificationRequest: () => ({
    type: types.NOTIFICATION_REQUEST,
  }),
  notificationFailure: message => ({
    type: types.NOTIFICATION_FAILURE,
    message,
  }),
  notificationSuccess: notifications => ({
    type: types.NOTIFICATION_SUCCESS,
    notifications,
  }),
  sendNotificationRequest: () => ({
    type: types.NOTIFICATION_SEND_REQUEST,
  }),
  sendNotificationFailure: message => ({
    type: types.NOTIFICATION_SEND_FAILURE,
    message,
  }),
  sendNotificationSuccess: () => ({
    type: types.NOTIFICATION_SEND_SUCCESS,
  }),
  clear: () => ({
    type: types.NOTIFICATION_CLEAR,
  }),
};
