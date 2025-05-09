import React, { useState, useEffect } from 'react'
import { TouchableWithoutFeedback, View, Text, Image, TouchableOpacity } from 'react-native'
import { CustomRadioButton } from '../../../../../commonComponents'
import Icons from '../../../../../utils/icons/icons'
import styles from '../currencyModal/styles'
import { useTheme } from '@react-navigation/native'
import { useValues } from '../../../../../utils/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { translateDataGet } from '../../../../../api/store/action'
import appColors from '../../../../../theme/appColors'
import { CommonModal } from '../../../../../commonComponents/commonModal'

export function LanguageModal() {
  const { colors } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const { viewRtlStyle, setRtl, viewSelfRtlStyle } = useValues()
  const { translateData, languageData } = useSelector(state => state.setting)
  const dispatch = useDispatch()

  useEffect(() => {
    ; (async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage')
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage)
          setRtl(storedLanguage === 'ar')
        }
      } catch (error) {
        console.error('Error retrieving selected language:', error)
      }
    })()
  }, [])

  const openModal = () => setModalVisible(true)

  const closelanModel = () => {
    setModalVisible(false)
  }

  const closeModal = async () => {
    setModalVisible(false)
    await AsyncStorage.setItem('selectedLanguage', selectedLanguage)
    setRtl(selectedLanguage === 'ar')
    dispatch(translateDataGet())
  }

  return (
    <View>
      <View style={[styles.border, { borderColor: colors.border }]} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={openModal}
        style={[styles.main, { flexDirection: viewRtlStyle }]}
      >
        <View style={[styles.container, { flexDirection: viewRtlStyle }]}>
          <View
            style={[styles.iconView, { backgroundColor: colors.background }]}
          >
            <Icons.Language color={colors.text} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            {translateData.changeLanguage}
          </Text>
        </View>
        <Icons.NextLarge color={appColors.iconColor} />
      </TouchableOpacity>

      <CommonModal
        transparent={true}
        isVisible={modalVisible}
        closeModal={closeModal}
        onPress={closeModal}
        value={
          <TouchableWithoutFeedback onPress={closelanModel}>

            <TouchableWithoutFeedback>
              <View
                style={{ backgroundColor: colors.card }}
              >
                <TouchableOpacity
                  onPress={closeModal}
                  style={{ alignSelf: viewSelfRtlStyle }}
                  activeOpacity={0.7}

                >
                  <Icons.Close />
                </TouchableOpacity>

                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {translateData.changeLanguage}
                </Text>

                {languageData?.data?.map(item => (
                  <View key={item.locale}>
                    <TouchableOpacity
                      style={[
                        styles.modalAlign,
                        { flexDirection: viewRtlStyle },
                      ]}
                      onPress={() => setSelectedLanguage(item.locale)}
                    >
                      <View
                        style={[
                          styles.selection,
                          { flexDirection: viewRtlStyle },
                        ]}
                      >
                        <Image
                          source={{ uri: item.flag }}
                          style={styles.imageCountry}
                        />
                        <Text
                          style={[
                            styles.name,
                            {
                              color: colors.text,
                              fontWeight:
                                selectedLanguage === item.locale
                                  ? '500'
                                  : '300',
                            },
                          ]}
                        >
                          {item.name.toLowerCase()}
                        </Text>
                      </View>
                      <CustomRadioButton
                        selected={selectedLanguage === item.locale}
                      />
                    </TouchableOpacity>
                    <View
                      style={[
                        styles.borderBottom,
                        { borderColor: colors.border },
                      ]}
                    />
                  </View>
                ))}

                <TouchableOpacity
                  activeOpacity={0.7}

                  onPress={closeModal}
                  style={styles.buttonView}
                >
                  <Text style={styles.buttonTitle}>{translateData.update}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableWithoutFeedback>
        }
      />
    </View>
  )
}
