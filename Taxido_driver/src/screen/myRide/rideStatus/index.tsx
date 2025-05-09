import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native'
import { useRideStatusData } from './data'
import appColors from '../../../theme/appColors'
import { styles } from './styles'
import { ActiveRide } from './activeRide/index'
import { PendingRide } from './pendingRide/index'
import { CompletedRide } from './completedRide/index'
import { CancelRide } from './cancelRide/index'
import { useValues } from '../../../utils/context'
import { windowHeight } from '../../../theme/appConstant'
import { useTheme } from '@react-navigation/native'
import { useLoadingContext } from '../../../utils/loadingContext'
import { LoaderStatus } from './loaderStatus'
import { ScheduleRide } from './scheduleRide'

export function RideStatus() {
  const { rtl, isDark } = useValues()
  const [selected, setSelected] = useState(0)
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false)
  const { addressLoaded, setAddressLoaded } = useLoadingContext()
  const rideStatusData = useRideStatusData()

  useEffect(() => {
    if (!addressLoaded) {
      setLoading(true)
      setLoading(false)
      setAddressLoaded(true)
    }
  }, [addressLoaded, setAddressLoaded])

  const renderItem = ({ item }) => {
    return (
      <View>
        <Pressable
          onPress={() => setSelected(item.id)}
          style={[
            styles.container,
            {
              backgroundColor: isDark ? colors.card : appColors.white,
              borderColor: colors.border,
            },
            { left: rtl ? windowHeight(-1) : windowHeight(0.8) },
            item.id === selected ? { borderColor: appColors.primary } : null,
          ]}
        >
          <Text
            style={[
              styles.mediumTextBlack12,
              item.id === selected
                ? { color: appColors.primary }
                : { color: appColors.secondaryFont },
            ]}
          >
            {item?.title}
          </Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.background : appColors.graybackground,
      }}
    >
      {loading ? (
        <LoaderStatus />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderItem}
            data={rideStatusData}
            inverted={rtl}
            contentContainerStyle={{ paddingHorizontal: windowHeight(0.3) }}
          />
        </View>
      )}

      <ScrollView showsHorizontalScrollIndicator={false}>
        {selected === 0 && <ActiveRide />}
        {selected === 1 && <PendingRide />}
        {selected === 2 && <ScheduleRide />}
        {selected === 3 && <CompletedRide />}
        {selected === 4 && <CancelRide />}
      </ScrollView>
    </View>
  )
}
