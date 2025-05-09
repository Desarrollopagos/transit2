import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import appColors from '../../../../theme/appColors'
import { ProgressBar } from '../component'
import { Input, Button, notificationHelper } from '../../../../commonComponents'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Header, TitleView } from '../../component'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../navigation/main/types'
import { useValues } from '../../../../utils/context'
import { setValue } from '../../../../utils/localstorage/index'
import { useSelector } from 'react-redux'
import { URL } from '../../../../api/config'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function BankDetail() {
  const navigation = useNavigation<navigation>()
  const [showWarning, setShowWarning] = useState(false)
  const [loading, setLoading] = useState(false)

  const { colors } = useTheme()
  const { accountDetail, documentDetail, vehicleDetail, setToken, isDark } =
    useValues()
  const [formDatas, setFormData] = useState({
    holdername: '',
    accountnumber: '',
    ifsecode: '',
    bank: '',
    swift: '',
    paypalID: '',
  })
  const { translateData } = useSelector(state => state.setting)

  const handleChange = (key: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  const gotoDocument = () => {
    const isFormValid = Object.values(formDatas).every(
      value => value.trim() !== '',
    )

    if (!isFormValid) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
      handleRegister()
    }
  }

  const handleRegister = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', accountDetail.username);
      formData.append('name', accountDetail.name);
      formData.append('email', accountDetail.email);
      formData.append('country_code', accountDetail.countryCode);
      formData.append('phone', accountDetail.phoneNumber);
      formData.append('password', accountDetail.password);
      formData.append('password_confirmation', accountDetail.confirmPassword);
      formData.append('ambulance[name]', vehicleDetail.ambulanceName);
      formData.append('ambulance[description]', vehicleDetail.ambulanceDescription);
      formData.append('service_id', vehicleDetail.serviceName);
      formData.append('payment_account[bank_name]', formDatas.bank);
      formData.append('payment_account[bank_holder_name]', formDatas.holdername);
      formData.append('payment_account[bank_account_no]', formDatas.accountnumber);
      formData.append('payment_account[swift]', formDatas.swift);
      formData.append('payment_account[ifsc]', formDatas.ifsecode);
      formData.append('payment_account[paypal_email]', formDatas.paypalID);

      Object.keys(documentDetail).forEach((key, index) => {
        const doc = documentDetail[key][0];
        if (doc) {
          formData.append(`documents[${index}][file]`, {
            uri: doc.uri,
            type: doc.type,
            name: doc.name,
            size: doc.size || null,
            fileCopyUri: doc.fileCopyUri || null,
          });
          formData.append(`documents[${index}][slug]`, key);
        }
      });

      const response = await fetch(`${URL}/api/driver/register`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });


      if (response.ok) {
        const data = await response.json();
        setValue('token', data.access_token);
        setToken(data.access_token);
        notificationHelper('Success', 'Register Successfully', 'success');
        navigation.replace('TabNav');
      } else {
        const errorData = await response.json();
        notificationHelper('Error', errorData.message, 'error');
      }
    } catch (error) {
      notificationHelper('Error', 'Something went wrong, please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header backgroundColor={isDark ? colors.card : appColors.white} />
      <ProgressBar fill={4} />
      <ScrollView
        style={[styles.main, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.subView, { backgroundColor: colors.background }]}>
          <View style={styles.inputfildView}>
            <TitleView
              title={translateData.bankDetails}
              subTitle={translateData.registerContent}
            />
            <Input
              title={translateData.holderName}
              titleShow={true}
              backgroundColor={
                isDark ? appColors.darkThemeSub : appColors.white
              }
              placeholder={translateData.enterHolderName}
              value={formDatas.holdername}
              onChangeText={text => handleChange('holdername', text)}
              showWarning={showWarning && formDatas.holdername === ''}
              warning={translateData.enterYourholderName}
              keyboardType="default"
            />
            <View style={styles.accNumber}>
              <Input
                title={translateData.accountNumber}
                titleShow={true}
                backgroundColor={
                  isDark ? appColors.darkThemeSub : appColors.white
                }
                placeholder={translateData.enterAccountNumber}
                keyboardType="number-pad"
                value={formDatas.accountnumber}
                onChangeText={text => handleChange('accountnumber', text)}
                showWarning={showWarning && formDatas.accountnumber === ''}
                warning={translateData.enterYouraccountNumber}
                backgroundColor={
                  isDark ? appColors.darkThemeSub : appColors.white
                }
              />
            </View>
            <View style={styles.code}>
              <Input
                title={translateData.ifscCode}
                titleShow={true}
                placeholder={translateData.enterIFSCCode}
                value={formDatas.ifsecode}
                onChangeText={text => handleChange('ifsecode', text)}
                showWarning={showWarning && formDatas.ifsecode === ''}
                warning={translateData.enterYourifscCode}
                backgroundColor={
                  isDark ? appColors.darkThemeSub : appColors.white
                }
                keyboardType="default"
              />
            </View>
            <View style={styles.bank}>
              <Input
                title={translateData.bankName}
                titleShow={true}
                placeholder={translateData.enterBankName}
                value={formDatas.bank}
                onChangeText={text => handleChange('bank', text)}
                showWarning={showWarning && formDatas.bank === ''}
                warning={translateData.enterYorebankName}
                backgroundColor={
                  isDark ? appColors.darkThemeSub : appColors.white
                }
                keyboardType="default"
              />
            </View>
            <View style={styles.swiftCode}>
              <Input
                title={translateData.swiftCode}
                titleShow={true}
                placeholder={translateData.enterSwiftCode}
                value={formDatas.swift}
                onChangeText={text => handleChange('swift', text)}
                showWarning={showWarning && formDatas.swift === ''}
                warning={translateData.enterYourSwift}
                backgroundColor={
                  isDark ? appColors.darkThemeSub : appColors.white
                }
                keyboardType="default"
              />
            </View>
            <View style={styles.payPal}>
              <Input
                title={translateData.paypalID}
                titleShow={true}
                placeholder={translateData.enterpaypalID}
                value={formDatas.paypalID}
                onChangeText={text => handleChange('paypalID', text)}
                showWarning={showWarning && formDatas.paypalID === ''}
                warning={translateData.enterYourbranchName}
                backgroundColor={
                  isDark ? appColors.darkThemeSub : appColors.white
                }
                keyboardType="default"
              />
            </View>
          </View>

          <View style={styles.buttonView1}>
            <Button
              onPress={gotoDocument}
              title={translateData.register}
              backgroundColor={appColors.primary}
              color={appColors.white}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
