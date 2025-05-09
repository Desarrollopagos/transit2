import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Header } from '../../commonComponents'
import appColors from '../../theme/appColors'
import { useValues } from '../../utils/context'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { notificationData } from '../../api/store/action'
import styles from './styles'
import { NotificationLoader } from './notificationLoader'
import Images from '../../utils/images/images'

export function Notification() {
  const dispatch = useDispatch()
  const { viewRtlStyle, isDark, textRtlStyle } = useValues()
  const { colors } = useTheme()
  const { notificationList, loading } = useSelector(state => state.notification)
  const { translateData } = useSelector(state => state.setting)

  useEffect(() => {
    dispatch(notificationData())
  }, [])

  const getTimeAgo = timestamp => {
    const createdAt = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now - createdAt) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays} days ago`
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) return `${diffInMonths} months ago`
    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} years ago`
  }
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.mainContainer,
          {
            flexDirection: viewRtlStyle,
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}
      >
        <View style={[styles.iconContainer, { flexDirection: viewRtlStyle }]}>
          {item.icon}
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: isDark ? appColors.white : appColors.primaryFont },
              { textAlign: textRtlStyle },
            ]}
          >
            {item?.data?.title}
          </Text>
          <Text
            style={[
              styles.message,
              { color: isDark ? appColors.white : appColors.primaryFont },
              { textAlign: textRtlStyle },
            ]}
          >
            {item?.data?.message}
          </Text>
          <Text style={[styles.timeText, { textAlign: textRtlStyle }]}>
            {getTimeAgo(item.created_at)}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title={translateData.notification}
        backgroundColor={
          isDark ? appColors.primaryFont : appColors.graybackground
        }
      />
      {loading ? (
        [...Array(4)].map((_, index) => <NotificationLoader key={index} />)
      ) : notificationList?.data?.length > 0 ? (
        <FlatList
          data={notificationList.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Image source={Images.bell} style={styles.noDataImg} />
          <View
            style={[styles.walletContainer, { flexDirection: viewRtlStyle }]}
          >
            <Text
              style={[
                styles.msg,
                { color: isDark ? colors.text : appColors.primaryFont },
              ]}
            >
              {translateData.nothingHere}
            </Text>
          </View>
          <Text style={styles.detail}>
            {translateData.notificationRefresh}{' '}
          </Text>
          <TouchableOpacity style={styles.refreshContainer} activeOpacity={0.7}>
            <Text style={styles.refreshText}>{translateData.refresh}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
