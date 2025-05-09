import React from 'react'
import { View } from 'react-native'
import { AddTopUp } from './component/'
import { Header } from '../../../commonComponents'
import styles from './styles'
import { useSelector } from 'react-redux'

export function TopupWallet() {
  const { translateData } = useSelector(state => state.setting)

  return (
    <View style={styles.main}>
      <Header title={translateData.topupWallet} />
      <View style={styles.listView}>
        <AddTopUp />
      </View>
    </View>
  )
}
