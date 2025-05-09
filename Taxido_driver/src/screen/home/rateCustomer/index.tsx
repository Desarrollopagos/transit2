import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import appColors from '../../../theme/appColors'
import Icons from '../../../utils/icons/icons'
import styles from './styles'
import { Button } from '../../../commonComponents'
import { useTheme } from '@react-navigation/native'
import { useValues } from '../../../utils/context'
import { userReview } from '../../../api/store/action'
import { useDispatch, useSelector } from 'react-redux'
import { ReviewInterface } from '../../../api/interface/reviewInterface'

interface TestProps {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export function RateCustomer({ modalVisible, setModalVisible }: TestProps) {
  const [rating, setRating] = useState<number>(0)
  const [reviewText, setReviewText] = useState<string>('')
  const { colors } = useTheme()
  const { viewRtlStyle, textRtlStyle, viewSelfRtlStyle, isDark } = useValues()
  const dispatch = useDispatch()
  const { rideGet } = useSelector(state => state.ride)
  const { translateData } = useSelector(state => state.setting)

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const callfunction = () => {
    setModalVisible(false)

    let payload: ReviewInterface = {
      ride_id: rideGet.id,
      rating: rating,
      description: 'review is hear',
    }

    dispatch(userReview(payload))
      .unwrap()
      .then((res: any) => { })
  }

  return (
    <View style={styles.main}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.modelbackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.model, { backgroundColor: colors.card }]}>
            <View style={styles.space}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.closeIcon, { alignSelf: viewSelfRtlStyle }]}
                onPress={() => setModalVisible(false)}
              >
                <Icons.Close />
              </TouchableOpacity>
              <Text
                style={[
                  styles.title,
                  { color: isDark ? appColors.white : appColors.primaryFont },
                ]}
              >
                {translateData.rateaCustomer}
              </Text>
              <View
                style={[
                  styles.container,
                  { flexDirection: viewRtlStyle },
                  { borderColor: colors.border },
                ]}
              >
                {[1, 2, 3, 4, 5]?.map(index => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={index}
                    onPress={() => handleStarPress(index)}
                    style={styles.starIcon}
                  >
                    {index <= rating ? <Icons.StarFill /> : <Icons.StarEmpty />}
                  </TouchableOpacity>
                ))}

                <View
                  style={[styles.ratingView, { flexDirection: viewRtlStyle }]}
                >
                  <View
                    style={[
                      styles.borderVertical,
                      { borderColor: colors.border },
                    ]}
                  />
                  <Text
                    style={[
                      styles.rating,
                      {
                        color: isDark ? appColors.white : appColors.primaryFont,
                      },
                    ]}
                  >
                    {rating}/5
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.border, { borderColor: colors.border }]} />
            <View style={styles.space}>
              <Text
                style={[
                  styles.message,
                  { color: colors.text, textAlign: textRtlStyle },
                ]}
              >
                {translateData.customMessage}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: isDark ? appColors.white : appColors.primaryFont,
                    textAlign: textRtlStyle,
                  },
                ]}
                placeholder={translateData.writeHere}
                placeholderTextColor={appColors.secondaryFont}
                multiline={true}
                numberOfLines={2}
              />
            </View>
            <Button
              title={translateData.submit}
              color={appColors.white}
              backgroundColor={appColors.primary}
              onPress={callfunction}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
