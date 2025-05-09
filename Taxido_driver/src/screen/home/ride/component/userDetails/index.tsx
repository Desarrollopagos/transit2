import { View, Text, Image } from 'react-native'
import React from 'react'
import Icons from '../../../../../utils/icons/icons'
import appColors from '../../../../../theme/appColors'
import commanStyles from '../../../../../style/commanStyles'
import images from '../../../../../utils/images/images'
import styles from './styles'
import { AddressData } from '../../../../../commonComponents'
import { useValues } from '../../../../../utils/context'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

interface UserDetailsProps {
  RideData: any
}

export function UserDetails({ RideData }: UserDetailsProps) {
  const { zoneValue } = useSelector((state) => state.zoneUpdate)
  const { viewRtlStyle, isDark } = useValues()
  const { colors } = useTheme()
  const rideDate = new Date(RideData?.created_at)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const formattedDate = `${rideDate.getDate()} ${months[rideDate.getMonth()]
    }’${rideDate.getFullYear()}`

  const hours = rideDate.getHours()
  const minutes = rideDate.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`

  return (
    <View
      style={[
        styles.additionalSection,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={[styles.profile, { flexDirection: viewRtlStyle }]}>
        <View style={[styles.subProfile, { flexDirection: viewRtlStyle }]}>
          <Image
            source={
              RideData?.rider?.profile_image
                ? { uri: RideData?.rider?.profile_image.original_url }
                : images.ProfileDefault
            }
            style={styles.userImage}
          />

          <View style={styles.riderDataView}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {RideData.rider.name}
            </Text>
            <View style={{ flexDirection: viewRtlStyle }}>
              {Array.from({ length: 5 }).map((_, index) => {
                const fullStarThreshold = index + 1
                const halfStarThreshold = index + 0.5
                if (RideData?.rider?.rating_count >= fullStarThreshold) {
                  return <Icons.RatingStar key={index} />
                } else if (RideData?.rider?.rating_count >= halfStarThreshold) {
                  return <Icons.RatingHalfStar key={index} />
                } else {
                  return <Icons.RatingEmptyStar key={index} />
                }
              })}
              <Text
                style={[
                  styles.rating_count,
                  {
                    color: isDark ? appColors.white : appColors.primaryFont,
                  },
                ]}
              >
                {RideData?.rider?.rating_count}
              </Text>
              <Text style={styles.reviews_count}>
                ({RideData?.rider?.reviews_count})
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.price}>
          {zoneValue.currency_symbol}
          {RideData.ride_fare}
        </Text>
      </View>

      <View
        style={[
          styles.date,
          { backgroundColor: colors.background, flexDirection: viewRtlStyle },
        ]}
      >
        <View style={[styles.iconView, { flexDirection: viewRtlStyle }]}>
          <View style={[styles.iconView, { flexDirection: viewRtlStyle }]}>
            <Icons.CalanderSmall />
            <Text style={styles.formattedDate}>{formattedDate}</Text>
          </View>
          <View
            style={[
              styles.clockBorder,
              {
                borderColor: colors.border,
              },
            ]}
          />
          <View style={[styles.iconView, { flexDirection: viewRtlStyle }]}>
            <Icons.Clock />
            <Text style={styles.formattedTime}>{formattedTime}</Text>
          </View>
        </View>
        <View
          style={[commanStyles.directionRow, { flexDirection: viewRtlStyle }]}
        >
          <View style={styles.spaceTop}>
            <Icons.location color={appColors.primary} />
          </View>
          <Text style={styles.distance}>
            {' '}
            {parseFloat(RideData.distance).toFixed(1)}
          </Text>
          <Text style={styles.distance}> {RideData.distance_unit}</Text>
        </View>
      </View>

      <View style={[styles.address, { flexDirection: viewRtlStyle }]}>
        <AddressData locationDetails={RideData.locations} />
      </View>
    </View>
  )
}
