import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu'
import { BalanceTopup, List, Selection } from './component/'
import { Header } from '../../../commonComponents'
import { useTheme } from '@react-navigation/native'
import { withdrawRequestData } from '../../../api/store/action/walletActions'
import Images from '../../../utils/images/images'
import appColors from '../../../theme/appColors'
import Icons from '../../../utils/icons/icons'
import commonStyles from '../../../style/commanStyles'
const { Popover } = renderers
import styles from './styles'
import { useValues } from '../../../utils/context'
import { SkeletonWallet } from './component/List/skeletonWallet'

export function MyWallet() {
  const { viewRtlStyle, isDark, textRtlStyle } = useValues()
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const { walletTypedata, statusCode, withdrawRequestValue } = useSelector(
    state => state.wallet,
  )
  const { translateData } = useSelector(state => state.setting)
  const { zoneValue } = useSelector((state) => state.zoneUpdate)
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      dispatch(withdrawRequestData())
      setLoading(false)
    }
    fetchData()
  }, [dispatch])

  const refresh = async () => {
    setLoading(true)
    setLoading(false)
  }

  const handleButtonPress = index => setActiveTab(index)

  const renderItem = useCallback(
    ({ item }) => (
      <View
        style={[
          styles.listItem,
          {
            flexDirection: viewRtlStyle,
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.leftSection}>
          <Text style={[styles.dateText, { textAlign: textRtlStyle }]}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
          <Text
            style={[
              styles.paymentTypeText,
              { color: colors.text, textAlign: textRtlStyle },
            ]}
          >
            {item.payment_type.charAt(0).toUpperCase() +
              item.payment_type.slice(1)}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text
            style={[
              styles.amountText,
              { color: isDark ? appColors.white : appColors.primaryFont },
            ]}
          >
            {zoneValue.currency_symbol}
            {(zoneValue?.exchange_rate * item.amount).toFixed(2)}
          </Text>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === 'rejected' ? appColors.red : appColors.price,
              },
            ]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    ),
    [colors, isDark, viewRtlStyle, textRtlStyle],
  )

  const renderEmptyState = () => (
    <View style={styles.noDataContainer}>
      <Image source={Images.noDataWallet} style={styles.noDataImg} />
      <View style={[styles.walletContainer, { flexDirection: viewRtlStyle }]}>
        <Text
          style={[
            styles.msg,
            { color: isDark ? colors.text : appColors.primaryFont },
          ]}
        >
          {translateData.walletBalanceEmpty}
        </Text>
        <Menu
          renderer={Popover}
          rendererProps={{
            preferredPlacement: 'bottom',
            triangleStyle: styles.triangleStyle,
          }}
        >
          <MenuTrigger style={styles.menuTrigger}>
            <Icons.Info />
          </MenuTrigger>
          <MenuOptions
            customStyles={{ optionsContainer: commonStyles.popupContainer }}
          >
            <Text
              style={commonStyles.popupText}
            >{`${translateData.statusCode} ${statusCode}`}</Text>
          </MenuOptions>
        </Menu>
      </View>
      <Text style={styles.detail}>{translateData.clickrefresh}</Text>
      <TouchableOpacity
        onPress={refresh}
        style={styles.refreshContainer}
        activeOpacity={0.7}
      >
        <Text style={styles.refreshText}>{translateData.refresh}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={[styles.main, { backgroundColor: colors.background }]}>
      <Header title={translateData.myWallet} />
      <BalanceTopup walletTypedata={walletTypedata?.balance} />
      <Selection onButtonPress={handleButtonPress} />

      {loading ? (
        <SkeletonWallet />
      ) : activeTab === 0 ? (
        walletTypedata?.histories?.data?.length > 0 ? (
          <List walletTypedata={walletTypedata?.histories?.data} />
        ) : (
          renderEmptyState()
        )
      ) : activeTab === 1 ? (
        withdrawRequestValue?.data?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={withdrawRequestValue?.data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
          />
        ) : (
          renderEmptyState()
        )
      ) : null}
    </View>
  )
}
