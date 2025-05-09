import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../../../../../utils/images/images'
import Icons from '../../../../../utils/icons/icons'
import styles from './styles'
import { useTheme } from '@react-navigation/native'
import { useValues } from '../../../../../utils/context'
import { useSelector } from 'react-redux'

export function Review() {
  const { colors } = useTheme()
  const { viewRtlStyle, textRtlStyle } = useValues()
  const { translateData } = useSelector(state => state.setting)

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{translateData.customerRatingReviews}</Text>
      {/* {reviews?.map((review, index) => (
                <View key={index} style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card }]}>
                    <View style={[styles.alignment, { flexDirection: viewRtlStyle }]}>
                        <View style={{ flexDirection: viewRtlStyle }}>
                            <Image source={images.customer} style={styles.imageCustomer} />
                            <Text style={[styles.name, { color: colors.text }]}>{t(review.name)}</Text>
                        </View>
                        <View style={[styles.ratingView,{flexDirection:viewRtlStyle}]}>
                            <View style={styles.starIcon}>
                                <Icons.Star />
                            </View>
                            <Text style={[styles.rating, { color: colors.text }]}>{review.rating}</Text>
                        </View>
                    </View>
                    <Text style={[styles.review, { color: colors.text, textAlign: textRtlStyle }]}>{review.review}</Text>
                </View>
            ))} */}
    </View>
  )
}
