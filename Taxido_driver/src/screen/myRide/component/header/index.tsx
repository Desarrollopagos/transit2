import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from '../../../../utils/icons/icons'
import styles from './styles'
import { useTheme, useNavigation } from '@react-navigation/native'
import { useValues } from '../../../../utils/context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../navigation/main/types'
import { useSelector } from 'react-redux'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function Header() {
  const { colors } = useTheme()
  const { viewRtlStyle } = useValues()
  const navigation = useNavigation<navigation>()
  const { translateData } = useSelector(state => state.setting)

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: colors.card, flexDirection: viewRtlStyle },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.backButton, { borderColor: colors.border }]}
        onPress={() => navigation.goBack()}
      >
        <Icons.Back color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>
        {translateData.titleMyRide}
      </Text>
      <View style={{ flexDirection: viewRtlStyle }}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Chat')}
                    style={[styles.messageIcon, { borderColor: colors.border }]}
                    activeOpacity={0.5}>
                    <Icons.MessageEmpty color={colors.text} />
                </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.callIcon, { borderColor: colors.border }]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Notification')}
        >
          <Icons.Notification color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
