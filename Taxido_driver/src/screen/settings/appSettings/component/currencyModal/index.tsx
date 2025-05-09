import React, { useEffect, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { CustomRadioButton } from '../../../../../commonComponents'
import Icons from '../../../../../utils/icons/icons'
import styles from './styles'
import { useValues } from '../../../../../utils/context'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { currencyDataGet } from '../../../../../api/store/action'
import { setValue, getValue } from '../../../../../utils/localstorage'
import { CommonModal } from '../../../../../commonComponents/commonModal'

export function CurrencyModal() {
  const [currencymodalVisible, setCurrencyModalVisible] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(null)

  const { setCurrSymbol, setCurrValue, viewRtlStyle, viewSelfRtlStyle } = useValues()
  const { colors } = useTheme()
  const { translateData, currencyData } = useSelector(state => state.setting)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const storedCurrency = await getValue('selectedCurrency')

        if (storedCurrency) {
          setSelectedCurrency(storedCurrency)
        } else if (currencyData?.data?.length > 0) {
          const defaultCurrency = currencyData.data.find(item => item.code === 'USD') || currencyData.data[0]
          setSelectedCurrency(defaultCurrency.code)
        }
      } catch (error) {
        console.error('Error retrieving selected currency:', error)
      }
    })()
  }, [currencyData])


  const openCurrencyModal = async () => {
    setCurrencyModalVisible(true)
    try {
      const storedCurrency = await getValue('selectedCurrency')
      if (storedCurrency) setSelectedCurrency(storedCurrency)
    } catch (error) {
      console.error('Error retrieving selected currency:', error)
    }
  }

  const closemodel = () => {
    setCurrencyModalVisible(false)
  }

  const closeCurrencyModal = async () => {
    dispatch(currencyDataGet())
    setCurrencyModalVisible(false)
    const selectedOption = currencyData?.data?.find(
      option => option.code === selectedCurrency,
    )

    if (selectedOption) {
      setCurrSymbol(selectedOption.symbol)
      setCurrValue(selectedOption.exchange_rate)
      setSelectedCurrency(selectedOption.code)

      await Promise.all([
        setValue('selectedSymbol', selectedOption.symbol),
        setValue('selectedValue', selectedOption.exchange_rate),
        setValue('selectedCurrency', selectedOption.code),
      ])
    }
  }

  return (
    <View>
      <View style={[styles.border, { borderColor: colors.border }]} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={openCurrencyModal}
        style={[styles.main, { flexDirection: viewRtlStyle }]}
      >
        <View style={[styles.container, { flexDirection: viewRtlStyle }]}>
          <View
            style={[styles.iconView, { backgroundColor: colors.background }]}
          >
            <Icons.Currency color={colors.text} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            {translateData.changeCurrency}
          </Text>
        </View>
        <Icons.NextLarge color={colors.text} />
      </TouchableOpacity>


      <CommonModal
        isVisible={currencymodalVisible}
        closeModal={closeCurrencyModal}
        onPress={closeCurrencyModal}
        value={
          <TouchableWithoutFeedback onPress={closemodel}>
            <View>
              <TouchableWithoutFeedback>
                <View
                  style={{ backgroundColor: colors.card }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}

                    onPress={closeCurrencyModal}
                    style={{ alignSelf: viewSelfRtlStyle }}
                  >
                    <Icons.Close />
                  </TouchableOpacity>
                  <Text style={[styles.modalTitle, { color: colors.text }]}>
                    {translateData.changeCurrency}
                  </Text>
                  {currencyData?.data?.map((item, index) => (
                    <View key={item.code}>
                      <TouchableOpacity
                        style={[
                          styles.modalAlign,
                          { flexDirection: viewRtlStyle },
                        ]}
                        onPress={() => setSelectedCurrency(item.code)}
                      >
                        <View
                          style={[
                            styles.selection,
                            { flexDirection: viewRtlStyle },
                          ]}
                        >
                          <View
                            style={styles.symbolView}
                          >
                            <Text>{item.symbol}</Text>
                          </View>
                          <Text
                            style={[
                              styles.name,
                              {
                                color: colors.text,
                                fontWeight:
                                  selectedCurrency === item.code ? '500' : '300',
                              },
                            ]}
                          >
                            {item.code}
                          </Text>
                        </View>
                        <CustomRadioButton
                          selected={selectedCurrency === item.code}
                        />
                      </TouchableOpacity>
                      {index !== currencyData?.data?.length - 1 && (
                        <View
                          style={[
                            styles.borderBottom,
                            { borderColor: colors.border },
                          ]}
                        />
                      )}
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={closeCurrencyModal}
                    style={styles.buttonView}
                    activeOpacity={0.7}

                  >
                    <Text style={styles.buttonTitle}>{translateData.update}</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        }
      />


    </View>
  )
}


