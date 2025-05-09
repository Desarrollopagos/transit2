import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import Icons from '../../../../../utils/icons/icons'
import appColors from '../../../../../theme/appColors'
import { ListItem } from '../'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/main/types'
import { useValues } from '../../../../../utils/context'
import { useSelector } from 'react-redux'

type Navigation = NativeStackNavigationProp<RootStackParamList>

export function General() {
  const navigation = useNavigation<Navigation>()
  const { colors } = useTheme()
  const { textRtlStyle, isDark } = useValues()
  const { translateData } = useSelector(state => state.setting)

  return (
    <View>
     
        <Text
          style={[
            styles.title,
            { color: colors.text, textAlign: textRtlStyle },
          ]}
        >
          {translateData.general}
        </Text>
   
      <View
        style={[
          styles.listView,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        
          <>
            <ListItem
              icon={<Icons.UserSetting color={colors.text} />}
              text={translateData.profileSettings}
              backgroundColor={
                isDark ? colors.background : appColors.graybackground
              }
              color={isDark ? appColors.white : appColors.primaryFont}
              onPress={() => navigation.navigate('ProfileSetting')}
              showNextIcon={true}
            />
            <View style={[styles.border, { borderColor: colors.border }]} />

            <ListItem
              icon={<Icons.WalletSetting color={colors.text} />}
              text={translateData.myWallet}
              backgroundColor={
                isDark ? colors.background : appColors.graybackground
              }
              color={isDark ? appColors.white : appColors.primaryFont}
              onPress={() => navigation.navigate('MyWallet')}
              showNextIcon
            />
            <View style={[styles.border, { borderColor: colors.border }]} />

            <ListItem
              icon={<Icons.Bank color={colors.text} />}
              text={translateData.appSetting}
              backgroundColor={
                isDark ? colors.background : appColors.graybackground
              }
              color={isDark ? appColors.white : appColors.primaryFont}
              onPress={() => navigation.navigate('AppSettings')}
              showNextIcon
            />
            <View style={[styles.border, { borderColor: colors.border }]} />

            <ListItem
              icon={<Icons.Subscription color={colors.text} />}
              text={translateData.subscriptionPlan}
              backgroundColor={
                isDark ? colors.background : appColors.graybackground
              }
              color={isDark ? appColors.white : appColors.primaryFont}
              onPress={() => navigation.navigate('Subscription')}
              showNextIcon
            />
            <View style={[styles.border, { borderColor: colors.border }]} />

            <ListItem
              icon={<Icons.VehicleList color={colors.text} />}
              text={translateData.rentalVehicle}
              backgroundColor={
                isDark ? colors.background : appColors.graybackground
              }
              color={isDark ? appColors.white : appColors.primaryFont}
              onPress={() => navigation.navigate('VehicleList')}
              showNextIcon
            />
            <View style={[styles.border, { borderColor: colors.border }]} />

            <ListItem
              icon={<Icons.MessageEmpty color={colors.text} />}
              text={translateData.supportTicket}
              backgroundColor={
                isDark ? colors.background : appColors.graybackground
              }
              color={isDark ? appColors.white : appColors.primaryFont}
              onPress={() => navigation.navigate('SupportTicket')}
              showNextIcon
            />
          </>
     
      </View>
    </View>
  )
}
