import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Switch } from '../'
import styles from '../darkTheme/styles'
import Icons from '../../../../../utils/icons/icons'
import { useTheme, useNavigation } from '@react-navigation/native'
import { useValues } from '../../../../../utils/context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/main/types'
import { useSelector } from 'react-redux'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function Notification() {
  const [isNotificationOn, setIsNotificationOn] = useState(false)
  const { colors } = useTheme()
  const { viewRtlStyle } = useValues()
  const { translateData } = useSelector(state => state.setting)

  const onNotification = () => {
    setIsNotificationOn(prevState => !prevState)
  }
  const { navigate } = useNavigation<navigation>()

  return (
    <View>
      <View style={[styles.main, { flexDirection: viewRtlStyle }]}>
        <View style={[styles.container, { flexDirection: viewRtlStyle }]}>
          <TouchableOpacity
            style={[styles.iconView, { backgroundColor: colors.background }]}
            activeOpacity={0.7}
            onPress={() => navigate('Notification')}
          >
            <Icons.Notification color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            {translateData.notification}
          </Text>
        </View>
        <Switch
          switchOn={isNotificationOn}
          onPress={onNotification}
          background={colors.background}
        />
      </View>
      <View style={[styles.border, { borderColor: colors.border }]} />
    </View>
  )
}
