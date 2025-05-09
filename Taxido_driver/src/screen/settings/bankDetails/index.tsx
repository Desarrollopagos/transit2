import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../auth/registration/bankDetails/styles'
import appColors from '../../../theme/appColors'
import { Header, Input, Button, notificationHelper } from '../../../commonComponents'
import { useNavigation, useTheme } from '@react-navigation/native'
import { TitleView } from '../../auth/component'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import Icons from '../../../utils/icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../api/store'
import { BankDetailsinterface } from '../../../api/interface/accountInterface'
import { selfDriverData, updateBankDetails } from '../../../api/store/action'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function BankDetails() {

  const navigation = useNavigation<navigation>()
  const [showWarning, setShowWarning] = useState(false)
  const { colors } = useTheme()
  const { selfDriver } = useSelector((state: any) => state.account)
  const [formData, setFormData] = useState({
    holdername: '',
    accountnumber: '',
    ifsccode: '',
    bank: '',
    swiftid: '',
    paypalid: ''
  })

  const { translateData } = useSelector(state => state.setting)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {

    if (selfDriver) {
      setFormData({
        holdername: selfDriver?.payment_account.bank_holder_name || '',
        accountnumber: selfDriver?.payment_account.bank_account_no || '',
        ifsccode: selfDriver?.payment_account.ifsc || '',
        bank: selfDriver?.payment_account.bank_name || '',
        swiftid: selfDriver?.payment_account.swift || '',
        paypalid: selfDriver?.payment_account.paypal_email || '',
      })
    }
  }, [selfDriver])

  const handleChange = (key: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  const gotoDocument = () => {
    let payload: BankDetailsinterface = {
      bank_name: formData.bank,
      bank_holder_name: formData.holdername,
      bank_account_no: formData.accountnumber,
      ifsc: formData.ifsccode,
      swift: formData.swiftid,
      paypal_email: formData.paypalid
    };

    dispatch(updateBankDetails(payload))
      .unwrap()
      .then((res: any) => {
        if (!res?.success) {
          setShowWarning(false)
          navigation.goBack()
          notificationHelper(
            'Update',
            translateData.detailsUpdateSuccessfully,
            'success',
          )
          dispatch(selfDriverData());
        } else {
          notificationHelper(
            'Error',
            "Something went wrong.",
            'error',
          )
        }
      });
  }


  return (
    <ScrollView style={[styles.main, { backgroundColor: colors.background }]}>
      <Header title={translateData.bankDetails} />
      <View style={[styles.subView, { backgroundColor: colors.background }]}>
        <View style={styles.inputfildView}>
          <TitleView
            title={translateData.bankDetails}
            subTitle={translateData.registerContent}
          />
          <Input
            titleShow={true}
            title={translateData.holderName}
            placeholder={translateData.enterHolderName}
            value={formData.holdername}
            onChangeText={text => handleChange('holdername', text)}
            showWarning={showWarning && formData.holdername === ''}
            warning={translateData.enterYourholderName}
            backgroundColor={colors.card}
            icon={<Icons.UserName color={appColors.secondaryFont} />}
          />
          <Input
            titleShow={true}
            title={translateData.accountNumber}
            placeholder={translateData.enterAccountNumber}
            keyboardType="default"
            value={formData.accountnumber}
            onChangeText={text => handleChange('accountnumber', text)}
            showWarning={showWarning && formData.accountnumber === ''}
            warning={translateData.enterYouraccountNumber}
            backgroundColor={colors.card}
            icon={<Icons.AccountNo color={appColors.secondaryFont} />}
          />
          <Input
            titleShow={true}
            title={translateData.ifscCode}
            placeholder={translateData.enterIFSCCode}
            value={formData.ifsccode}
            onChangeText={text => handleChange('ifsccode', text)}
            showWarning={showWarning && formData.ifsccode === ''}
            warning={translateData.enterYourifscCode}
            backgroundColor={colors.card}
            icon={<Icons.AccountIFSC color={appColors.secondaryFont} />}
            keyboardType="default"
          />
          <Input
            titleShow={true}
            title={translateData.bankName}
            placeholder={translateData.enterBankName}
            value={formData.bank}
            onChangeText={text => handleChange('bank', text)}
            showWarning={showWarning && formData.bank === ''}
            warning={translateData.enterYorebankName}
            backgroundColor={colors.card}
            icon={<Icons.Bank color={appColors.secondaryFont} />}
          />
          <Input
            titleShow={true}
            title={translateData.bankDetailsSwiftId}
            placeholder={translateData.bankDetailsSwiftIdPlaceHolder}
            value={formData.swiftid}
            onChangeText={text => handleChange('swiftid', text)}
            showWarning={showWarning && formData.swiftid === ''}
            warning={translateData.bankDetailsSwiftIdWarning}
            backgroundColor={colors.card}
            icon={<Icons.Bank color={appColors.secondaryFont} />}
          />
          <Input
            titleShow={true}
            title={translateData.bankDetailsPaypalId}
            placeholder={translateData.bankDetailsEnterPaypalId}
            value={formData.paypalid}
            onChangeText={text => handleChange('paypalid', text)}
            showWarning={showWarning && formData.paypalid === ''}
            warning={translateData.bankDetailsPaypalIdWarning}
            backgroundColor={colors.card}
            icon={<Icons.Bank color={appColors.secondaryFont} />}
          />
        </View>
        <Button
          onPress={gotoDocument}
          title={translateData.update}
          backgroundColor={appColors.primary}
          color={appColors.white}
        />
      </View>
    </ScrollView>
  )
}


