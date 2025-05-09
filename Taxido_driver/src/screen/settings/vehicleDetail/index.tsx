import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useTheme } from '@react-navigation/native'
import styles from '../../auth/registration/vehicleRegistration/styles'
import vehicleStyles from './styles'
import appColors from '../../../theme/appColors'
import { Input, Button, Header, notificationHelper } from '../../../commonComponents'
import { TitleView } from '../../auth/component'
import { RenderCategoryList, RenderServiceList, RenderVehicleList } from '../../auth/registration/vehicleRegistration/component'
import { selfDriverData, updateVehicle } from '../../../api/store/action'
import { serviceDataGet } from '../../../api/store/action/serviceAction'
import { categoryDataGet } from '../../../api/store/action/categoryAction'
import { RootStackParamList } from '../../../navigation/main/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { updateVehicleInterface } from '../../../api/interface/accountInterface'
import { windowHeight } from '../chat/context'
import { useValues } from '../../../utils/context'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export function VehicleDetail() {
  const { goBack } = useNavigation<NavigationProp>()
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const { isDark, textRtlStyle, viewRtlStyle, selectedItemIndex, categoryIndex, setCategoryIndex } = useValues()

  const { selfDriver } = useSelector((state: any) => state.account)
  const { translateData } = useSelector((state: any) => state.setting)

  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: '',
    vehicleType: '',
    vehicleName: '',
    vehicleNumber: '',
    maximumSeats: '',
    vehicleColor: '',
    model: '',
  })

  const [selectedServiceID, setSelectedServiceID] = useState<number | null>(null)
  const [selectedCategoryID, setSelectedCategoryID] = useState<number | null>(null)
  const [selectedVehicleID, setSelectedVehicleID] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedVehicle, setSelectedVehicle] = useState<string>('')
  const [vehicleIndex, setVehicleIndex] = useState<number | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    dispatch(selfDriverData())
    dispatch(serviceDataGet())
    dispatch(categoryDataGet())
  }, [dispatch])

  useEffect(() => {
    if (selfDriver?.vehicle_info) {
      const vehicle = selfDriver?.vehicle_info
      setFormData({
        serviceName: selfDriver?.service_id?.toString() || '',
        serviceCategory: selfDriver?.service_category_id?.toString() || '',
        vehicleType: vehicle?.vehicle_type_id?.toString() || '',
        vehicleName: vehicle?.name || '',
        model: vehicle?.model || '',
        vehicleNumber: vehicle?.plate_number || '',
        vehicleColor: vehicle?.color || '',
        maximumSeats: vehicle?.seat?.toString() || '',
      })
      setSelectedServiceID(selfDriver?.service_id || null)
      setSelectedCategoryID(selfDriver?.service_category_id || null)
      setSelectedVehicleID(vehicle?.vehicle_type_id || null)
    }
  }, [selfDriver])

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleItemPress = (index: number, name: string, id: number) => {
    setSelectedServiceID(id)
    setFormData(prev => ({ ...prev, serviceName: id.toString() }))
  }

  const handleCategoryPress = (index: number, categoryName: string, categoryId?: string) => {
    setCategoryIndex(index)
    setSelectedCategory(categoryName)
    if (categoryId) setSelectedCategoryID(Number(categoryId))
  }

  const handleVehiclePress = (index: number, name: string, id: string) => {
    setVehicleIndex(index)
    setSelectedVehicle(name)
    setSelectedVehicleID(Number(id))
  }

  const updateDetails = () => {
    const payload: updateVehicleInterface = {
      service: selectedServiceID,
      service_category: selectedCategoryID,
      model: formData.model,
      vehicle_name: formData.vehicleName || null,
      plate_number: formData.vehicleNumber,
      vehicle_type_id: selectedVehicleID,
      color: formData.vehicleColor,
      seat: parseInt(formData.maximumSeats || '0', 10),
    }

    dispatch(updateVehicle(payload))
      .unwrap()
      .then((res: any) => {
        if (!res?.success) {
          notificationHelper('Update', translateData.detailsUpdateSuccessfully, 'success')
          dispatch(selfDriverData())
          goBack()
        } else {
          notificationHelper('Error', 'Something went wrong.', 'error')
        }
      })
  }

  return (
    <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
      <Header title={translateData.vehicleRegistration} />
      <View style={[styles.subView, { backgroundColor: colors.background }]}>
        <View style={styles.subContainer}>
          <TitleView
            title={translateData.vehicleRegistration}
            subTitle={translateData.registerContent}
          />

          <Text style={[styles.selectTitle, { color: isDark ? appColors.white : appColors.primaryFont, textAlign: textRtlStyle }]}>
            {translateData.selectService}
          </Text>
          <View style={{ flexDirection: viewRtlStyle, marginTop: windowHeight(5) }}>
            <RenderServiceList
              selectedItemIndex={selectedItemIndex}
              handleItemPress={handleItemPress}
              serviceId={selfDriver?.service_id}
            />
          </View>

          <Text style={[styles.selectTitle, { color: isDark ? appColors.white : appColors.primaryFont, textAlign: textRtlStyle, marginTop: windowHeight(7) }]}>
            {translateData.selectCategory}
          </Text>
          <View style={[vehicleStyles.categoryList, { flexDirection: viewRtlStyle }]}>
            <RenderCategoryList
              categoryIndex={categoryIndex}
              handleItemPress={handleCategoryPress}
              selectedService={selectedServiceID || selfDriver?.service_id}
              selectedCategory={selectedCategory}
              categoryId={selfDriver?.service_category_id}
            />
          </View>

          <Text style={[styles.selectTitle1, { color: isDark ? appColors.white : appColors.primaryFont, textAlign: textRtlStyle }]}>
            {translateData.selectVehicle}
          </Text>
          <View style={{ flexDirection: viewRtlStyle }}>
            <RenderVehicleList
              vehicleIndex={vehicleIndex}
              selectedItemIndex={selectedItemIndex}
              selectedCategory={selectedCategoryID || selfDriver?.service_category_id}
              selectedVehicle={selectedVehicleID || selfDriver?.vehicle_info?.vehicle_type_id}
              serviceId={selectedServiceID || selfDriver?.service_id}
              handleItemPress={handleVehiclePress}
            />
          </View>

          <View style={vehicleStyles.vehicleName}>
            <Input
              titleShow
              title={translateData.vehicleName}
              placeholder={translateData.enterVehicleNames}
              value={formData.model}
              onChangeText={text => handleChange('model', text)}
              showWarning={showWarning && !formData.model}
              warning={translateData.enterYourvehicleName}
              backgroundColor={isDark ? appColors.darkThemeSub : appColors.white}
            />
          </View>
          <View style={vehicleStyles.vehicle}>
            <Input
              titleShow
              title={translateData.vehicleNo}
              placeholder={translateData.rnterVehicleNo}
              value={formData.vehicleNumber}
              onChangeText={text => handleChange('vehicleNumber', text)}
              showWarning={showWarning && !formData.vehicleNumber}
              warning={translateData.pleaseEnterVehicleNo}
              backgroundColor={isDark ? appColors.darkThemeSub : appColors.white}
            />
          </View>
          <View style={vehicleStyles.vehicle}>
            <Input
              titleShow
              title={translateData.vehicleColor}
              placeholder={translateData.enterVehicleColor}
              value={formData.vehicleColor}
              onChangeText={text => handleChange('vehicleColor', text)}
              showWarning={showWarning && !formData.vehicleColor}
              warning={translateData.enterYourvehicleColor}
              backgroundColor={isDark ? appColors.darkThemeSub : appColors.white}
            />
          </View>
          <View style={vehicleStyles.datePicker}>
            <Input
              titleShow
              title={translateData.maximumSeats}
              placeholder={translateData.enterMaximumSeats}
              value={formData.maximumSeats}
              onChangeText={text => handleChange('maximumSeats', text)}
              showWarning={showWarning && !formData.maximumSeats}
              warning={translateData.enterYourmaximumSeats}
              keyboardType="numeric"
              backgroundColor={isDark ? appColors.darkThemeSub : appColors.white}
            />
          </View>
        </View>
        <View style={{ marginTop: windowHeight(3) }}>
          <Button
            title={translateData.update}
            backgroundColor={appColors.primary}
            color={appColors.white}
            onPress={updateDetails}
          />
        </View>
      </View>
    </ScrollView>
  )
}
