import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text } from 'react-native'
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker'
import appColors from '../../../../theme/appColors'
import { ProgressBar } from '../component'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Header, TitleView } from '../../component'
import renderDocumentUpload from './component'
import styles from '../../registration/documentVerify/styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../navigation/main/types'
import { useValues } from '../../../../utils/context'
import { Button } from '../../../../commonComponents'
import { useDispatch, useSelector } from 'react-redux'
import { documentGet } from '../../../../api/store/action/documentAction'
import { windowHeight } from '../../../../theme/appConstant'

type Navigation = NativeStackNavigationProp<RootStackParamList>

export function DocumentVerify() {
  const { navigate } = useNavigation<Navigation>();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { textRtlStyle, setDocumentDetail, isDark } = useValues();
  const { documentData } = useSelector((state) => state.documents);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    Record<string, DocumentPickerResponse | null>
  >({})
  const [showWarning, setShowWarning] = useState<Record<string, boolean>>({})
  const { translateData } = useSelector(state => state.setting)

  useEffect(() => {
    getDocument()
  }, [])

  const getDocument = () => {
    dispatch(documentGet())
  }

  const gotoDocument = () => {
    let warnings: Record<string, boolean> = {}
    let hasEmptyDocument = false

    documentData?.data?.forEach(doc => {
      if (!uploadedDocuments[doc.slug]) {
        warnings[doc.slug] = true
        hasEmptyDocument = true
      }
    })

    setShowWarning(warnings)
    if (!hasEmptyDocument) {
      setDocumentDetail(uploadedDocuments)
      navigate('VehicleRegistration')
    }
  }

  const handleDocumentUpload = async (documentType: string) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setUploadedDocuments((prevDocs) => ({
        ...prevDocs,
        [documentType]: res,
      }))

      setShowWarning(prevWarnings => ({
        ...prevWarnings,
        [documentType]: false,
      }))
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header backgroundColor={isDark ? colors.card : appColors.white} />
      <ProgressBar fill={2} />
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={[styles.sub, { backgroundColor: colors.background }]}>
          <View style={styles.spaceHorizantal}>
            <TitleView
              title={translateData.documentVerify}
              subTitle={translateData.registerContent}
            />
            <View>
              {documentData?.data?.map((doc) => (
                <View key={doc.id} style={styles.dateContainer}>
                  {renderDocumentUpload(
                    uploadedDocuments,
                    handleDocumentUpload,
                    doc.slug,
                    `Upload ${doc.name}`
                  )}
                  {showWarning[doc.slug] && (
                    <Text
                      style={[
                        styles.titleText,
                        { textAlign: textRtlStyle, color: appColors.red },
                      ]}
                    >
                      {(`${doc.slug} Required`) || "This field is required"}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View style={[styles.buttonView, { marginBottom: windowHeight(1.8) }]}>
            <Button
              onPress={gotoDocument}
              title={translateData.next}
              backgroundColor={appColors.primary}
              color={appColors.white}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
