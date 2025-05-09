import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Icons from '../../utils/icons/icons'
import commanStyle from '../../style/commanStyles'
import styles from './styles'
import images from '../../utils/images/images'
import { useTheme } from '@react-navigation/native'
import { useValues } from '../../utils/context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/main/types'
import { windowWidth } from '../../theme/appConstant'
import appColors from '../../theme/appColors'

type navigation = NativeStackNavigationProp<RootStackParamList>

interface DriverProfileProps {
  borderRadius: number
  backgroundColor: string
  iconColor: string
  showCarTitle?: boolean
  userDetails?: string
  rideDetails?: any
}
export function DriverProfile({
  borderRadius,
  iconColor,
  userDetails,
  rideDetails,
}: DriverProfileProps) {
  const navigation = useNavigation<navigation>()
  const { colors } = useTheme()
  const { viewRtlStyle, isDark, rtl } = useValues()

  const gotoChat = () => {
    navigation.navigate('Chat', {
      driverId: rideDetails?.driver?.id,
      riderId: rideDetails?.rider?.id,
      rideId: rideDetails?.id,
      riderName: rideDetails?.rider?.name,
      riderImage: rideDetails?.rider?.profile_image?.original_url,
    })
  }
  const gotoCall = () => {
    const phoneNumber = rideDetails?.rider.phone
    Linking.openURL(`tel:${phoneNumber}`)
  }


  return (
    <View
      style={[
        styles.profile,
        {
          backgroundColor: colors.card,
          flexDirection: viewRtlStyle,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={[styles.subProfile, { flexDirection: viewRtlStyle }]}>
        <Image
          source={
            userDetails?.profile_image?.original_url
              ? { uri: userDetails?.profile_image?.original_url }
              : images.ProfileDefault
          }
          style={[styles.userImage, { borderRadius: borderRadius }]}
        />

        <View>
          <View
            style={[
              commanStyle.directionRow,
              { flexDirection: viewRtlStyle, marginHorizontal: windowWidth(2) },
            ]}
          >
            <Text
              style={[
                styles.userName,
                { color: colors.text },
                { left: rtl ? windowWidth(1.6) : windowWidth(2) },
              ]}
            >
              {userDetails?.name || rideDetails?.driver?.name}
            </Text>
          </View>
          <View style={{ flexDirection: viewRtlStyle }}>
            <View
              style={[styles.starContainer, { flexDirection: viewRtlStyle }]}
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const fullStarThreshold = index + 1
                const halfStarThreshold = index + 0.5
                if (rideDetails?.driver?.rating_count >= fullStarThreshold) {
                  return <Icons.RatingStar key={index} />
                } else if (
                  rideDetails?.driver?.rating_count >= halfStarThreshold
                ) {
                  return <Icons.RatingHalfStar key={index} />
                } else {
                  return <Icons.RatingEmptyStar key={index} />
                }
              })}
              <Text
                style={[
                  commanStyle.totalReview,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {rideDetails?.driver?.rating_count}

              </Text>
              <Text style={{ color: appColors.secondaryFont,right:windowWidth(0.5) }}>
                ({rideDetails?.driver?.review_count})
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[commanStyle.containerBtn, { flexDirection: viewRtlStyle }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[commanStyle.iconButton, { borderColor: colors.border }]}
          onPress={gotoChat}
        >
          <Icons.Message color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[commanStyle.iconButton, { borderColor: colors.border }]}
          activeOpacity={0.7}
          onPress={gotoCall}
        >
          <Icons.Call color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
