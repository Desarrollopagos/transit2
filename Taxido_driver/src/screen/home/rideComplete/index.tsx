import { View, Image, Text, Platform, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation, useTheme, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { Marker, Polyline } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import { rideDataPut } from '../../../api/store/action'
import styles from './styles'
import commanStyles from '../../../style/commanStyles'
import { BackButton, Button } from '../../../commonComponents'
import appColors from '../../../theme/appColors'
import { DriverProfile } from '../../../commonComponents'
import { Map } from '../../mapView'
import Images from '../../../utils/images/images'
import { useValues } from '../../../utils/context'
import Geolocation from 'react-native-geolocation-service'

export function RideComplete() {
  const { viewRtlStyle } = useValues()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const route = useRoute()
  const dispatch = useDispatch()
  const { rideData } = route.params
  const [elapsedTime, setElapsedTime] = useState('00:00:00')
  const [location, setLocation] = useState(null)
  const [heading, setHeading] = useState(0)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [totalDistance, setTotalDistance] = useState(0)
  const markerRef = useRef(null)
  const intervalRef = useRef(null)
  const previousLocation = useRef(null)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [endTime, setEndTime] = useState<string | null>(null)
  const [locations, setLocations] = useState(null)
  const { translateData } = useSelector(state => state.setting)

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }
    return true
  }

  useEffect(() => {
    const startLocationTracking = async () => {
      const hasPermission = await requestLocationPermission()
      if (!hasPermission) {
        return
      }

      const watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords
          setLocations({ latitude, longitude })
        },
        error => { },
        {
          enableHighAccuracy: true,
          distanceFilter: 50,
          interval: 5000,
        },
      )

      return () => Geolocation.clearWatch(watchId)
    }

    startLocationTracking()

    return () => {
      Geolocation.stopObserving()
    }
      ;[]
  })

  const getCurrentTime = () => {
    const date = new Date()
    return date.toTimeString().slice(0, 8)
  }

  useEffect(() => {
    if (isRunning && rideData?.start_time) {
      const timerInterval = setInterval(() => {
        const now = new Date()
        const [hours, minutes, seconds] = rideData?.start_time
          .split(':')
          ?.map(Number)
        const startTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes,
          seconds,
        )

        if (!isNaN(startTime.getTime())) {
          const secondsGap = Math.floor(
            (now.getTime() - startTime.getTime()) / 1000,
          )
          setElapsedSeconds(secondsGap)

          const hrs = Math.floor(secondsGap / 3600)
            .toString()
            .padStart(2, '0')
          const mins = Math.floor((secondsGap % 3600) / 60)
            .toString()
            .padStart(2, '0')
          const secs = (secondsGap % 60).toString().padStart(2, '0')

          setElapsedTime(`${hrs}:${mins}:${secs}`)
        } else {
        }
      }, 1000)
      return () => clearInterval(timerInterval)
    }
  }, [isRunning, rideData?.start_time])

  useEffect(() => {
    const startLocationTracking = () => {
      intervalRef.current = setInterval(() => {
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
              const distance = calculateDistance(
                previousLocation.current.latitude,
                previousLocation.current.longitude,
                newLocation.latitude,
                newLocation.longitude,
              )
              setTotalDistance(prev => prev + distance)

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
            setRouteCoordinates(prev => [...prev, newLocation])
            previousLocation.current = newLocation
          })
          .catch(error => { })
      }, 1000)
    }
    startLocationTracking()
    return () => clearInterval(intervalRef.current)
  }, [])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

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
    return (toDegrees(Math.atan2(y, x)) + 360) % 360
  }

  const animateMarker = newLocation => {
    if (markerRef.current) {
      markerRef.current.animateMarkerToCoordinate(newLocation, 500)
    }
  }

  const gotoPickup = () => {
    setEndTime(getCurrentTime())
    if (endTime) {
      dispatch(
        rideDataPut({
          data: {
            status: 'completed',
            end_time: endTime,
            distance: totalDistance.toFixed(2),
            distance_unit: 'km',
          },
          ride_id: rideData?.id,
        }),
      )
        .then((res) => navigation.navigate('RideDetails'))

        .catch(err => console.error('Ride completion failed', err))
    }
  }

  return (
    <View style={commanStyles.main}>
      {rideData?.service_category?.service_category_type !== 'rental' ? (
        <View style={styles.mapSection}>
          <Map userLocation={rideData?.location_coordinates} />
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: rideData?.driver?.location[0]?.lat,
            longitude: rideData?.driver?.location[0]?.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={false}
        >
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="green"
            strokeWidth={5}
          />
          <Marker.Animated
            ref={markerRef}
            coordinate={{
              latitude: rideData?.driver?.location[0]?.lat,
              longitude: rideData?.driver?.location[0]?.lng,
            }}
            rotation={heading}
          >
            <Image source={Images.texiImage} style={styles.vehicle_map_icon} />
          </Marker.Animated>
        </MapView>
      )}

      <View style={styles.extraSection}></View>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      {rideData?.service_category?.service_category_type === 'rental' ? (
        <View
          style={[
            styles.rideDataMainView,
            {
              flexDirection: viewRtlStyle,
            },
          ]}
        >
          <View
            style={[
              styles.rideDataView,
              {
                backgroundColor:
                  elapsedTime > `${rideData?.hourly_package?.hour}:00:00`
                    ? appColors.alertRed
                    : appColors.primary,

                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <View style={styles.hourly_package_view}>
              <Text style={{ color: appColors.categoryTitle }}>
                {translateData.used}
              </Text>
              <Text style={{ color: appColors.white }}>{elapsedTime}</Text>
            </View>
            <View style={styles.totalView} />
            <View style={styles.hourly_package_view}>
              <Text style={{ color: appColors.categoryTitle }}>
                {translateData.total}
              </Text>
              <Text style={{ color: appColors.white }}>
                {rideData?.hourly_package?.hour}:00:00
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.usedTextView,
              {
                backgroundColor:
                  1 / 1000 > rideData?.hourly_package?.distance
                    ? appColors.alertRed
                    : appColors.primary,
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <View style={styles.hourly_package_view}>
              <Text style={{ color: appColors.categoryTitle }}>
                {translateData.used}
              </Text>
              <Text style={{ color: appColors.white }}>
                {totalDistance.toFixed(2)}KM
              </Text>
            </View>
            <View style={styles.hourly_package_main_view} />
            <View style={styles.hourly_package_view}>
              <Text style={{ color: appColors.categoryTitle }}>
                {translateData.total}
              </Text>
              <Text style={{ color: appColors.white }}>
                {rideData?.hourly_package?.distance}
                {rideData?.hourly_package?.distance_type}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.greenSection}>
        <View
          style={[
            styles.additionalSection,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <DriverProfile
            userDetails={rideData?.rider}
            borderRadius={25}
            showInfoIcon={true}
            iconColor={appColors.primary}
            backgroundColor={appColors.white}
          />
        </View>
        <Button
          onPress={gotoPickup}
          title={translateData.completeRides}
          backgroundColor={appColors.secondaryFont}
          color={appColors.white}
        />
      </View>
    </View>
  )
}
