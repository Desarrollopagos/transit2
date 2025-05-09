import React from 'react'
import { View } from 'react-native'
import { Header } from '../component'
import styles from './styles'
import { RideStatus } from '../rideStatus'
import appColors from '../../../theme/appColors'

export function MyRide() {
  return (
    <View style={styles.main}>
      <Header />
      <View>
        <View
          style={{
            backgroundColor: appColors.graybackground,
          }}
        >
          <RideStatus />
        </View>
      </View>
    </View>
  )
}

export default MyRide
