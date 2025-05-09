import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Button, Header } from '../../../commonComponents'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styles'
import appColors from '../../../theme/appColors'
import { useValues } from '../../../utils/context'
import Images from '../../../utils/images/images'
import { useNavigation, useTheme } from '@react-navigation/native'
import Icons from '../../../utils/icons/icons'
import CalanderSmall from '../../../assets/icons/caladerSmall'
import Clock from '../../../assets/icons/clock'
import { windowHeight } from '../../../theme/appConstant'
import { acceptRequestValue } from '../../../api/store/action'

export function RideInfo({ route }) {

    const { ride, status } = route.params || {}
    const { translateData, settingData } = useSelector(state => state.setting)
    const { viewRtlStyle, isDark } = useValues()
    const { colors } = useTheme()
    const { zoneValue } = useSelector((state) => state.zoneUpdate)
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    const gotoRide = (ride) => {
        if (ride?.service_category?.service_category_type === "rental") {
            navigate("RentalDetails", { ride });
        } else {
            navigate("Ride", { ride });
        }
    };

    const acceptRide = (rideId) => {
        let payload = {
            ride_request_id: rideId,
        };
        dispatch(acceptRequestValue(payload))
            .unwrap()
            .then(res => {
                if (res?.success) {

                } else {

                }
            })
    }

    const statusMapping = {
        accepted: {
            text: `${translateData.pendingRide}`,
            color: appColors.completeColor,
            backgroundColor: appColors.lightYellow,
        },
        started: {
            text: `${translateData.active}`,
            color: appColors.activeColor,
            backgroundColor: appColors.lightGreen,
        },
        schedule: {
            text: `${translateData.scheduled}`,
            color: appColors.scheduleColor,
            backgroundColor: appColors.lightPink,
        },
        cancelled: {
            text: `${translateData.cancel}`,
            color: appColors.alertRed,
            backgroundColor: appColors.lightOrange,
        },
        completed: {
            text: `${translateData.completed}`,
            color: appColors.primary,
            backgroundColor: appColors.cardicon,
        },
    }

    const currentStatus = statusMapping[status] || {
        text: 'Requested',
        color: appColors.primaryFont,
        backgroundColor: '',
    }

    const formatDates = dateString => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = date.toLocaleString('en-US', { month: 'short' })
        const year = String(date.getFullYear()).slice(-2)
        const hours = String(date.getHours() % 12 || 12).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'

        return {
            date: `${day} ${month}’${year}`,
            time: `${hours}:${minutes} ${ampm}`,
        }
    }
    const createdAt = ride?.created_at
    const formattedDate = formatDates(createdAt)

    return (
        <View style={styles.container}>
            <Header title={`${ride?.service?.name}  ${translateData.rideInfoHeaderDetails}`} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.detailContainer}>
                    <View
                        style={[
                            styles.profileContainer,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <View style={[styles.profileView, { flexDirection: viewRtlStyle }]}>
                            <View style={[styles.starView, { flexDirection: viewRtlStyle }]}>
                                <Image
                                    source={Images.ProfileDefault}
                                    style={styles.profileImg}
                                />
                                <View style={styles.riderContainer}>
                                    <Text
                                        style={[
                                            styles.name,
                                            {
                                                color: isDark ? appColors.white : appColors.primaryFont,
                                            },
                                        ]}
                                    >
                                        {ride?.rider?.name}
                                    </Text>
                                    <View
                                        style={[styles.starView, { flexDirection: viewRtlStyle }]}
                                    >
                                        <Icons.Star />
                                        <Text
                                            style={[
                                                styles.rating,
                                                {
                                                    color: isDark
                                                        ? appColors.white
                                                        : appColors.primaryFont,
                                                },
                                            ]}
                                        >
                                            4.8(120)
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tagTitle}>
                                    {currentStatus.text || `${translateData.requested}`}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={[
                                styles.containerPrice,
                                {
                                    borderBottomColor: colors.border,
                                },
                            ]}
                        />
                        <View
                            style={[styles.priceContainer, { flexDirection: viewRtlStyle }]}
                        >
                            <View style={{ flexDirection: viewRtlStyle }}>
                                <Image source={Images.carFront} style={styles.carLogo} />
                                <View style={styles.rideNoContainer}>

                                    <Text style={styles.price}>{zoneValue.currency_symbol}{ride?.ride_fare}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CalanderSmall />
                                    <Text style={styles.createDate}>{formattedDate.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Clock />
                                    <Text style={styles.createDate}>{formattedDate.time}</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.pickUpBorder,
                                {
                                    borderBottomColor: colors.border,
                                },
                            ]}
                        />
                        <Text
                            style={[
                                styles.location,
                                { color: isDark ? appColors.white : appColors.primaryFont },
                            ]}
                        >
                            {translateData.pickUp}{' '}
                            <Text style={styles.locationName}>{ride.locations[0]}</Text>
                        </Text>
                        {ride.locations[1] && (
                            <>
                                <View
                                    style={[
                                        styles.dropOffBorder,
                                        {
                                            borderBottomColor: appColors.border,
                                        },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.location,
                                        { color: isDark ? appColors.white : appColors.primaryFont },
                                    ]}
                                >
                                    {translateData.dropOff}{' '}
                                    <Text style={styles.locationName}>{ride.locations[1]}</Text>
                                </Text>
                            </>
                        )}
                    </View>

                    {ride?.service_category?.service_category_type === 'schedule' && (
                        <View
                            style={[styles.rentalContainer, { flexDirection: viewRtlStyle }]}
                        >
                            <View style={styles.containerSchedule}>
                                <Text style={styles.startTime}>{translateData.startDate}</Text>
                                <View
                                    style={[
                                        styles.scheduleClock,
                                        { flexDirection: viewRtlStyle },
                                    ]}
                                >
                                    <CalanderSmall />
                                    <Text style={styles.formattedDateText}>
                                        {' '}
                                        {formattedDate?.date}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[styles.rentalBorder, { borderColor: colors.border }]}
                            />
                            <View style={styles.containerSchedule}>
                                <Text style={styles.startTime}>{translateData.startTime}</Text>
                                <View
                                    style={[
                                        styles.scheduleClock,
                                        { flexDirection: viewRtlStyle },
                                    ]}
                                >
                                    <Clock />
                                    <Text style={styles.formattedDateText}>
                                        {' '}
                                        {formattedDate?.time}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}




                    {ride?.service_category?.service_category_type === 'package' && (
                        <View
                            style={[styles.rentalContainer, { flexDirection: viewRtlStyle }]}
                        >
                            <View style={styles.containerSchedule}>
                                <Text style={styles.startTime}>KM</Text>
                                <View
                                    style={[
                                        styles.scheduleClock,
                                        { flexDirection: viewRtlStyle },
                                    ]}
                                >
                                    <Text style={styles.formattedDateText}>
                                        {' '}
                                        {ride?.hourly_packages?.distance} {ride?.hourly_packages?.distance_type}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[styles.rentalBorder, { borderColor: colors.border }]}
                            />
                            <View style={styles.containerSchedule}>
                                <Text style={styles.startTime}>Time</Text>
                                <View
                                    style={[
                                        styles.scheduleClock,
                                        { flexDirection: viewRtlStyle },
                                    ]}
                                >
                                    <Text style={styles.formattedDateText}>
                                        {' '}
                                        {ride?.hourly_packages?.hour} hour
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}


                    {ride?.service?.service_type === 'package' || ride?.service?.service_type === 'freight' || ride?.service?.service_type === 'parcel' && (
                        <View style={styles.packageContainer}>
                            <Image source={{ uri: ride?.cargo_image_url }} style={styles.vehicleLogo} />

                            <Text style={styles.packageDescription}>A cargo container is a large, standardized, and durable shipping box designed to transport goods across various modes of transportation, such as ships, trains, and trucks.</Text>
                            {ride?.service?.service_type === 'package' && (
                                <>
                                    <View
                                        style={[
                                            styles.pickUpBorder,
                                            {
                                                borderBottomColor: colors.border,
                                            },
                                        ]}
                                    />

                                    <View style={styles.details}>
                                        <Text >Package Name</Text><Text>5</Text>
                                    </View>
                                    <View style={styles.details}>
                                        <Text >Receiver Name</Text><Text>5</Text>
                                    </View>
                                    <View style={[styles.details, { marginVertical: windowHeight(1) }]}>
                                        <Text>Receiver No.</Text><Text>5</Text>
                                    </View>
                                    <View style={styles.details}>
                                        <Text>Weight</Text><Text>5</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    )}


                </View>
            </ScrollView>
            <View style={styles.acceptBtn}>
                <Button title='Accept' backgroundColor={appColors.primary} color={appColors.white} onPress={() => gotoRide(ride)} />
            </View>
        </View>
    )
}

