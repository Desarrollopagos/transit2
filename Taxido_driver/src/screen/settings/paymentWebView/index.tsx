import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { useDispatch } from 'react-redux'
import { paymentVerify } from '../../../api/store/action'
import { PaymentVerifyInterface } from '../../../api/interface/walletInterface'
import { URL } from '../../../api/config'
import styles from './styles'

export function PaymentWebView({  route }) {
  const [paymentData, setPaymentData] = useState({
    token: null,
    payerID: null,
  })

  const dispatch = useDispatch()

  const handleResponse = async data => {
    const url = data.url
    if (url.includes('token=') && url.includes('PayerID=')) {
      const queryParams = parseQueryParams(url)

      if (queryParams?.token && queryParams?.PayerID) {
        setPaymentData({
          token: queryParams.token,
          payerID: queryParams.PayerID,
        })
        await fetchPaymentData(queryParams.token, queryParams.PayerID)
      }
    }
  }

  const parseQueryParams = url => {
    const params = {}
    const queryString = url.split('?')[1]

    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=')
        params[key] = decodeURIComponent(value)
      })
    }
    return params
  }

  const fetchPaymentData = async (token, payerID) => {
    const fetchUrl = `${URL}/${route.params.selectedPaymentMethod}/status?token=${token}&PayerID=${payerID}`
    try {
      const response = await fetch(fetchUrl)
      const data = await response.json()
      let payload: PaymentVerifyInterface = {
        item_id: data.item_id,
        type: data.type,
        transaction_id: paymentData.payerID,
      }
      dispatch(paymentVerify(payload))
        .unwrap()
        .then(async (res: any) => {})
    } catch (error) {
      console.error('Error fetching payment data:', error)
    }
  }

  return (
    <WebView
      style={styles.modalview}
      startInLoadingState={true}
      incognito={true}
      androidLayerType="hardware"
      cacheEnabled={false}
      cacheMode={'LOAD_NO_CACHE'}
      source={{ uri: route?.params?.url }}
      onNavigationStateChange={data => handleResponse(data)}
    />
  )
}
