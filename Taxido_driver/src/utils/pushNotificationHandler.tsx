import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  if (enabled) {
    getFcmToken()
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken()
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (error) {}
  }
}
export const NotificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {})
  messaging().onMessage(async remoteMessage => {})
  messaging().setBackgroundMessageHandler(async remoteMessage => {})

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    })
}
