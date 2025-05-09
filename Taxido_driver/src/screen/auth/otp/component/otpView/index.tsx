import { View, Text, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Button, notificationHelper } from '../../../../../commonComponents'
import appColors from '../../../../../theme/appColors'
import OTPTextView from 'react-native-otp-textinput'
import { LineAnimation } from '../../../login/component'
import { useNavigation, useTheme, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/main/types'
import { useValues } from '../../../../../utils/context'
import { VerifyOtpInterface } from '../../../../../api/interface/authInterface'
import {
  settingDataGet,
  userVerifyOtp,
} from '../../../../../api/store/action/index'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../../api/store/index'
import { setValue } from '../../../../../utils/localstorage/index'
import { UserLoginInterface } from '../../../../../api/interface/authInterface'
import { userLogin, selfData } from '../../../../../api/store/action/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

type navigation = NativeStackNavigationProp<RootStackParamList>

const OtpView: React.FC = () => {
  const route = useRoute()
  const demouser = route.params || {}
  const [warning, setWarning] = useState('')
  const [enteredOtp, setEnteredOtp] = useState(
    demouser?.demouser ? '123456' : '',
  )
  const { colors } = useTheme()
  const { viewRtlStyle } = useValues()
  const { textRtlStyle, isDark, setToken, token } = useValues()
  const countryCode = route.params?.countryCode ?? '91'
  const phoneNumber = route.params?.phoneNumber ?? '1234567890'
  const [message, setMessage] = useState<string>('')
  const [fcmToken, setFcmToken] = useState('')
  const [success, setSuccess] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const { navigate } = useNavigation<navigation>()
  const { loading } = useSelector(state => state.auth)
  const { translateData } = useSelector(state => state.setting)
  const emailOrPhone = demouser?.email_or_phone ?? phoneNumber;
  const isEmail = emailOrPhone.includes("@");


  const handleChange = (otp: string) => {
    setEnteredOtp(otp)
    if (otp.length === 6) {
      Keyboard.dismiss()
      setWarning('')
    }
  }

  useEffect(() => {
    if (enteredOtp.length === 6) {
      Keyboard.dismiss()
      setWarning('')
      handleVerify(enteredOtp)
    }
  }, [enteredOtp])

  useEffect(() => {
    const fetchToken = async () => {
      let fcmToken = await AsyncStorage.getItem('fcmToken')
      if (fcmToken) {
        setFcmToken(fcmToken)
      }
    }
    fetchToken()
  }, [])

  const handleVerify = () => {
    const formatCountryCode = (code: string): string => {
      if (code.startsWith('+')) {
        return code.substring(1)
      }
      return code
    }
    let payload: VerifyOtpInterface = {
      email_or_phone: phoneNumber,
      country_code: formatCountryCode(countryCode),
      token: enteredOtp,
      email: null,
      fcm_token: fcmToken,
    }

    dispatch(userVerifyOtp(payload))
      .unwrap()
      .then((res: any) => {
        if (res.success && res.is_registered) {
          setValue('token', res.access_token)
          setToken(res.access_token)
          navigate('TabNav')
          dispatch(selfData())
        } else if (res.success && !res.is_registered) {
          navigate('CreateAccount', { countryCode, phoneNumber })
          dispatch(settingDataGet())
          setSuccess(false)
          setMessage('No account linked to the given number. Please sign up.')
        } else if (!res.success) {
          notificationHelper('OTP Verify', res.message, 'error')
          setSuccess(false)
          setMessage(res.message)
        }
      })
      .catch((error: any) => {
        setSuccess(false)
        setMessage('An error occurred during verification. Please try again.')
      })
  }

  const ResendOtp = () => {
    let payload: UserLoginInterface = {
      phone: phoneNumber,
      country_code: countryCode,
    }
    dispatch(userLogin(payload))
      .unwrap()
      .then((res: any) => {
        if (res?.success) {
          navigate('Otp', { countryCode, phoneNumber })
          notificationHelper('OTP Send', translateData.otpSend, 'success')
        } else {
          setSuccess(false)
          setMessage(res.message)
        }
      })
  }

  return (
    <View
      style={[
        styles.otpView,
        { backgroundColor: isDark ? appColors.darkThemeSub : appColors.white },
      ]}
    >
      <View style={styles.subView}>
        <View style={styles.space} />
        <LineAnimation />
        <Text
          style={[
            styles.otpVef,
            { color: colors.text, textAlign: textRtlStyle },
          ]}
        >
          {translateData.otpVerification}
        </Text>
        <Text style={[styles.subtitle, { textAlign: textRtlStyle }]}>
          {isEmail
            ? `${translateData.enterOtp} ${emailOrPhone}`
            : `${translateData.enterOtp} ${countryCode} ${emailOrPhone}`}
        </Text>


        <Text
          style={[
            styles.title,
            { color: colors.text, textAlign: textRtlStyle },
          ]}
        >
          {translateData.otp}
        </Text>
        <View style={[styles.inputContainer, { flexDirection: viewRtlStyle }]}>
          <OTPTextView
            containerStyle={[
              styles.otpContainer,
              { flexDirection: viewRtlStyle },
            ]}
            textInputStyle={[
              styles.otpInput,
              {
                backgroundColor: isDark
                  ? appColors.primaryFont
                  : appColors.graybackground,
                color: colors.text,
              },
            ]}
            handleTextChange={handleChange}
            inputCount={6}
            keyboardType="numeric"
            tintColor="transparent"
            offTintColor="transparent"
            defaultValue={enteredOtp}
          />
        </View>
        {warning !== '' && <Text style={styles.warningText}>{warning}</Text>}
      </View>

      <View style={styles.buttonView}>
        <Button
          onPress={handleVerify}
          title={translateData.verify}
          backgroundColor={appColors.primary}
          color={appColors.white}
          loading={loading}
        />
      </View>
      <View style={styles.subView}>
        <View style={[styles.retry, { flexDirection: viewRtlStyle }]}>
          <Text style={styles.notReceive}>{translateData.notReceived}</Text>
          <TouchableOpacity onPress={ResendOtp} activeOpacity={0.7}>
            <Text style={[styles.resend, { color: colors.text }]}>
              {translateData.resendIt}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default OtpView
