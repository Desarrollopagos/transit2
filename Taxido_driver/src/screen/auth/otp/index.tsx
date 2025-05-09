import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { Background, Header } from '../component'
import OtpView from './component/otpView'
import appColors from '../../../theme/appColors'
import { useValues } from '../../../utils/context'

export function Otp() {
  const { isDark } = useValues()
  return (
    <View style={styles.main}>
      <View
        style={[
          styles.background,
          {
            backgroundColor: isDark
              ? appColors.bgDark
              : appColors.graybackground,
          },
        ]}
      >
        <Header
          showBackButton={false}
          backgroundColor={isDark ? appColors.bgDark : appColors.graybackground}
        />
      </View>
      <Background />
      <OtpView />
    </View>
  )
}
