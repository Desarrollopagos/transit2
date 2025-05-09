import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import images from '../../../../../utils/images/images'
import styles from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/main/types'
import { useValues } from '../../../../../utils/context'
import { useSelector } from 'react-redux'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

interface BalanceTopupProps {
  walletTypedata: number
}

export function BalanceTopup({ walletTypedata }: BalanceTopupProps) {
  const navigation = useNavigation<NavigationProps>()
  const { viewRtlStyle, isDark } = useValues()
  const { translateData } = useSelector(state => state.setting)
  const { zoneValue } = useSelector((state) => state.zoneUpdate)


  const gotoTopUp = () => {
    navigation.navigate('TopupWallet')
  }

  return (
    <View>
      <View style={styles.mainBalance}>
        <Image
          source={isDark ? images.darkWalletBg : images.walletBg}
          style={styles.walletImage}
        />
        <View style={[styles.subBalance, { flexDirection: viewRtlStyle }]}>
          <View style={styles.balanceView}>
            <Text style={styles.balanceTitle}>
              {translateData.totalBalance}
            </Text>
            <Text style={styles.totalBalance}>
              {zoneValue.currency_symbol}
              {isNaN(zoneValue?.exchange_rate * (walletTypedata ?? 0))
                ? '0'
                : (zoneValue?.exchange_rate * (walletTypedata ?? 0)).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={gotoTopUp}
            style={styles.topupBtn}
          >
            <Text style={styles.topupTitle}>{translateData.topupWallet}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dashLine} />
    </View>
  )
}
