import { View, Text } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { ListItem } from '../listItem'
import Icons from '../../../../../utils/icons/icons'
import styles from './styles'
import appColors from '../../../../../theme/appColors'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/main/types'
import { useValues } from '../../../../../utils/context'
import { useLoadingContext } from '../../../../../utils/loadingContext'
import { SkeletonAppPage } from '../../../appSettings/component'
import { windowHeight } from '../../../chat/context'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { windowWidth } from '../../../../../theme/appConstant'
import { useSelector } from 'react-redux'
import { settingDataGet } from '../../../../../api/store/action'

type Navigation = NativeStackNavigationProp<RootStackParamList>

export function RegistrationDetails() {
  const navigation = useNavigation<Navigation>()
  const { colors } = useTheme()
  const { textRtlStyle, isDark } = useValues()
  const { addressLoaded, setAddressLoaded } = useLoadingContext()
  const { translateData } = useSelector(state => state.setting)

  const [loading, setLoading] = useState(!addressLoaded)

  useEffect(() => {
    const fetchAddressData = async () => {
      if (!addressLoaded) {
        setLoading(true)
        await settingDataGet()
        setLoading(false)
        setAddressLoaded(true)
      }
    }

    fetchAddressData()
  }, [addressLoaded, setAddressLoaded])

  const skeletonTitle = useCallback(
    () => (
      <ContentLoader
        speed={1}
        width={windowWidth(40)}
        height={windowHeight(18)}
        backgroundColor={isDark ? appColors.bgDark : appColors.loaderBackground}
        foregroundColor={
          isDark ? appColors.darkThemeSub : appColors.loaderLightHighlight
        }
      >
        <Rect
          x="0"
          y="0"
          width={windowWidth(40)}
          height={windowHeight(15)}
          rx={0}
          ry={0}
        />
      </ContentLoader>
    ),
    [isDark],
  )

  const menuItems = useMemo(
    () => [
      {
        icon: Icons.DocumentSetting,
        text: translateData.documentRegistration,
        route: 'DocumentDetail',
      },
      {
        icon: Icons.vehicleSetting,
        text: translateData.vehicleRegistration,
        route: 'VehicleDetail',
      },
      {
        icon: Icons.Bank,
        text: translateData.bankDetails,
        route: 'BankDetails',
      },
    ],
    [translateData],
  )

  return (
    <View>
      {loading ? (
        skeletonTitle()
      ) : (
        <Text
          style={[
            styles.title,
            { color: colors.text, textAlign: textRtlStyle },
          ]}
        >
          {translateData.registrationDetails}
        </Text>
      )}
      <View
        style={[
          styles.listView,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <View key={index}>
                <SkeletonAppPage />
                {index !== 2 && (
                  <View
                    style={[
                      styles.border,
                      {
                        borderColor: isDark
                          ? appColors.darkborder
                          : appColors.border,
                      },
                    ]}
                  />
                )}
              </View>
            ))
          : menuItems.map(({ icon: Icon, text, route }, index) => (
              <React.Fragment key={route}>
                <ListItem
                  icon={<Icon color={colors.text} />}
                  text={text}
                  backgroundColor={
                    isDark ? colors.background : appColors.graybackground
                  }
                  color={isDark ? appColors.white : appColors.primaryFont}
                  showNextIcon
                  onPress={() => navigation.navigate(route)}
                />
                {index !== menuItems.length - 1 && (
                  <View
                    style={[styles.border, { borderColor: colors.border }]}
                  />
                )}
              </React.Fragment>
            ))}
      </View>
    </View>
  )
}
