import React, { useEffect } from 'react'
import Navigation from './src/navigation'
import { AppContextProvider } from './src/utils/context'
import { Provider } from 'react-redux'
import store from './src/api/store'
import { MenuProvider } from 'react-native-popup-menu'
import {
  NotificationServices,
  requestUserPermission,
} from './src/utils/pushNotificationHandler'
import { LoadingProvider } from './src/utils/loadingContext'
import { NotifierRoot } from 'react-native-notifier'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Platform, View } from 'react-native'

const index = () => {
  useEffect(() => {
    NotificationServices()
    requestUserPermission()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider>
        <View style={{ paddingTop: Platform.OS === 'ios' ? 60 : 0 }} />
        <Provider store={store}>
          <NotifierRoot />
          <LoadingProvider>
            <AppContextProvider>
              <Navigation />
            </AppContextProvider>
          </LoadingProvider>
        </Provider>
      </MenuProvider>
    </GestureHandlerRootView>
  )
}

export default index


