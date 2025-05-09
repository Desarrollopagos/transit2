import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../../../../theme/appColors'
import styles from './styles'
import { Button, Input } from '../../../../../commonComponents'
import LoginViewProps from '../../types'
import { useNavigation } from '@react-navigation/native'
import { useValues } from '../../../../../utils/context'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../../api/store'
import Icons from '../../../../../utils/icons/icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/main/types'
import { AuthTitle } from '../../../login/component/authtitle'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function LoginView({
  gotoOTP,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  setDemouser,
}: LoginViewProps) {
  const [error, setError] = useState('')
  const { isDark } = useValues()
  const dispatch = useDispatch<AppDispatch>()
  const { navigate } = useNavigation<navigation>()
  const { loading } = useSelector(state => state.auth)
  const { translateData, settingData } = useSelector(state => state.setting)

  const handleGetOTP = () => {
    if (!email) {
      setError(translateData.enterYourPhone)
      return
    }
    gotoOTP()
    setError('')
  }

  const gotoDemo = () => {
    setEmail('driver@example.com')
    setDemouser(true)
  }

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: isDark ? appColors.darkThemeSub : appColors.white },
      ]}
    >
      <View style={styles.subView}>
        <AuthTitle
          title={translateData.authTitle}
          subTitle={translateData.subTitle}
        />
        <Input
          icon={<Icons.Mail />}
          placeholder={translateData.enterEmail}
          backgroundColor={appColors.graybackground}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Button
        onPress={handleGetOTP}
        title={translateData.login}
        backgroundColor={appColors.primary}
        color={appColors.white}
        loading={loading}
      />
      {/* <Image
        source={Images.or}
        style={{
          width: windowWidth(60),
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <View
        style={{
          flexDirection: viewRtlStyle,
          marginHorizontal: windowWidth(4),
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: viewRtlStyle,
            justifyContent: "center",
            alignItems: "center",
            width: "46%",
            backgroundColor: isDark?appColors.primaryFont:appColors.graybackground,
            borderRadius: windowHeight(0.5),
            height: windowHeight(6),
          }}
        >
          <Icons.Google />
          <Text
            style={{
              color: isDark?appColors.white:appColors.primaryFont,
              fontFamily: appFonts.regular,
              marginHorizontal: windowWidth(2),
            }}
          >
            Google
          </Text>
        </View>
        <View
          style={{
            flexDirection: viewRtlStyle,
            justifyContent: "center",
            alignItems: "center",
            width: "46%",
            backgroundColor: isDark?appColors.primaryFont:appColors.graybackground,
            borderRadius: windowHeight(0.5),
            height: windowHeight(6),
          }}
        >
          <Icons.Apple />
          <Text
            style={{
              color:isDark?appColors.white: appColors.primaryFont,
              fontFamily: appFonts.regular,
              marginHorizontal: windowWidth(2),
            }}
          >
            Apple
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: viewRtlStyle,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark?appColors.primaryFont:appColors.graybackground,
          borderRadius: windowHeight(0.5),
          height: windowHeight(6),
          marginHorizontal: windowWidth(4),
          marginTop: windowHeight(2),
        }}
      >
        <Icons.Facebook />
        <Text
          style={{
            color: isDark?appColors.white:appColors.primaryFont,
            fontFamily: appFonts.regular,
            marginHorizontal: windowWidth(2),
          }}
        >
          FaceBook
        </Text>
      </View> */}
      {settingData?.values?.activation?.demo_mode == 1 ? (
        <TouchableOpacity style={styles.demoBtn} onPress={gotoDemo} activeOpacity={0.7}>
          <Text style={styles.demoTitle}>{translateData.demoDriver}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
