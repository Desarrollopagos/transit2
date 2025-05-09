import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paymentsData, purchaseData } from '../../../api/store/action'
import { Button, CustomRadioButton, Header, notificationHelper } from '../../../commonComponents'
import appColors from '../../../theme/appColors'
import styles from './styles'
import { PurchasePlanDataInterface } from '../../../api/interface/walletInterface'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useValues } from '../../../utils/context'
import { windowHeight } from '../chat/context'

export function PaymentSelect() {
  const route = useRoute()
  const { viewRtlStyle, textRtlStyle } = useValues()
  const { planId } = route.params
  const { paymentMethodData } = useSelector(state => state.wallet)
  const activePaymentMethods = paymentMethodData?.data?.filter(
    method => method?.status === true,
  )
  const { zoneValue } = useSelector((state: any) => state.zoneUpdate);
  const { translateData } = useSelector(state => state.setting)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  useEffect(() => {
    dispatch(paymentsData())
  }, [])

  const paymentData = (index: number, name: any) => {
    setSelectedItem(index === selectedItem ? null : index)
    setSelectedPaymentMethod(index === selectedItem ? null : name)
  }

  const purchaPlan = () => {
    let payload: PurchasePlanDataInterface = {
      plan_id: planId,
      payment_method: selectedPaymentMethod,
    }


    dispatch(purchaseData(payload))
      .unwrap()
      .then((res: any) => {
        if (res.is_redirect) {
          notificationHelper('Success', 'Plan purchased successfully!', 'success');
          navigate('PaymentWebView', {
            url: res.url,
            selectedPaymentMethod: selectedPaymentMethod,
          })
        } else {
          notificationHelper('Error', res.message, 'error')
        }
      })
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => paymentData(index, item.slug)} activeOpacity={0.7}>
      <View
        style={[
          styles.modalPaymentView,
          {
            backgroundColor: appColors.graybackground,
            flexDirection: viewRtlStyle,
          },
        ]}
      >
        <View style={{ flexDirection: viewRtlStyle, marginTop: windowHeight(14) }}>
          <View style={styles.imageBg}>
            <Image source={{ uri: item.image }} style={styles.paymentImage} />
          </View>
          <View style={styles.mailInfo}>
            <Text style={[styles.mail, { color: appColors.primaryFont }]}>
              {item.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.payBtn} activeOpacity={0.7}>
          <CustomRadioButton selected={index === selectedItem} />
        </TouchableOpacity>
      </View>
      {index !== 3 ? <View style={styles.borderPayment} /> : null}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Header title={translateData.PaymentTextMethod} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.selectContainer}>
          <Text style={[styles.selectText, { textAlign: textRtlStyle }]}>
            {translateData.selectMethod}
          </Text>
          <FlatList
            data={paymentMethodData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
          />
        </View>
        <View style={styles.payNowContainer}>
          <Button title={translateData.PayNow} backgroundColor={appColors.primary} color={appColors.white} onPress={purchaPlan} />
        </View>
      </ScrollView>
    </View>
  )
}
