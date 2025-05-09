import { View } from 'react-native'
import React, { useEffect } from 'react'
import {
  CurrencyModal,
  LanguageModal,
  Notification,
  DarkTheme,
  Rtl,
} from './component/'
import styles from './styles'
import { Header } from '../../../commonComponents'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { languageDataGet, currencyDataGet } from '../../../api/store/action'

export function AppSettings() {
  const { colors } = useTheme()
  const { translateData } = useSelector(state => state.setting)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(languageDataGet())
    dispatch(currencyDataGet())
  }, [])

  return (
    <View style={[styles.main, { backgroundColor: colors.background }]}>
      <Header title={translateData.appSetting} />
      <View style={styles.container}>
        <View
          style={[
            styles.listContainer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
            <>
              <DarkTheme />
              <Notification />
              <Rtl />
              {/* <CurrencyModal /> */}
              <LanguageModal />
            </>
        </View>
      </View>
    </View>
  )
}
