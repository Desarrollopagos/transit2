import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import appColors from '../../../theme/appColors'
import { useNavigation, useTheme, useRoute, useFocusEffect } from '@react-navigation/native'
import styles from './styles'
import { Map } from '../../mapView'
import commanStyles from '../../../style/commanStyles'
import { Button, BackButton, notificationHelper } from '../../../commonComponents'
import { UserDetails } from './component/userDetails'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import { useValues } from '../../../utils/context'
import { DriverRideRequest } from '../../../api/interface/rideRequestInterface'
import { bidDataPost, bidDataGet, rideDataGet } from '../../../api/store/action/index'
import { useDispatch, useSelector } from 'react-redux'
import { resetBidGet } from '../../../api/store/reducers/bidReducer'
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function Ride() {
  const navigation = useNavigation<navigation>()
  const { textRtlStyle, viewRtlStyle, isDark } = useValues()
  const { colors } = useTheme()
  const [bidId, setBidID] = useState<number | null>(null)
  const route = useRoute()
  const { ride } = route.params
  const [value, setValue] = useState(ride.ride_fare)
  const dispatch = useDispatch()
  const { bidGet } = useSelector(state => state.bid)
  const { translateData } = useSelector(state => state.setting)
  const { zoneValue } = useSelector((state) => state.zoneUpdate)


  const gotoAcceptFare = async () => {
    let payload: DriverRideRequest = {
      amount: value,
      ride_request_id: ride.id,
      currency_code: "INR",
    }

    dispatch(bidDataPost(payload))
      .unwrap()
      .then((res: any) => {
        setBidID(res.id)
      })
  }

  useFocusEffect(
    useCallback(() => {
      let intervalId: NodeJS.Timeout | undefined

      if (bidId) {
        intervalId = setInterval(() => {
          dispatch(bidDataGet(bidId))
        }, 5000)
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId)
        }
      }
    }, [bidId, dispatch]),
  )

  useEffect(() => {
    if (bidGet) {
      if (
        bidGet.status === 'accepted' &&
        ride?.service_category?.slug != 'schedule'
      ) {
        const rideID = bidGet.ride_id
        navigation.navigate('AcceptFare', { ride_Id: rideID })
        dispatch(rideDataGet(rideID))
        dispatch(resetBidGet())

      } else if (bidGet.status === 'rejected') {
        navigation.goBack()
        dispatch(resetBidGet())
        notificationHelper('Bid', 'Bid Rejected', 'error')

      } else if (
        ride?.service_category?.slug == 'schedule' &&
        bidGet.status === 'accepted'
      ) {
        navigation.goBack()
        dispatch(resetBidGet())
        notificationHelper('Ride Status', 'Ride Scheduled', 'success')
      }
    }
  }, [bidGet, navigation])

  useEffect(() => {
    if (ride) {
    }
  })

  const handleIncrement = () => {
    setValue(value + 10)
  }

  const handleDecrement = () => {
    if (value > ride.ride_fare) {
      setValue(value - 10)
    }
  }

  const buttonColor =
    value >= ride.ride_fare ? appColors.primary : appColors.disabled

  return (
    <View style={commanStyles.main}>
      <View style={styles.mapSection}>
        <Map />
      </View>
      <View style={styles.extraSection}></View>
      <View style={[styles.backButton]}>
        <BackButton />
      </View>
      <View style={styles.greenSection}>
        <UserDetails RideData={ride} />
        <View style={[styles.bottomView, { backgroundColor: colors.card }]}>
          <Text
            style={[
              styles.text,
              { color: colors.text, textAlign: textRtlStyle },
            ]}
          >
            {translateData.offerYourFare}
          </Text>
          <View
            style={[
              styles.boxContainer,
              {
                backgroundColor: colors.background,
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleDecrement}
              style={[
                styles.boxLeft,
                {
                  backgroundColor:
                    value <= ride.ride_fare ? colors.card : colors.card,
                },
              ]}
              disabled={value <= ride.ride_fare}
            >
              <Text
                style={[
                  styles.value,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                -10
              </Text>
            </TouchableOpacity>

            <View style={{ width: windowWidth(20), top: windowHeight(0.4) }}>
              <TextInput backgroundColor={colors.background} borderColor={colors.background} value={String(value)} keyboardType="numeric" onChangeText={(text) => {
                const num = parseFloat(text);
                if (!isNaN(num)) {
                  setValue(num);
                } else {
                  setValue(0);
                }
              }}
                style={{ textAlign: 'center', fontFamily: appFonts.medium, fontSize: fontSizes.FONT5 }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleIncrement}
              style={[styles.boxRight, { backgroundColor: colors.card }]}
            >
              <Text
                style={[
                  styles.value,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                +10
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <Button
              onPress={gotoAcceptFare}
              title={`${translateData.acceptFareon} ${zoneValue.currency_symbol}${value}`}
              backgroundColor={buttonColor}
              color={appColors.white}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
