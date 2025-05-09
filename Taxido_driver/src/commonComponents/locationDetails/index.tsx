import { Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { useValues } from '../../utils/context'
import Icons from '../../utils/icons/icons'
import appColors from '../../theme/appColors'
import { useTheme } from '@react-navigation/native'

export function LocationDetails({ locationDetails }) {
  const { viewRtlStyle, textRtlStyle, isDark } = useValues()
  const { colors } = useTheme()

  return (
    <View
      style={[
        styles.addressContainer,
        { flexDirection: viewRtlStyle },
        { backgroundColor: isDark ? colors.card : appColors.white },
      ]}
    >
      <View style={styles.locationContainer}>
        <Icons.location
          color={isDark ? appColors.white : appColors.primaryFont}
        />
        <View style={styles.icon} />
        <Icons.gps color={isDark ? appColors.white : appColors.primaryFont} />
      </View>
      <View style={styles.locationText}>
        <Text
          style={[
            styles.itemStyle,
            { textAlign: textRtlStyle },
            { color: isDark ? appColors.white : appColors.primaryFont },
          ]}
        >
          {locationDetails[0]}
        </Text>
        <View
          style={[
            styles.dashedLine,
            {
              borderColor: colors.border,
            },
          ]}
        />
        <Text
          style={
            ([styles.pickUpLocationStyles],
            { color: isDark ? appColors.white : appColors.primaryFont })
          }
        >
          {locationDetails[1]}
        </Text>
      </View>
    </View>
  )
}
