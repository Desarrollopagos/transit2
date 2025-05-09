import { View, Image, Text } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../../theme/appColors'
import { useNavigation, useTheme, useRoute } from '@react-navigation/native'
import styles from './styles'
import commanStyle from '../../../style/commanStyles'
import { Button, Header, AddressData, DriverProfile } from '../../../commonComponents'
import { Time } from './component'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import Images from '../../../utils/images/images'
import { useValues } from '../../../utils/context'
import { useSelector } from 'react-redux'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function ActiveRide() {
  const navigation = useNavigation<navigation>()
  const { colors, dark } = useTheme()
  const route = useRoute()
  const { isDark } = useValues()
  const { rideData, ride_Id } = route.params || {}
  const { translateData } = useSelector(state => state.setting)
  const [loading, setLoading] = useState(false)

  const gotoOtp = () => {
    navigation.navigate('OtpRide', { rideData, ride_Id })
  }

  const handleRefresh = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }

  return (
    <View style={commanStyle.main}>
      <Header title={translateData.activeRide} />
      {rideData ? (
        <View style={[styles.contain, { backgroundColor: colors.background }]}>
          <View
            style={[
              styles.box,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <DriverProfile
              iconColor={appColors.primary}
              borderRadius={10}
              showInfoIcon={false}
              userDetails={rideData?.driver}
            />
            <Time
              totalAmount={rideData?.ride_fare}
              rideTime={rideData?.created_at}
            />
            <AddressData locationDetails={rideData?.locations} />
            <View style={styles.button}>
              <Button
                onPress={gotoOtp}
                title={translateData.pickupCustomer}
                backgroundColor={appColors.primary}
                color={appColors.white}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Image
            source={isDark ? Images.noRidesDark : Images.noRides}
            style={styles.noDataImg}
          />
          <View style={styles.walletContainer}>
            <Text
              style={[
                styles.msg,
                { color: dark ? colors.text : appColors.primaryFont },
              ]}
            >
              {translateData.noActiveRidesAvailable}
            </Text>
          </View>
          <Text style={styles.detail}>{translateData.rideRefresh}</Text>
          <View style={{ width: '110%' }}>
            <Button
              title={translateData.refresh}
              backgroundColor={appColors.primary}
              color={appColors.white}
              loading={loading}
              onPress={handleRefresh}
            />
          </View>
        </View>
      )}
    </View>
  )
}
