import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './styles'
import appColors from '../../../../theme/appColors'
import { ProgressBar } from '../component'
import { Input, Button } from '../../../../commonComponents'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Header, TitleView } from '../../component'
import {
  RenderRuleList,
  RenderVehicleList,
  RenderCategoryList,
  RenderServiceList,
  RenderCategoryReg,
} from './component'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../navigation/main/types'
import { useValues } from '../../../../utils/context'
import { useDispatch, useSelector } from 'react-redux'
import { driverRuleGet } from '../../../../api/store/action/driverRuleAction'
import { windowHeight } from '../../../../theme/appConstant'

type Navigation = NativeStackNavigationProp<RootStackParamList>

export function VehicleRegistration() {
  const navigation = useNavigation<Navigation>()
  const { colors } = useTheme()
  const { textRtlStyle, setVehicleDetail, viewRtlStyle, isDark } = useValues()
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [showWarning, setShowWarning] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(null)
  const [selectedService, setSelectedService] = useState('')
  const [categoryIndex, setCategoryIndex] = useState<number>(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categorySlug, setcategorySlug] = useState('')
  const [vehicleIndex, setVehicleIndex] = useState<number>(null)
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [selectedServiceID, setSelectedServiceID] = useState()
  const [selectedCategoryID, setSelectedCategoryID] = useState()
  const [selectedVehicleID, setSelectedVehicleID] = useState()
  const { driverRulesData } = useSelector((state: any) => state.driverRule)
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: '',
    vehicleType: '',
    vehicleName: '',
    vehicleNumber: '',
    vehicleColor: '',
    maximumSeats: '',
    ambulanceName: '',
    ambulanceDescription: '',
  })
  const { translateData } = useSelector(state => state.setting)
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      serviceName: selectedServiceID,
      serviceCategory: selectedCategoryID,
      vehicleType: selectedVehicleID,
    }))
  }, [selectedServiceID, selectedCategoryID, selectedVehicleID])
  const dispatch = useDispatch()

  useEffect(() => {
    getService()
  }, [])

  const getService = () => {
    dispatch(driverRuleGet())
  }

  const handleChange = (key: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleCheckboxPress = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleItemPress = (index: number, name: string, serviceId: number) => {
    setSelectedService(name)
    setSelectedItemIndex(index)
    setSelectedServiceID(serviceId)
  }

  const handleCategoryPress = (
    index: number,
    categoryName: string,
    categoryId: string,
    slug: string,
  ) => {
    setSelectedCategory(categoryName)
    setCategoryIndex(index)
    setSelectedCategoryID(categoryId)
    setcategorySlug(slug)
  }

  const handleVehiclePress = (
    index: number,
    vehicleName: string,
    vehicleId: string,
  ) => {
    setVehicleIndex(index), setSelectedVehicle(vehicleName)
    setSelectedVehicleID(vehicleId)
  }

  const gotoBankDetails = () => {

    if (categorySlug === 'rental') {
      setShowWarning(false)
      setVehicleDetail(formData)
      navigation.navigate('BankDetail')
      return
    }

    const isAmbulance = selectedService === 'ambulance'

    const hasEmptyFields = Object.entries(formData).some(([key, value]) => {
      if (isAmbulance && (key === 'ambulanceName' || key === 'ambulanceDescription')) {
        return typeof value === 'string' && value.trim() === ''
      }
      if (!isAmbulance && ['vehicleName', 'vehicleNumber', 'vehicleColor', 'maximumSeats'].includes(key)) {
        return typeof value === 'string' && value.trim() === ''
      }

      return false
    })

    if (hasEmptyFields) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
      setVehicleDetail(formData)
      navigation.navigate('BankDetail')
    }
  }


  return (
    <View style={{ flex: 1 }}>
      <Header backgroundColor={isDark ? colors.card : appColors.white} />
      <ProgressBar fill={3} />
      <ScrollView style={[styles.main]} showsVerticalScrollIndicator={false}>
        <View style={[styles.subView, { backgroundColor: colors.background }]}>
          <View style={styles.subContainer}>
            <TitleView
              title={translateData.vehicleRegistration}
              subTitle={translateData.registerContent}
            />

            <Text
              style={[
                styles.vehicleTitle,
                { textAlign: textRtlStyle },
                { color: isDark ? appColors.white : appColors.primaryFont },
              ]}
            >
              {translateData.selectService}
            </Text>
            <View style={{ flexDirection: viewRtlStyle }}>
              <RenderServiceList
                selectedItemIndex={selectedItemIndex}
                handleItemPress={handleItemPress}
              />
            </View>


            {selectedService === 'ambulance' ? (

              null
            ) :
              <>
                <Text
                  style={[
                    styles.vehicleTitle,
                    { textAlign: textRtlStyle },
                    { color: isDark ? appColors.white : appColors.primaryFont },
                  ]}
                >
                  {translateData.selectCategory}
                </Text>
                <View style={{ flexDirection: viewRtlStyle }}>
                  <RenderCategoryReg
                    categoryIndex={categoryIndex}
                    handleItemPress={handleCategoryPress}
                    selectedService={selectedService}
                  />
                </View>
              </>
            }
            {categorySlug === 'rental' ? (
              <View style={styles.rentalBg}>
                <Text style={styles.rentalDesc}>
                  {translateData.rentalNotice}
                </Text>
              </View>
            ) : (
              <>
                {selectedService === 'ambulance' ? (

                  null
                ) :
                  <>
                    <View style={styles.vehicle}>
                      <Text
                        style={[
                          styles.vehicleTitle,
                          { textAlign: textRtlStyle },
                          {
                            color: isDark ? appColors.white : appColors.primaryFont,
                          },
                          { bottom: windowHeight(0) },
                        ]}
                      >
                        {translateData.selectVehicle}
                      </Text>
                      <View style={{ flexDirection: viewRtlStyle }}>
                        <RenderVehicleList
                          vehicleIndex={vehicleIndex}
                          handleItemPress={handleVehiclePress}
                          selectedCategory={selectedCategory}
                          serviceId={selectedServiceID}
                          categoryId={selectedCategoryID}
                        />
                      </View>
                    </View>
                    <View style={styles.vehicleName}>
                      <Input
                        title={translateData.vehicleName}
                        titleShow={true}
                        placeholder={translateData.enterVehicleNames}
                        value={formData.vehicleName}
                        onChangeText={text => handleChange('vehicleName', text)}
                        showWarning={showWarning && formData.vehicleName === ''}
                        warning={translateData.enterYourvehicleName}
                        backgroundColor={
                          isDark ? appColors.darkThemeSub : appColors.white
                        }
                        icon={false}
                      />
                    </View>
                  </>
                }
                {selectedService === 'ambulance' ? (
                  <>
                    <View style={[styles.vehicleNo, { marginTop: windowHeight(3.5) }]}>
                      <Input
                        title={translateData.ambulanceName}
                        titleShow={true}
                        placeholder={translateData.enterHospitalName}
                        value={formData.ambulanceName}
                        onChangeText={text => handleChange('ambulanceName', text)}
                        showWarning={showWarning && formData.ambulanceName === ''}
                        warning={translateData.pleaseEnterAmbulanceName}
                        backgroundColor={
                          isDark ? appColors.darkThemeSub : appColors.white
                        }
                      />
                    </View>
                    <View style={styles.vehicleColor}>
                      <Input
                        title={translateData.ambulanceDescription}
                        titleShow={true}
                        placeholder={translateData.enterAmbulanceDescription}
                        value={formData.ambulanceDescription}
                        onChangeText={text => handleChange('ambulanceDescription', text)}
                        showWarning={showWarning && formData.ambulanceDescription === ''}
                        warning={translateData.pleaseEnterAmbulanceDescription}
                        backgroundColor={
                          isDark ? appColors.darkThemeSub : appColors.white
                        }
                      />
                    </View>
                  </>
                ) :
                  <>
                    <View style={styles.vehicleNo}>
                      <Input
                        title={translateData.vehicleNo}
                        titleShow={true}
                        placeholder={translateData.rnterVehicleNo}
                        value={formData.vehicleNumber}
                        onChangeText={text => handleChange('vehicleNumber', text)}
                        showWarning={showWarning && formData.vehicleNumber === ''}
                        warning={translateData.pleaseEnterVehicleNo}
                        backgroundColor={
                          isDark ? appColors.darkThemeSub : appColors.white
                        }
                      />
                    </View>
                    <View style={styles.vehicleColor}>
                      <Input
                        title={translateData.vehicleColor}
                        titleShow={true}
                        placeholder={translateData.enterVehicleColor}
                        value={formData.vehicleColor}
                        onChangeText={text => handleChange('vehicleColor', text)}
                        showWarning={showWarning && formData.vehicleColor === ''}
                        warning={translateData.enterYourvehicleColor}
                        backgroundColor={
                          isDark ? appColors.darkThemeSub : appColors.white
                        }
                      />
                    </View>
                    <View style={styles.maximumSeats}>
                      <Input
                        title={translateData.maximumSeats}
                        titleShow={true}
                        placeholder={translateData.enterMaximumSeats}
                        value={formData.maximumSeats}
                        onChangeText={text => handleChange('maximumSeats', text)}
                        showWarning={showWarning && formData.maximumSeats === ''}
                        warning={translateData.enterYourmaximumSeats}
                        keyboardType="numeric"
                        backgroundColor={
                          isDark ? appColors.darkThemeSub : appColors.white
                        }
                      />
                    </View>
                  </>
                }

              </>
            )}
            {driverRulesData?.data?.length > 0 && (
              <>
                <Text
                  style={[
                    styles.ruleTitle,
                    { color: colors.text, textAlign: textRtlStyle },
                  ]}
                >
                  {translateData.selectYourRule}
                </Text>
                <View>
                  {driverRulesData.data?.map(item => (
                    <RenderRuleList
                      key={item.id}
                      item={item}
                      selectedIds={selectedIds}
                      handleCheckboxPress={handleCheckboxPress}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
          <View
            style={[{ marginBottom: windowHeight(15), top: windowHeight(2.8) }]}
          >
            <Button
              onPress={gotoBankDetails}
              title={translateData.next}
              backgroundColor={appColors.primary}
              color={appColors.white}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
