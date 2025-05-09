import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import appColors from '../../../theme/appColors'
import { useNavigation, useTheme } from '@react-navigation/native'
import { TitleView } from '../../auth/component'
import styles from '../../auth/registration/documentVerify/styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import { Header, Button, notificationHelper } from '../../../commonComponents'
import { useDispatch, useSelector } from 'react-redux'
import { selfDriverData, documentGet } from '../../../api/store/action'
import documentstyles from './styles'
import Icons from '../../../utils/icons/icons'
import { URL } from '../../../api/config'

type ProfileScreenProps = NativeStackNavigationProp<RootStackParamList>

export function DocumentDetail() {
  const { colors } = useTheme()
  const { goBack } = useNavigation<ProfileScreenProps>()
  const dispatch = useDispatch()
  const { selfDriver } = useSelector(state => state.account)
  const { documentData } = useSelector(state => state.documents)
  const { translateData } = useSelector((state) => state.setting)

  const [uploadedDocuments, setUploadedDocuments] = useState<{ [slug: string]: DocumentPickerResponse | null }>({})
  const [showWarning, setShowWarning] = useState<{ [slug: string]: boolean }>({})
  const [documentLoad, setDocumentLoad] = useState(false);

  useEffect(() => {
    dispatch(selfDriverData())
    dispatch(documentGet())
  }, [])

  useEffect(() => {
    if (selfDriver?.documents && documentData?.data?.length) {
      const newUploadedDocuments: { [slug: string]: DocumentPickerResponse | null } = {}

      documentData.data.forEach((doc) => {
        const matched = selfDriver?.documents.find(d => d.document_id === doc.id)
        newUploadedDocuments[doc.slug] = matched
          ? {
            uri: matched.document_image?.original_url || '',
            name: matched.document_no || '',
            type: 'image/jpeg',
          }
          : null
      })

      setUploadedDocuments(newUploadedDocuments)
    }
  }, [selfDriver, documentData])

  const handleDocumentPick = async (slug: string) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })

      const selectedFile = Array.isArray(res) ? res[0] : res
      setUploadedDocuments((prev) => ({ ...prev, [slug]: selectedFile }))
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Document pick error', err)
      }
    }
  }

  const gotoDocument = async () => {
    setDocumentLoad(true)
    const newWarnings: { [slug: string]: boolean } = {}
    const token = await getValue('token')
    const language = await getValue('selectedLanguage')
    const defultLng = await getValue('defaultLanguage')
    const defultLngValue = language || defultLng

    documentData?.data?.forEach((doc) => {
      if (!uploadedDocuments[doc.slug]) {
        newWarnings[doc.slug] = true
      }
    })

    if (Object.keys(newWarnings).length > 0) {
      setShowWarning(newWarnings)
    } else {
      setShowWarning({})
      const formData = new FormData()

      Object.entries(uploadedDocuments).forEach(([slug, file], index) => {
        if (file) {
          formData.append(`documents[${index}][slug]`, slug)
          formData.append(`documents[${index}][file]`, {
            uri: file.uri,
            type: file.type,
            name: file.name,
          })
        }
      })

      const response = await fetch(`${URL}/api/update/document`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Accept-Lang': defultLngValue,
        },
      });

      const rawText = await response.text();

      if (!response.ok) {
        console.error('HTTP error! Status:', response.status);
        return;
      }

      const responseData = JSON.parse(rawText);
      setDocumentLoad(false)
      goBack()
      notificationHelper('Update', translateData.detailsUpdateSuccessfully, 'success')
    }
  }


  return (
    <View style={documentstyles.container}>
      <Header title={translateData.documentRegistration} />
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={[styles.sub, { backgroundColor: colors.background }]}>
          <View style={[styles.spaceHorizantal]}>
            <TitleView
              title={translateData.documentVerify}
              subTitle={translateData.registerContent}
            />
            <View>
              {documentData?.data?.map((doc) => {
                const picked = uploadedDocuments[doc.slug]
                return (
                  <View key={doc.id} style={{ marginVertical: 10 }}>
                    <Text style={documentstyles.docName}>{doc.name}</Text>

                    <TouchableOpacity onPress={() => handleDocumentPick(doc.slug)}>
                      {picked?.uri ? (
                        <Image
                          source={{ uri: picked.uri }}
                          style={documentstyles.uri}
                        />
                      ) : (
                        <View style={documentstyles.downloadMainView}>
                          <View style={documentstyles.downloadView}>
                            <Text style={documentstyles.imageText}>{translateData.SelectText} {doc.name} {translateData.ImageText}</Text>
                            <Icons.Download color={appColors.secondaryFont} />
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>

                    {showWarning[doc.slug] && (
                      <Text style={documentstyles.fieldrequired}>
                        {`${doc.name} ${translateData.fieldrequired}`}
                      </Text>
                    )}
                  </View>
                )
              })}
            </View>
          </View>

          <View style={styles.buttonView}>
            <Button
              onPress={gotoDocument}
              title={translateData.update}
              backgroundColor={appColors.primary}
              color={appColors.white}
              loading={documentLoad}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
