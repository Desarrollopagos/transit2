import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import appColors from '../../../theme/appColors'
import { useNavigation, useTheme, useRoute } from '@react-navigation/native'
import styles from './styles'
import { BackButton, Button, DriverProfile } from '../../../commonComponents'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import { useValues } from '../../../utils/context'
import Icons from '../../../utils/icons/icons'
import images from '../../../utils/images/images'
import OTPTextView from 'react-native-otp-textinput'
import { useDispatch, useSelector } from 'react-redux'
import { rideStartData } from '../../../api/store/action/index'
import { RidePostInterface } from '../../../api/interface/rideInterface'
import GetLocation from 'react-native-get-location'
import MapView, { Marker, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '../../../api/config'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function OtpRide() {
  const navigation = useNavigation<navigation>()
  const { colors } = useTheme()
  const { viewRtlStyle, isDark } = useValues()
  const [modalVisible, setModalVisible] = useState(false)
  const route = useRoute()
  const { rideData, ride_Id } = route.params
  const [warning, setWarning] = useState('')
  const [enteredOtp, setEnteredOtp] = useState('')
  const dispatch = useDispatch()
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [otpHide, setOTPhide] = useState(false)
  const [location, setLocation] = useState(null)
  const [heading, setHeading] = useState(0)
  const markerRef = useRef(null)
  const previousLocation = useRef(null)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const updatedLocation = rideData.location_coordinates.map(coord => ({
    latitude: parseFloat(coord.lat),
    longitude: parseFloat(coord.lng),
  }))
  const [destination] = useState(updatedLocation[0])
  const { translateData } = useSelector(state => state.setting)
  const [verifyLoader, setVerifyLoader] = useState(false)

  const calculateBearing = (startLat, startLng, endLat, endLng) => {
    const toRadians = degree => degree * (Math.PI / 180)
    const toDegrees = radian => radian * (180 / Math.PI)

    const lat1 = toRadians(startLat)
    const lat2 = toRadians(endLat)
    const dLng = toRadians(endLng - startLng)

    const y = Math.sin(dLng) * Math.cos(lat2)
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng)

    const bearing = toDegrees(Math.atan2(y, x))
    return (bearing + 360) % 360
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startTrackingLocation()
        } else {
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      startTrackingLocation()
    }
  }

  const startTrackingLocation = () => {
    getCurrentLocation()
    const locationInterval = setInterval(() => {
      getCurrentLocation()
    }, 1000)
    return () => clearInterval(locationInterval)
  }

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(loc => {
        const newLocation = {
          latitude: loc.latitude,
          longitude: loc.longitude,
        }

        if (previousLocation.current) {
          const newHeading = calculateBearing(
            previousLocation.current.latitude,
            previousLocation.current.longitude,
            newLocation.latitude,
            newLocation.longitude,
          )
          setHeading(newHeading)
        }
        animateMarker(newLocation)
        setLocation(newLocation)
        previousLocation.current = newLocation
      })
      .catch(error => {
        const { code, message } = error
        console.warn(code, message)
      })
  }

  const animateMarker = newLocation => {
    if (markerRef.current) {
      markerRef.current.animateMarkerToCoordinate(newLocation, 500)
    }
  }

  const handleDirectionsReady = result => {
    const coords = result.coordinates
    setRouteCoordinates(coords)
  }

  useEffect(() => {
    requestLocationPermission()
    return () => clearInterval(startTrackingLocation)
  }, [])

  const openOtp = () => {
    setOTPhide(true)
  }

  const gotocomplete = () => {
    setModalVisible(false)
    navigation.navigate('RideComplete', { rideData })
  }

  const handleChange = (otp: string) => {
    setEnteredOtp(otp)
    if (otp.length == 5) {
      setWarning('')
    }
  }

  useEffect(() => {
    if (isRunning && startTime) {
      const timerInterval = setInterval(() => {
        const now = new Date()
        const secondsGap = Math.floor(
          (now.getTime() - startTime.getTime()) / 1000,
        )
        setElapsedSeconds(secondsGap)
      }, 1000)

      return () => clearInterval(timerInterval)
    }
  }, [isRunning, startTime])

  const formatTime = (date: Date) => {
    return date.toTimeString().slice(0, 8)
  }

  const startTimer = () => {
    const now = new Date()

    setStartTime(now)
    setElapsedSeconds(0)
    setIsRunning(true)
    return now
  }

  const verifyOTP = () => {
    setVerifyLoader(true)
    startTimer()
    const now = startTimer()
    if (startTime) {
      let payload: RidePostInterface = {
        ride_id: ride_Id,
        otp: enteredOtp,
        start_time: formatTime(now),
      }
      dispatch(rideStartData(payload))
        .unwrap()
        .then((res: any) => {

          if (res.success == false) {
            setVerifyLoader(false)
          } else {
            setVerifyLoader(false)
            setModalVisible(true)
          }
        })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapSection}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={false}
          >
            <Marker.Animated
              ref={markerRef}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              rotation={heading}
            >
              <Image
                source={{
                  uri: rideData?.vehicle_type?.vehicle_map_icon?.original_url,
                }}
                style={styles.vehicleMapImage}
              />
            </Marker.Animated>
            <Marker
              coordinate={destination}
              title={translateData.destination}
            />
            <MapViewDirections
              origin={location}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor={appColors.primary}
              onError={errorMessage => {
                console.warn('Error fetching directions:', errorMessage)
              }}
              onReady={handleDirectionsReady}
            />
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={5}
                strokeColor={appColors.primary}
              />
            )}
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            <Image
              source={{
                uri: 'https://cdn.dribbble.com/users/1768957/screenshots/3835265/comp_1.gif',
              }}
              style={styles.img}
            />
          </View>
        )}
      </View>
      <View style={styles.extraSection}></View>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.greenSection}>
        {otpHide && (
          <View
            style={[
              styles.additionalSection,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <DriverProfile
              iconColor={appColors.primary}
              backgroundColor={appColors.white}
              borderRadius={25}
              showInfoIcon={true}
              rideDetails={rideData?.driver}
              userDetails={rideData?.rider}
            />
            <View
              style={[
                styles.date,
                { backgroundColor: colors.card, flexDirection: viewRtlStyle },
              ]}
            >
              <Text style={[styles.timing, { color: colors.text }]}>
                {translateData.otpVerification}
              </Text>
            </View>
            <View style={[styles.address, { flexDirection: viewRtlStyle }]}>
              <OTPTextView
                containerStyle={[
                  styles.otpContainer,
                  { flexDirection: viewRtlStyle },
                ]}
                textInputStyle={[
                  styles.otpInputs,
                  {
                    backgroundColor: isDark
                      ? appColors.darkThemeSub
                      : appColors.graybackground,
                    color: colors.text,
                  },
                ]}
                handleTextChange={handleChange}
                inputCount={4}
                keyboardType="numeric"
                tintColor="transparent"
                offTintColor="transparent"
              />
            </View>
          </View>
        )}
        <View style={styles.buttonView}>
          <Button
            backgroundColor={appColors.primary}
            color={appColors.white}
            onPress={otpHide ? verifyOTP : openOtp}
            title={otpHide ? translateData.verifyOTP : translateData.startRide}
          />
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modelbackground}
            onPress={() => setModalVisible(false)}
          >
            <View style={[styles.model, { backgroundColor: colors.card }]}>
              <View style={styles.space}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.closeIcon]}
                  onPress={() => setModalVisible(false)}
                >
                  <Icons.Close />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={[styles.title, { color: colors.text }]}>
                  {translateData.otpSuccessfully}
                </Text>
              </View>
              <View style={styles.imageView}>
                <Image
                  source={images.otp}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
              <Button
                title={translateData.done}
                color={appColors.white}
                backgroundColor={appColors.primary}
                onPress={gotocomplete}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  )
}
