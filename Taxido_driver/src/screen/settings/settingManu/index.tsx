import { View, ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { General, RegistrationDetails, Profile, SettingHeader, AlertZone } from './component/'
import { useTheme } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import { planDataGet, rentalVehicleData, ticketDataGet, walletData } from '../../../api/store/action'
import { useDispatch, useSelector } from 'react-redux'

export function Settings() {

  const dispatch = useDispatch();
  const { translateData } = useSelector(state => state.setting)
  const { colors } = useTheme()
  const [versionCode, setVersionCode] = useState('')
  const [versionApp, setAppversion] = useState('')

  useEffect(() => {
    const fetchVersion = async () => {
      const version = await DeviceInfo.getVersion()
      const appVersion = await DeviceInfo.getBuildNumber()
      setAppversion(appVersion)
      setVersionCode(version)
    }
    dispatch(planDataGet())
    dispatch(walletData())
    dispatch(ticketDataGet())
    dispatch(rentalVehicleData())

    fetchVersion()
  }, [])

  return (
    <ScrollView
      style={[styles.main, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <SettingHeader />
      <View style={styles.container}>
        <Profile />
        <General />
        <RegistrationDetails />
        <AlertZone />
        <Text style={styles.version}>
          {translateData.settingTextVersion}: 0.{versionApp}
        </Text>
      </View>
    </ScrollView>
  )
}
