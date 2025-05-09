import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../../../../theme/appColors'
import styles from './styles'
import { useValues } from '../../../../../utils/context'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export function Selection({ onButtonPress }) {
  const [activeButton, setActiveButton] = useState(0)
  const { viewRtlStyle } = useValues()
  const { colors } = useTheme()
  const { translateData } = useSelector(state => state.setting)

  const handleButtonPress = buttonIndex => {
    setActiveButton(buttonIndex)
    if (onButtonPress) {
      onButtonPress(buttonIndex)
    }
  }

  return (
    <View
      style={[
        styles.selection,
        { flexDirection: viewRtlStyle, backgroundColor: colors.card },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.earningView,
          {
            backgroundColor:
              activeButton === 0 ? appColors.primary : 'transparent',
          },
        ]}
        onPress={() => handleButtonPress(0)}
      >
        <Text
          style={[
            styles.fonts,
            {
              color:
                activeButton === 0 ? appColors.white : appColors.secondaryFont,
            },
          ]}
        >
          {translateData.totalEarning}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.historyView,
          {
            backgroundColor:
              activeButton === 1 ? appColors.primary : 'transparent',
          },
        ]}
        onPress={() => handleButtonPress(1)}
      >
        <Text
          style={[
            styles.fonts,
            {
              color:
                activeButton === 1 ? appColors.white : appColors.secondaryFont,
            },
          ]}
        >
          {translateData.withdrawHistory}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
