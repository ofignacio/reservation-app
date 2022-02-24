import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);

    bgMessage(notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function(notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

export const initialize = () => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'bethel-general', // (required)
        channelName: 'bethel', // (required)
        channelDescription: 'Canal para las notificaciones generales', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
};

export const bgMessage = notification => {
  console.log(notification);
  PushNotification.localNotification({
    channelId: 'bethel-general', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    largeIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    color: 'black', // (optional) default: system default
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    alertAction: 'view', // (optional) default: view
    title: notification.title, // (optional)
    visibility: 'public',
    priority: 'high',
    ignoreInForeground: false,
    message: notification.message, // (required)
    data: {
      title: notification.title,
      message: notification.message,
    },
  });

  notification.finish(PushNotificationIOS.FetchResult.NoData);
};
