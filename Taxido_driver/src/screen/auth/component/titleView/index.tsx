import React from 'react'
import { View, Text } from 'react-native'
import { useValues } from '../../../../utils/context'
import styles from './styles'
import appColors from '../../../../theme/appColors'

interface TitleViewProps {
  title: string
  subTitle: string
}

export function TitleView({ title, subTitle }: TitleViewProps) {
  const { textRtlStyle, isDark } = useValues()
  return (
    <View>
      <Text
        style={[
          styles.main,
          {
            color: isDark ? appColors.white : appColors.subFont,
            textAlign: textRtlStyle,
          },
        ]}
      >
        {title}
      </Text>
      <Text style={[styles.sub, { textAlign: textRtlStyle }]}>{subTitle}</Text>
    </View>
  )
}
