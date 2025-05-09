import React, { useEffect } from 'react'
import { View, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useValues } from '../../utils/context'
import darkMapStyle from './darkMap'
import { useRoute } from '@react-navigation/native'
import appColors from '../../theme/appColors'
import { GOOGLE_MAPS_APIKEY } from '../../api/config'
import styles from './styles'
import { useSelector } from 'react-redux'

export function Map({ userLocation }) {
  const { isDark } = useValues()
  const route = useRoute()
  const { locationDetails } = route.params || {}
  const { translateData } = useSelector(state => state.setting)

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
      } catch (err) {}
    }

    requestLocationPermission()
  }, [])

  const mapCustomStyle = isDark ? darkMapStyle : ''

  const locationData = locationDetails || userLocation

  const parseCoordinate = coordinate => ({
    latitude: parseFloat(coordinate.lat),
    longitude: parseFloat(coordinate.lng),
  })

  const hasMarker1 =
    locationData &&
    locationData[0] &&
    locationData[0].lat &&
    locationData[0].lng
  const hasMarker2 =
    locationData &&
    locationData[1] &&
    locationData[1].lat &&
    locationData[1].lng

  const initialRegion = hasMarker1
    ? {
        ...parseCoordinate(locationData[0]),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={initialRegion}
        showsUserLocation={true}
        customMapStyle={mapCustomStyle}
      >
        {hasMarker1 && (
          <Marker
            coordinate={parseCoordinate(locationData[0])}
            title={translateData.markerOne}
            description={translateData.firstMarkerlocation}
          />
        )}

        {hasMarker2 && (
          <Marker
            coordinate={parseCoordinate(locationData[1])}
            title={translateData.markerTwo}
            description={translateData.secondMarkerlocation}
          />
        )}

        {hasMarker1 && hasMarker2 && (
          <MapViewDirections
            origin={parseCoordinate(locationData[0])}
            destination={parseCoordinate(locationData[1])}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor={appColors.primary}
          />
        )}
      </MapView>
    </View>
  )
}
