import {
  View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Text, Keyboard,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import appColors from '../../../theme/appColors'
import styles from './styles'
import { Button, Header, Input, notificationHelper } from '../../../commonComponents'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useValues } from '../../../utils/context'
import { setValue, getValue } from '../../../utils/localstorage'
import { useDispatch, useSelector } from 'react-redux'
import { CountryPicker } from 'react-native-country-codes-picker'
import { InputBox } from '../../auth/component'
import { selfData } from '../../../api/store/action'
import { ImageContainer } from './imageContainer'
import { URL } from '../../../api/config'
import { windowWidth } from '../../../theme/appConstant'
import { useLoadingContext } from '../../../utils/loadingContext'
import { SkeletonEditProfile } from './skeletonEditProfile'

export function ProfileSetting() {
  const { goBack } = useNavigation()
  const { viewRtlStyle } = useValues()
  const [showWarning, setShowWarning] = useState(false)
  const [emailFormatWarning, setEmailFormatWarning] = useState('')
  const { colors } = useTheme()
  const { isDark, rtl, textRtlStyle } = useValues()
  const { self } = useSelector(state => state.account)
  const [loadingShimmer, setLoadingShimmer] = useState(false)
  const { addressLoaded, setAddressLoaded } = useLoadingContext()
  const { translateData } = useSelector(state => state.setting)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!addressLoaded) {
      setLoadingShimmer(true)
      setLoadingShimmer(false)
      setAddressLoaded(true)
    }
  }, [addressLoaded, setAddressLoaded])

  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    countryCode: '',
  })
  const dispatch = useDispatch()
  const [countryCode, setCountryCode] = useState('+91')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [profileImg, setProfileImage] = useState()

  useEffect(() => {
    if (self) {
      setFormData({
        username: self.name || '',
        phoneNumber: self.phone || '',
        email: self.email || '',
        countryCode: self.country_code || '+91',
      })
    }
  }, [self])

  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    if (newPhoneNumber.length === 10) {
      Keyboard.dismiss()
    }

    setFormData(prevData => ({
      ...prevData,
      phoneNumber: newPhoneNumber,
    }))
    setError('')
  }


  const update = async () => {
    setLoading(true)
    const token = await getValue('token')

    try {
      const updateFormData = new FormData()
      updateFormData.append('name', formData.username)
      updateFormData.append('email', formData.email)
      updateFormData.append('country_code', formData.countryCode)
      updateFormData.append('phone', formData.phoneNumber)
      updateFormData.append('_method', 'PUT')

      if (profileImg) {
        updateFormData.append('profile_image', {
          uri: profileImg.uri,
          type: profileImg.type,
          name: profileImg.fileName,
        })
      }

      const response = await fetch(`${URL}/api/updateProfile`, {
        method: 'POST',
        body: updateFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        notificationHelper('Failed', 'Failed to update profile', 'error')
      }
      dispatch(selfData())
      notificationHelper(
        'Update',
        translateData.profileUpdatedSuccessfully,
        'success',
      )
      goBack()
      if (profileImg) {
        setValue('profile_image_uri', profileImg.uri)
      }
    } catch (error) {
      notificationHelper(
        'Failed',
        'Profile update failed. Please try again.',
        'error',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (key: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }))

    if (key === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        setEmailFormatWarning('Invalid email format')
      } else {
        setEmailFormatWarning('')
      }
    }
  }

  const getData = img => {
    setProfileImage(img)
  }

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
    >
      <Header title={translateData.profileSettings} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.profileView,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {loadingShimmer ? (
            <SkeletonEditProfile />
          ) : (
            <>
              <ImageContainer data={self} storeProfile={getData} />
              <View style={styles.fieldView}>
                <Input
                  title={translateData.userName}
                  titleShow={true}
                  placeholder={translateData.enterUserName}
                  keyboardType="default"
                  value={formData.username}
                  onChangeText={text => handleChange('username', text)}
                  showWarning={showWarning && formData.username === ''}
                  warning={translateData.enterYouruserName}
                  backgroundColor={colors.card}
                />
                <Text
                  style={[
                    styles.mobileNumber,
                    {
                      color: isDark ? appColors.white : appColors.primaryFont,
                      textAlign: textRtlStyle,
                    },
                  ]}
                >
                  {translateData.mobileNumber}
                </Text>
                <View
                  style={[
                    styles.countryContainer,
                    { flexDirection: viewRtlStyle },
                  ]}
                >
                  <View
                    style={[
                      styles.codeComponent,
                      { right: rtl ? windowWidth(2.5) : windowWidth(0) },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setShow(true)}
                      style={[
                        styles.countryCode,
                        {
                          backgroundColor: colors.card,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Text style={styles.dialCode}>
                        {formData.countryCode || countryCode}
                      </Text>
                    </TouchableOpacity>

                    <CountryPicker
                      show={show}
                      pickerButtonOnPress={item => {
                        setCountryCode(item.dial_code)
                        setShow(false)
                      }}
                      style={{
                        modal: {
                          height: 500,
                          backgroundColor: colors.background,
                        },
                        countryName: {
                          color: colors.text,
                        },
                        dialCode: {
                          color: colors.text,
                        },
                        countryButtonStyles: {
                          backgroundColor: colors.card,
                          flexDirection: viewRtlStyle,
                        },
                        textInput: {
                          backgroundColor: colors.card,
                          color: colors.text,
                          textAlign: textRtlStyle,
                        },
                        line: { backgroundColor: colors.border },
                      }}
                      lang={''}
                      flatListProps={{
                        contentContainerStyle: { flexDirection: viewRtlStyle },
                      }}
                    />
                  </View>
                  <InputBox
                    placeholder={translateData.enterPhone}
                    placeholderTextColor={
                      isDark ? appColors.darkText : appColors.secondaryFont
                    }
                    value={String(formData.phoneNumber)}
                    onChangeText={handlePhoneNumberChange}
                    keyboardType={'phone-pad'}
                    backgroundColors={colors.card}
                    backgroundColor={appColors.white}
                  />
                </View>
                <View style={styles.emailContainer}>
                  <Input
                    backgroundColor={colors.card}
                    titleShow={true}
                    title={translateData.email}
                    placeholder={translateData.enterEmail}
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={text => handleChange('email', text)}
                    showWarning={
                      showWarning &&
                      (formData.email === '' || emailFormatWarning !== '')
                    }
                    warning={
                      emailFormatWarning !== ''
                        ? `${translateData.enterYouremail}`
                        : `${translateData.emailVerify}`
                    }
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      {!loadingShimmer && (
        <View style={styles.updateBtn}>
          <Button
            title={translateData.updateProfile}
            backgroundColor={appColors.primary}
            color={appColors.white}
            onPress={update}
            loading={loading}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  )
}
