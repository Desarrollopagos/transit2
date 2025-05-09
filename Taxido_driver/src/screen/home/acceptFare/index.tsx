import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation, useTheme, useRoute } from '@react-navigation/native'
import styles from './styles'
import { Map } from '../../mapView'
import { BackButton } from '../../../commonComponents'
import { TotalFair } from './component'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import appColors from '../../../theme/appColors'
import { DriverProfile } from '../../../commonComponents'
import { Button } from '../../../commonComponents'
import { useSelector } from 'react-redux'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function AcceptFare() {
  const navigation = useNavigation<navigation>()
  const { colors } = useTheme()
  const { rideGet } = useSelector(state => state.ride)
  const route = useRoute()
  const { ride_Id } = route.params
  const { translateData } = useSelector(state => state.setting)


  if (!rideGet) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color={appColors.primary} />
      </View>
    )
  }

  const gotoPickup = () => {
    navigation.navigate('ActiveRide', { rideData: rideGet, ride_Id: ride_Id })
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapSection}>
        <Map />
      </View>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.greenSection}>
        <View
          style={[
            styles.additionalSection,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <DriverProfile
            iconColor={appColors.primary}
            backgroundColor={appColors.graybackground}
            borderRadius={25}
            showInfoIcon={true}
            userDetails={rideGet.rider}
          />
        </View>
        <TotalFair
          onPress={gotoPickup}
          totalAmount={rideGet.ride_fare}
          paymentMethod={rideGet.payment_method}
        />
        <Button
          title={translateData.confirm}
          backgroundColor={appColors.primary}
          color={appColors.white}
          onPress={gotoPickup}
        />
      </View>
    </View>
  )
}
