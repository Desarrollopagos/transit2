import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from '../../../../utils/icons/icons'
import styles from './styles'
import { rideIcons } from '../../homeScreen/data'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useValues } from '../../../../utils/context'
import { RootStackParamList } from '../../../../navigation/main/types'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { windowHeight } from '../../../../theme/appConstant'

interface RenderRideItemProps {
  item: any
  colors: any
}

type navigation = NativeStackNavigationProp<RootStackParamList>

export function RenderRideItem({ item, colors }: RenderRideItemProps) {
  const iconIndex = parseInt(item.id) - 1
  const { viewRtlStyle, textRtlStyle } = useValues()
  const icon = rideIcons[iconIndex]
  const navigation = useNavigation<navigation>()

  const gotoDetail = item => {
    const navigateToScreen = (screen, isValue = 1) => {
      navigation.navigate(screen, { isValue })
    }

    const titleToValueMap = {
      'Total Earning': 1,
      'Pending Rides': 1,
      'Completed Rides': 2,
      'Cancelled Rides': 3,
    }

    const isValue = titleToValueMap[item.title] ?? 1
    navigateToScreen(item.screen, isValue)
  }

  return (
    <TouchableOpacity
      onPress={() => gotoDetail(item)}
      style={styles.main}
      activeOpacity={0.7}
    >
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.card,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <View style={[styles.cardTop, { flexDirection: viewRtlStyle }]}>

            {/* <View>
              <Text style={styles.data}>{item.dashBoardData}</Text>
            </View> */}
            <View>
              {typeof item.dashBoardData !== "undefined" && item.dashBoardData !== null ? (
                <Text style={styles.data}>{item.dashBoardData}</Text>
              ) : (
                <ContentLoader
                  speed={1}
                  width={60}
                  height={20}
                  backgroundColor={colors.background}
                  foregroundColor={colors.card}
                >
                  <Rect x="0" y="0" width={windowHeight(10)} height={windowHeight(5)} />
                </ContentLoader>
              )}
            </View>

            <View
              style={[
                styles.iconContain,
                { backgroundColor: colors.background },
              ]}
            >
              {icon}
            </View>
          </View>
          <View style={[styles.cardBottom, { flexDirection: viewRtlStyle }]}>
            <View>
              <Text
                style={[
                  styles.title,
                  { color: colors.text },
                  { textAlign: textRtlStyle },
                ]}
              >
                {item.title}
              </Text>
            </View>
            <View style={styles.iconSpace}>
              <Icons.Arrow />
            </View>
          </View>
          <View style={styles.bottomBorder} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
