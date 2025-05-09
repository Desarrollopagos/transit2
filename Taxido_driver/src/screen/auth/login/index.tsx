import React, { useState, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styles from './styles'
import { RootStackParamList } from '../../../navigation/main/types'
import appColors from '../../../theme/appColors'
import { Background, Header } from '../component'
import { LoginView } from './component/'
import { useValues } from '../../../utils/context/index'
import { AppDispatch } from '../../../api/store/index'
import { userLogin } from '../../../api/store/action/index'
import { notificationHelper } from '../../../commonComponents'
import { DriverLoginInterface } from '../../../api/interface/authInterface'

type NavigationType = NativeStackNavigationProp<RootStackParamList>

export function Login() {
  const { isDark, setToken } = useValues()
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<NavigationType>()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [demouser, setDemouser] = useState(false)
  const { translateData } = useSelector(state => state.setting)

  const formattedCountryCode = useMemo(() => {
    return countryCode.startsWith('+') ? countryCode.substring(1) : countryCode
  }, [countryCode])

  const gotoOTP = useCallback(() => {
    const payload: DriverLoginInterface = {
      email_or_phone: phoneNumber,
      country_code: formattedCountryCode,
    }
    dispatch(userLogin(payload))
      .unwrap()
      .then(res => {
        if (res?.success) {
          navigation.navigate('Otp', { countryCode, phoneNumber, demouser })
          notificationHelper(
            'OTP sent',
            translateData?.otpSend || 'OTP has been sent.',
            'success',
          )
        } else {
          notificationHelper('Error', res.message, 'error')
        }
      })
  }, [
    dispatch,
    phoneNumber,
    formattedCountryCode,
    navigation,
    demouser,
    translateData,
  ])

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: isDark
            ? appColors.darkThemeSub
            : appColors.graybackground,
        },
      ]}
    >
      <Header
        showBackButton={false}
        backgroundColor={isDark ? appColors.bgDark : appColors.graybackground}
      />
      <Background />

      <View style={styles.loginView}>
        <LoginView
          gotoOTP={gotoOTP}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          borderColor={
            isDark ? appColors.primaryFont : appColors.graybackground
          }
          demouser={demouser}
          setDemouser={setDemouser}
        />
      </View>
    </View>
  )
}
