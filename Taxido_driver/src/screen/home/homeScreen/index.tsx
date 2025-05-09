import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, Text, ScrollView, FlatList, BackHandler, TouchableOpacity, Image, Platform, PermissionsAndroid, Alert } from 'react-native'
import styles from './styles'
import { Header, UpcomingRide, RenderRideItem } from '../component'
import { useNavigation, useTheme, useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import { useValues } from '../../../utils/context'
import appColors from '../../../theme/appColors'
import { currentZone, driverZone, rideDataGets, selfDriverData, vehicleData } from '../../../api/store/action/index'
import { useDispatch, useSelector } from 'react-redux'
import { ZoneUpdatePayload } from '../../../api/interface/zoneInterface'
import { acceptRequestValue, rideRequestDataGet } from '../../../api/store/action/rideRequestAction'
import { setValue } from '../../../utils/localstorage/index'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import BackgroundService from 'react-native-background-actions'
import Images from '../../../utils/images/images'
import Icons from '../../../utils/icons/icons'
import { Menu, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu'
import commonStyles from '../../../style/commanStyles'
import { useFocusEffect } from '@react-navigation/native'
import SwipeButton from '../../../commonComponents/sliderButton'
import Geolocation from '@react-native-community/geolocation';
import { CommonModal } from '../../../commonComponents/commonModal'
import useStoredLocation from '../../../commonComponents/helper/useStoredLocation'

type navigation = NativeStackNavigationProp<RootStackParamList>;

export function Home() {
  const navigation = useNavigation<navigation>();
  const [isOn, setIsOn] = useState(false);
  const { colors } = useTheme();
  const { textRtlStyle, setToken, viewRtlStyle, isDark } = useValues();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const { navigate } = useNavigation<navigation>();
  const dispatch = useDispatch();
  const { rideRequestdata, statusCode } = useSelector((state) => state.rideRequest);
  const [watchId, setWatchId] = useState(null);
  const [offlineLat, setOfflineLat] = useState();
  const [offlineLng, setOfflineLng] = useState();
  const { selfDriver } = useSelector((state: any) => state.account);
  const { translateData } = useSelector((state) => state.setting);
  const { zoneValue } = useSelector((state) => state.zoneUpdate)
  const [locationStatus, setLocationStatus] = useState('Fetching location...');
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [driverModal, setDriverModal] = useState(false);
  const watchID = useRef(null);
  const { latitude, longitude } = useStoredLocation();


  useEffect(() => {
    dispatch(currentZone({ lat: latitude, lng: longitude }));
  }, [])


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This app needs to access your location.',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            setLocationStatus('Permission Denied');
            Alert.alert('Permission Required', 'Location access is required for this feature.');
          }
        } catch (err) {
          console.warn('Permission request error:', err);
        }
      }
    };

    requestLocationPermission();

    return () => {
      if (watchID.current !== null) {
        Geolocation.clearWatch(watchID.current);
      }
    };
  }, []);

  const getLocation = () => {
    setLocationStatus('Getting high-accuracy location...');

    Geolocation.getCurrentPosition(
      (position) => {
        updateLocation(position);
      },
      (error) => {
        console.warn('High-accuracy location failed:', error.message);
        setLocationStatus('High-accuracy failed, trying fallback...');

        fallbackLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const fallbackLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        updateLocation(position);
      },
      (error) => {
        console.warn('Fallback location failed:', error.message);
        setLocationStatus('Unable to get location');
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 30000,
      }
    );

    watchID.current = Geolocation.watchPosition(
      (position) => {
        updateLocation(position);
      },
      (error) => {
        console.warn('Watch position failed:', error.message);
      },
      {
        enableHighAccuracy: false,
        distanceFilter: 50,
      }
    );
  };

  const updateLocation = (position) => {
    setLocationStatus('Location updated');
    setCurrentLongitude(position.coords.longitude);
    setCurrentLatitude(position.coords.latitude);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(selfDriverData())
      dispatch(rideDataGets())
      dispatch(vehicleData())
    }, []),
  )

  const rideData = [
    {
      id: "1",
      dashBoardData: `${zoneValue.currency_symbol}${selfDriver?.total_driver_commission * zoneValue.exchange_rate || 0}`,
      title: `${translateData.totalEarning}`,
      screen: "MyWallet",
    },
    {
      id: "2",
      dashBoardData: selfDriver?.total_pending_rides,
      title: `${translateData.pendingRides}`,
      screen: "MyRide",
    },
    {
      id: "3",
      dashBoardData: selfDriver?.total_complete_rides,
      title: `${translateData.completedRides}`,
      screen: "MyRide",
    },
    {
      id: "4",
      dashBoardData: selfDriver?.total_cancel_rides,
      title: `${translateData.cancelledRides}`,
      screen: "MyRide",
    },
  ];

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371e3;
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const deltaLat = toRad(coords2.latitude - coords1.latitude);
    const deltaLon = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const veryIntensiveTask = async (taskData) => {
    const { delay } = taskData;
    let lastPosition = null;

    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const currentPosition = { latitude, longitude };
            if (lastPosition) {
              const distance = haversineDistance(lastPosition, currentPosition);
              setOfflineLat(latitude);
              setOfflineLng(longitude);
              if (distance >= 50) {
                lastPosition = currentPosition;
                driverOnline(latitude, longitude);
              }
            } else {
              lastPosition = currentPosition;
            }
          },
          (error) => { },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        await new Promise((r) => setTimeout(r, delay));
      }
    });
  };

  const isAndroid13OrBelow =
    Platform.OS === "android" && Platform.Version <= 33;

  const options = {
    taskName: "LocationLogger",
    taskTitle: "Logging Location in Background",
    taskDesc: "This logs the user's location every 50 meters",
    ...(isAndroid13OrBelow && {
      taskIcon: {
        name: "ic_launcher",
        type: "mipmap",
      },
    }),
    color: appColors.pink,
    parameters: {
      delay: 2000,
    },
    isForeground: true,
  };

  const gotoRide = (ride) => {
    if (ride?.service_category?.service_category_type === "rental") {
      navigate("RentalDetails", { ride });
    } else {
      navigation.navigate("Ride", { ride });
    }
  };

  const gotoInfo = (ride) => {

    if (ride?.service_category?.service_category_type === "schedule" || ride?.service?.service_type === "freight" || ride?.service?.service_type === "parcel" || ride?.service_category?.service_category_type === "package") {
      navigate("RideInfo", { ride });
    } else if (ride?.service_category?.service_category_type === "rental") {
      navigate("RentalDetails", { ride });
    }
  }

  useEffect(() => {
    const zone_id = zoneValue?.id
    dispatch(rideRequestDataGet(zone_id))

    const intervalId = setInterval(() => {
      dispatch(rideRequestDataGet(zone_id));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const startBackgroundTask = async () => {
    const permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    if (permission === RESULTS.GRANTED) {
      if (!BackgroundService.isRunning()) {
        try {
          await BackgroundService.start(veryIntensiveTask, options);
        } catch (error) {
          console.error("Error starting background task:", error);
        }
      }
    } else {
      const requestResult = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (requestResult === RESULTS.GRANTED) {
        try {
          await BackgroundService.start(veryIntensiveTask, options);
        } catch (error) {
          console.error("Error starting background task:", error);
        }
      } else {
      }
    }
  };

  const stopBackgroundTask = async () => {
    await BackgroundService.stop();
    driverOffline();
  };


  const driverOnline = () => {
    let payload: ZoneUpdatePayload = {
      locations: [
        {
          lat: latitude,
          lng: longitude,
        },
      ],
      is_online: 1,
    };

    dispatch(driverZone(payload))
      .unwrap()
      .then((res: any) => {
        if (res?.success) {
        } else {
        }
      });
  };

  const driverOffline = () => {
    let payload: ZoneUpdatePayload = {
      locations: [
        {
          lat: offlineLat || currentLatitude,
          lng: offlineLng || currentLongitude,
        },
      ],
      is_online: 0,
    };

    dispatch(driverZone(payload))
      .unwrap()
      .then((res: any) => {
        if (res?.success) {
          setValue("token", res.access_token);
          setToken(res.access_token);
        } else {
        }
      });
  };

  const toggleSwitch = () => {
    if (!isOn) {
      setIsOn(true);
      driverOnline();
      dispatch(currentZone({ lat: latitude, lng: longitude }));
      const zone_id = zoneValue?.id
      dispatch(rideRequestDataGet(zone_id))

      dispatch(currentZone({ lat: latitude, lng: longitude }));
      startBackgroundTask();
    } else {
      stopBackgroundTask();
      setIsOn(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      setIsModalVisible(true);
      return true;
    };
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }
  }, [isFocused]);

  const handleExit = () => {
    BackHandler.exitApp();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    return () => {
      if (watchId?.current) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const { Popover } = renderers;

  const drivermodelClose = () => {
    setDriverModal(false);
  }



  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.spaceBelow}>
          <Header isOn={isOn} toggleSwitch={toggleSwitch} driverModal={driverModal} setDriverModal={setDriverModal} />
          <FlatList
            data={rideData}
            numColumns={2}
            renderItem={({ item }) => (
              <RenderRideItem item={item} colors={colors} />
            )}
            keyExtractor={(item) => item.id}
            style={[styles.listStyle, { backgroundColor: colors.background }]}
          />
          <View
            style={[styles.rideContainer, { backgroundColor: colors.card }]}
          >
            <Text
              style={[
                styles.rideTitle,
                { color: colors.text, textAlign: textRtlStyle },
              ]}
            >
              {translateData.newUpcomingRide}
            </Text>
            {rideRequestdata?.data && rideRequestdata.data.length > 0 ? (
              rideRequestdata.data?.map((ride, index) => (
                <UpcomingRide key={index} ride={ride} gotoRide={gotoRide} gotoInfo={gotoInfo} />
              ))
            ) : (
              <View style={styles.noRideContainer}>
                <Image
                  source={Images.noRide}
                  style={styles.noRideImg}
                  resizeMode="contain"
                />
                <Text style={styles.noRideText}>
                  {translateData.noRideRequest}
                </Text>
                <Menu
                  renderer={Popover}
                  rendererProps={{
                    preferredPlacement: "bottom",
                    triangleStyle: styles.triangleStyle,
                  }}>
                  <MenuTrigger style={styles.infoMenu}>
                    <Icons.Info />
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionsContainer: commonStyles.popupContainer,
                    }}>
                    <Text
                      style={commonStyles.popupText}
                    >{`${translateData.statusCode} ${statusCode}`}</Text>
                  </MenuOptions>
                </Menu>
              </View>
            )}
          </View>
        </View>

        <CommonModal
          isVisible={isModalVisible}
          closeModal={handleCancel}
          onPress={handleCancel}
          value={
            <TouchableOpacity
              style={[styles.modalContainer, { backgroundColor: colors.card }]}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.modalTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {translateData.exitMsg}
              </Text>
              <View
                style={[
                  styles.buttonContainer,
                  { flexDirection: viewRtlStyle },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: isDark
                        ? colors.background
                        : appColors.graybackground,
                    },
                  ]}
                  onPress={handleExit}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: isDark ? appColors.white : appColors.primaryFont,
                      },
                    ]}
                  >
                    {translateData.exit}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCancel}>
                  <Text style={styles.buttonText}>{translateData.cancel}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          }
        />
        <CommonModal
          isVisible={driverModal}
          closeModal={drivermodelClose}
          onPress={drivermodelClose}
          value={
            <View>
              <TouchableOpacity onPress={drivermodelClose} style={styles.closeIcon}>
                <Icons.Close />
              </TouchableOpacity>
              <Text style={styles.driverDetailsText}>{translateData.driverDetailsText}</Text>
              <View style={{ flexDirection: viewRtlStyle }}>
                <Image
                  source={selfDriver?.fleet_manager?.profile_image ? { uri: selfDriver?.fleet_manager?.profile_image } : Images.ProfileDefault}
                  style={styles.userimage}
                />
                <View style={styles.rideContainer}>
                  <Text style={[styles.userName, { color: colors.text }]}>
                    {selfDriver?.fleet_manager?.name}
                  </Text>
                </View>

              </View>
              <View style={[styles.locationMarker, { flexDirection: viewRtlStyle }]}>
                <Icons.Mail />
                <Text style={styles.number}>{selfDriver?.fleet_manager?.email}</Text>
              </View>
              <View style={[styles.locationMarker, { flexDirection: viewRtlStyle }]}>
                <Icons.Number />
                <Text style={styles.number}>{selfDriver?.fleet_manager?.phone}</Text>
              </View>
            </View>
          } />
      </ScrollView>
      {selfDriver?.total_active_rides > 0 && (
        <View style={styles.selfDriver}>
          <SwipeButton buttonText={translateData.backTOActive} />
        </View>
      )}
    </>
  );
}
