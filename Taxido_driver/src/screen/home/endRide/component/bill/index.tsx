import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { useTheme } from '@react-navigation/native'
import appColors from '../../../../../theme/appColors'
import appFonts from '../../../../../theme/appFonts'
import { useSelector } from 'react-redux'

export function Bill() {
  const { colors } = useTheme()
  const { translateData } = useSelector(state => state.setting)

  return (
    <View
      style={[
        styles.billbox,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.completedPaymentView}>
        <Text style={styles.completedPayment}>
          {translateData.paymentPending}
        </Text>
        <TouchableOpacity style={styles.refreshView} activeOpacity={0.7}>
          <Text
            style={{ color: appColors.white, fontFamily: appFonts.regular }}
          >
            {translateData.refresh}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
