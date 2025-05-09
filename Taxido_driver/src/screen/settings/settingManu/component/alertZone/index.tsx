import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icons from '../../../../../utils/icons/icons'
import { ListItem } from '../'
import appColors from '../../../../../theme/appColors'
import { useValues } from '../../../../../utils/context'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { clearValue } from '../../../../../utils/localstorage'
import { resetState } from '../../../../../api/store/reducers'
import { deleteProfile, settingDataGet } from '../../../../../api/store/action'
import styles from './styles'
import { fontSizes, windowHeight } from '../../../../../theme/appConstant'
import { notificationHelper } from '../../../../../commonComponents'
import appFonts from '../../../../../theme/appFonts'
import { CommonModal } from '../../../../../commonComponents/commonModal'

export function AlertZone() {
  const { textRtlStyle, viewRtlStyle } = useValues()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const { settingData, translateData } = useSelector(state => state.setting)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible1, setModalVisible1] = useState(false)


  const deleteAccount = () => {
    notificationHelper(
      'Delete Account',
      'Account Deleted Successfully',
      'error',
    )
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
    clearValue()
    dispatch(deleteProfile())
    dispatch(settingDataGet())

  }

  const gotoLogout = () => {
    notificationHelper('Logout', 'Logged Out Successfully', 'error')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
    clearValue()
    dispatch(resetState())
    dispatch(settingDataGet())


  }

  return (
    <View style={[styles.main, { backgroundColor: appColors.white }]}>
      <Text style={[styles.title, { textAlign: textRtlStyle, marginVertical: windowHeight(2) }]}>
        {translateData.alertZone}
      </Text>
      <View style={{ bottom: windowHeight(1.8) }}>
        <ListItem
          icon={<Icons.Delete />}
          text={translateData.deleteAccount}
          backgroundColor={appColors.alertIconBg}
          color={appColors.red}
          onPress={() => setModalVisible(true)}
        />
        <View
          style={[styles.border, { borderColor: appColors.alertBorder }]}
        />
        <ListItem
          icon={<Icons.Logout />}
          text={translateData.logout}
          backgroundColor={appColors.alertIconBg}
          color={appColors.red}
          onPress={() => setModalVisible1(true)}
        />
      </View>
      <CommonModal
        isVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
        value={
          <View style={{ backgroundColor: colors.card }}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                  textAlign: 'center',
                  width: '65%',
                  alignSelf: 'center',
                },
              ]}
            >
              {translateData.deleteAccountConfirm ||
                'Are you sure you want to delete your account?'}
            </Text>

            <View style={[styles.modelButton, { flexDirection: viewRtlStyle }]}>
              <TouchableOpacity
                activeOpacity={0.7}

                style={[
                  styles.cancelButton,
                  { backgroundColor: appColors.graybackground },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{
                    color: colors.text,
                    textAlign: 'center',
                    top: windowHeight(1.7),
                    fontFamily: appFonts.medium,
                    fontSize: fontSizes.FONT4,
                  }}
                >
                  {translateData.cancel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}

                style={[
                  styles.cancelButton,
                  { backgroundColor: appColors.red },
                ]}
                onPress={deleteAccount}
              >
                <Text
                  style={{
                    color: appColors.white,
                    textAlign: 'center',
                    top: windowHeight(1.7),
                    fontFamily: appFonts.medium,
                    fontSize: fontSizes.FONT4,
                  }}
                >
                  {translateData.delete}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        }
      />
      <CommonModal
        isVisible={modalVisible1}
        closeModal={() => setModalVisible1(false)}
        onPress={() => setModalVisible1(false)}
        value={
          <View style={{ backgroundColor: colors.card }}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                  textAlign: 'center',
                  width: '65%',
                  alignSelf: 'center',
                },
              ]}
            >
              {translateData.logoutConfirm}
            </Text>
            <View style={[styles.modelButton, { flexDirection: viewRtlStyle }]}>
              <TouchableOpacity
                activeOpacity={0.7}

                style={[
                  styles.cancelButton,
                  { backgroundColor: appColors.graybackground },
                ]}
                onPress={() => setModalVisible1(false)}
              >
                <Text
                  style={{
                    color: colors.text,
                    textAlign: 'center',
                    top: windowHeight(1.7),
                    fontFamily: appFonts.medium,
                    fontSize: fontSizes.FONT4,
                  }}
                >
                  {translateData.cancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}

                style={[
                  styles.cancelButton,
                  { backgroundColor: appColors.red },
                ]}
                onPress={gotoLogout}
              >
                <Text
                  style={{
                    color: appColors.white,
                    textAlign: 'center',
                    top: windowHeight(1.7),
                    fontFamily: appFonts.medium,
                    fontSize: fontSizes.FONT4,
                  }}
                >
                  {translateData.logout}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  )
}
