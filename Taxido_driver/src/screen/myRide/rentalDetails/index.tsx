import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native'
import React, { useState } from 'react'
import { Button, Header, notificationHelper } from '../../../commonComponents'
import appColors from '../../../theme/appColors'
import { windowWidth } from '../../../theme/appConstant'
import { styles } from './styles'
import Images from '../../../utils/images/images'
import Icons from '../../../utils/icons/icons'
import { acceptRequestValue } from '../../../api/store/action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'
import OTPTextView from 'react-native-otp-textinput'
import { rideStartData } from '../../../api/store/action'
import { useValues } from '../../../utils/context'

export function RentalDetails({ route }) {
  const { ride, status } = route.params || {}
  const [otpModalVisible, setOtpModalVisible] = useState(false)
  const [warning, setWarning] = useState('')
  const [enteredOtp, setEnteredOtp] = useState('')
  const { goBack } = useNavigation()
  const dispatch = useDispatch()
  const { viewRtlStyle, isDark, textRtlStyle } = useValues()
  const { colors } = useTheme()
  const { translateData } = useSelector(state => state.setting)

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

  const closeModal = () => {
    setOtpModalVisible(false)
    let payload: ReviewInterface = {
      ride_id: ride?.id,
      otp: enteredOtp,
    }
    dispatch(rideStartData(payload))
      .unwrap()
      .then((res: any) => {
        if (res.state !== false) {
          notificationHelper('Ride Status', translateData.rideStarted, 'info')
          goBack()
        }
      })
  }

  const formatDate = isoDate => {
    const date = new Date(isoDate)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear().toString().slice(-2)
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    return `${day} ${month}’${year} at ${formattedHours}:${minutes} ${ampm}`
  }

  const createdAt = '2025-01-04T05:29:58.000000Z'
  const formattedDate = formatDate(createdAt)

  const acceptRequest = () => {
    let payload: ReviewInterface = {
      ride_request_id: ride?.id,
    }

    dispatch(acceptRequestValue(payload))
      .unwrap()
      .then((res: any) => {
        notificationHelper('Ride Status', translateData.rideAccepted, 'success')
        goBack()
      })
  }

  const startTime = ride.start_time
  const endTime = ride.end_time

  const [startDate, startTimePart] = startTime.split(' ')
  const [endDate, endTimePart] = endTime.split(' ')

  const [startHour, startMinute] = startTimePart.split(':')
  const [endHour, endMinute] = endTimePart.split(':')

  const formattedStartDate = startDate
  const formattedStartTime = `${startHour}:${startMinute}`

  const formattedEndDate = endDate
  const formattedEndTime = `${endHour}:${endMinute}`

  const gotoPickup = () => {
    setOtpModalVisible(true)
  }

  const handleChange = (otp: string) => {
    setEnteredOtp(otp)
    if (otp.length == 5) {
      setWarning('')
    }
  }
  return (
    <View style={styles.container}>
      <Header title={translateData.rentalDetails} />
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
                    {ride.rider.name}
                  </Text>
                  <View
                    style={[styles.starView, { flexDirection: viewRtlStyle }]}
                  >
                    <Text
                      style={[
                        styles.name,
                        {
                          color: isDark
                            ? appColors.white
                            : appColors.primaryFont,
                        },
                      ]}
                    >
                      {ride.rental_vehicle.name}
                    </Text>
                    <View
                      style={[
                        styles.verticalLine,
                        { borderColor: colors.border },
                      ]}
                    />
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
                  <Text
                    style={[
                      styles.rideNO,
                      {
                        color: isDark ? appColors.white : appColors.primaryFont,
                      },
                    ]}
                  >
                    {translateData.rideNo}
                  </Text>
                  <Text style={styles.price}>${ride.ride_fare}</Text>
                </View>
              </View>
              <Text style={styles.createDate}>{formattedDate}</Text>
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
          </View>
        </View>
        <View
          style={[
            styles.timeContainer,
            { borderColor: colors.border },
            { backgroundColor: colors.card },
          ]}
        >
          <Text
            style={[
              styles.timeTitle,
              { color: isDark ? appColors.white : appColors.primaryFont },
            ]}
          >
            {translateData.startTimeDate}
          </Text>
          <View
            style={[
              styles.rideFareContainer,
              {
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <View
              style={[styles.containerClock, { flexDirection: viewRtlStyle }]}
            >
              <View style={styles.calanderBig}>
                <Icons.Clock />
              </View>
              <Text style={styles.textNormal}>{formattedStartTime}</Text>
            </View>
            <View
              style={[styles.containerClock, { flexDirection: viewRtlStyle }]}
            >
              <View style={styles.calanderBig}>
                <Icons.CalanderSmall />
              </View>
              <Text style={styles.textNormal}>{formattedStartDate}</Text>
            </View>
          </View>
          <Text
            style={[
              styles.timeTitle1,
              { color: isDark ? appColors.white : appColors.primaryFont },
            ]}
          >
            {translateData.sndTimeDate}
          </Text>
          <View
            style={[
              styles.rideFareContainer,
              {
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <View
              style={[styles.containerClock, { flexDirection: viewRtlStyle }]}
            >
              <View style={styles.calanderBig}>
                <Icons.Clock />
              </View>
              <Text
                style={[
                  styles.textNormal,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {formattedEndTime}
              </Text>
            </View>
            <View
              style={[styles.containerClock, { flexDirection: viewRtlStyle }]}
            >
              <View style={styles.calanderBig}>
                <Icons.CalanderSmall />
              </View>
              <Text
                style={[
                  styles.textNormal,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {formattedEndDate}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.timeTitle1,
              { color: isDark ? appColors.white : appColors.primaryFont },
            ]}
          >
            {translateData.totalNoofDays}
          </Text>
          <View
            style={[
              styles.calanderBigContainer,
              {
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <View style={styles.calanderBig}>
              <Icons.CalanderBig />
            </View>
            <Text
              style={[
                styles.textNormal,
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              {ride?.no_of_days} {translateData.days}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.listContainer,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <View
            style={[
              styles.listView,
              {
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <Text style={styles.title}>{translateData.date}</Text>
            <Text
              style={[
                styles.subTitle,
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              {formattedDate}
            </Text>
          </View>
          <View
            style={[
              styles.completedView,
              {
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <Text style={styles.title}>{translateData.tripCompleted}</Text>
            <Text
              style={[
                styles.subTitle,
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              12000052
            </Text>
          </View>
          <View
            style={[styles.dashLine, { borderBottomColor: colors.border }]}
          />
          <View style={styles.carImgContainer}>
            <Image
              source={{ uri: ride?.rental_vehicle?.normal_image?.original_url }}
              style={styles.carImg}
            />
          </View>
          <View
            style={[
              styles.starMainView,
              {
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <Text
              style={[
                styles.carBrand,
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              {ride?.rental_vehicle?.name}
            </Text>
            <View style={[styles.starView, { flexDirection: viewRtlStyle }]}>
              <Icons.Star />
              <Text style={styles.numberText}>4.0</Text>
            </View>
          </View>
          <View
            style={[
              styles.smallCardView,
              {
                flexDirection: viewRtlStyle,
              },
            ]}
          >
            <Icons.SmallCard color={appColors.secondaryFont} />
            <Text style={styles.CLMV069}>CLMV069</Text>
          </View>
          <View
            style={[styles.dashLine, { borderBottomColor: colors.border }]}
          />
          <View style={[styles.descContainer, { flexDirection: viewRtlStyle }]}>
            <Text style={styles.engineInfo}>
              {ride?.rental_vehicle?.description}
            </Text>
            <Text style={styles.rentPrice}>
              ${ride?.rental_vehicle?.vehicle_per_day_price}
              <Text style={styles.perDay}>/{translateData.day}</Text>
            </Text>
          </View>
          <View
            style={[styles.dashLine, { borderBottomColor: colors.border }]}
          />
          <View style={[styles.descContainer, { flexDirection: viewRtlStyle }]}>
            <Text
              style={[
                styles.driverTitle,
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              {translateData.driverPrice}
            </Text>
            <Text style={styles.rentPrice}>
              ${ride?.rental_vehicle?.driver_per_day_charge}
              <Text style={styles.perDay}>/{translateData.day}</Text>
            </Text>
          </View>
          <View style={[styles.tagContainer, { flexDirection: viewRtlStyle }]}>
            <View style={[styles.iconBox, { flexDirection: viewRtlStyle }]}>
              <Icons.CarType />
              <Text style={styles.iconTitle}>
                {ride?.rental_vehicle?.vehicle_subtype}
              </Text>
            </View>
            <View style={[styles.iconBox, { flexDirection: viewRtlStyle }]}>
              <Icons.FuelType />
              <Text style={styles.iconTitle}>
                {ride?.rental_vehicle?.fuel_type}
              </Text>
            </View>
            <View style={[styles.iconBox, { flexDirection: viewRtlStyle }]}>
              <Icons.Milage />
              <Text style={styles.iconTitle}>
                {ride?.rental_vehicle?.mileage}km/ltr
              </Text>
            </View>
            <View style={[styles.iconBox, { flexDirection: viewRtlStyle }]}>
              <Icons.GearType />
              <Text style={styles.iconTitle}>
                {ride?.rental_vehicle?.gear_type}
              </Text>
            </View>
            <View style={[styles.iconBox, { flexDirection: viewRtlStyle }]}>
              <Icons.CarSeat />
              <Text style={styles.iconTitle}>5 {translateData.seat}</Text>
            </View>
            <View style={[styles.iconBox, { flexDirection: viewRtlStyle }]}>
              <Icons.Speed />
              <Text style={styles.iconTitle}>
                {ride?.rental_vehicle?.vehicle_speed}/h
              </Text>
            </View>
          </View>
          <View style={styles.interiorMainView}>
            <Text
              style={[
                styles.driverTitle,
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              {translateData.interior}
            </Text>
            <View style={styles.interiorView}>
              {ride?.rental_vehicle.interior.map((detail, index) => (
                <Text key={index} style={styles.interiorData}>
                  {`• ${detail}`}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.billSummaryView}>
            <Text
              style={[
                styles.driverTitle,
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              {translateData.billSummary}
            </Text>
            <View
              style={[styles.normalLine, { borderBottomColor: colors.border }]}
            />
            <View
              style={[
                styles.rideFareContainer,
                {
                  flexDirection: viewRtlStyle,
                },
              ]}
            >
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {translateData.rideFare}
              </Text>
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                ${ride.ride_fare}
              </Text>
            </View>
            <View
              style={[
                styles.rideFareContainer,
                {
                  flexDirection: viewRtlStyle,
                },
              ]}
            >
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {translateData.rideFare}
              </Text>
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                $46
              </Text>
            </View>
            <View
              style={[
                styles.rideFareContainer,
                {
                  flexDirection: viewRtlStyle,
                },
              ]}
            >
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {translateData.rideFare}
              </Text>
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                $46
              </Text>
            </View>
            <View
              style={[
                styles.rideFareContainer,
                {
                  flexDirection: viewRtlStyle,
                },
              ]}
            >
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {translateData.rideFare}
              </Text>
              <Text
                style={[
                  styles.paymentTitle,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                $46
              </Text>
            </View>
          </View>

          {currentStatus.text == 'Pending' && (
            <View style={styles.pickupCustomerBtn}>
              <Button
                title={translateData.pickupCustomer}
                backgroundColor={appColors.primary}
                color={appColors.white}
                margin={windowWidth(2.5)}
                onPress={gotoPickup}
              />
            </View>
          )}
          {currentStatus.text == 'Requested' && (
            <View
              style={[
                styles.requestedContainer,
                {
                  flexDirection: viewRtlStyle,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.declineContainer,
                  {
                    backgroundColor: isDark
                      ? appColors.darkThemeSub
                      : appColors.graybackground,
                  },
                ]}
              >
                <Text style={styles.declineText}>{translateData.decline}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={acceptRequest}
                style={styles.acceptContainer}
                activeOpacity={0.7}

              >
                <Text
                  style={[
                    styles.acceptText,
                    {
                      color: appColors.white,
                    },
                  ]}
                >
                  {translateData.accept}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
        <Modal
          visible={otpModalVisible}
          animationType="none"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: isDark ? colors.card : appColors.white },
              ]}
            >
              <TouchableOpacity
                style={[styles.closeBtn, { flexDirection: viewRtlStyle }]}
                onPress={closeModal}
                activeOpacity={0.7}

              >
                <Icons.Close />
              </TouchableOpacity>
              <Text
                style={[
                  styles.modalText,
                  { color: isDark ? colors.text : appColors.primaryFont },
                ]}
              >
                {translateData.otpConfirm}
              </Text>
              <Text
                style={[
                  styles.otpTitle,
                  { textAlign: textRtlStyle },
                  { color: isDark ? colors.text : appColors.primaryFont },
                ]}
              >
                {translateData.enterOTP}
              </Text>
              <OTPTextView
                containerStyle={[
                  styles.otpContainer,
                  { flexDirection: viewRtlStyle },
                ]}
                textInputStyle={[
                  styles.otpInput,
                  {
                    backgroundColor: isDark
                      ? appColors.darkThemeSub
                      : appColors.graybackground,
                  },
                  { color: colors.text },
                ]}
                handleTextChange={handleChange}
                inputCount={4}
                keyboardType="numeric"
                tintColor="transparent"
                offTintColor="transparent"
              />
              <TouchableOpacity onPress={closeModal} style={styles.closeButton} activeOpacity={0.7}>
                <Button
                  title={translateData.verify}
                  color={appColors.white}
                  onPress={closeModal}
                  backgroundColor={appColors.primary}
                  margin="0"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
}
