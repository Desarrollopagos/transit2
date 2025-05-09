import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import styles from './styles'
import commanStyle from '../../../style/commanStyles'
import { Payment, Bill } from '../endRide/component'
import { Profile } from './component/profile'
import { Header, Address } from '../../../commonComponents'
import { RateCustomer } from '../rateCustomer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import { useSelector } from 'react-redux'
import { useValues } from '../../../utils/context'
import appColors from '../../../theme/appColors'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function RideDetails() {
  const navigation = useNavigation<navigation>()
  const { colors } = useTheme()
  const { rideGet } = useSelector(state => state.ride)
  const [modalVisible, setModalVisible] = useState(false)
  const { isDark } = useValues()
  const { translateData } = useSelector(state => state.setting)

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate('TabNav')
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    )
    return () => backHandler.remove()
  }, [navigation])

  return (
    <ScrollView style={commanStyle.main} showsVerticalScrollIndicator={false}>
      <Header title={translateData.rideDetails} />
      <View style={[styles.contain, { backgroundColor: colors.background }]}>
        <Profile userDetails={rideGet?.rider} rideDetails={rideGet} />
        <Address rideDetails={rideGet} />
        <View style={styles.spaceTop}>
          <Bill />
        </View>
        <Payment rideDetails={rideGet} />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.review}
        onPress={toggleModal}
      >
        <Text
          style={{
            color: isDark ? appColors.white : appColors.primaryFont,
            textAlign: 'center',
          }}
        >
          {translateData.reviewCustomer}
        </Text>
      </TouchableOpacity>
      <RateCustomer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  )
}
