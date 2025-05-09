import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import Icons from '../../../../../utils/icons/icons'
import styles from './styles'
import UploadedDocuments from '../types'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { useTheme } from '@react-navigation/native'
import appColors from '../../../../../theme/appColors'

const renderDocumentUpload = (
  uploadedDocuments: UploadedDocuments,
  handleDocumentUpload: (documentType: keyof UploadedDocuments) => void,
  documentType: keyof UploadedDocuments,
  label: string,
) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => handleDocumentUpload(documentType)}
    >
      {uploadedDocuments[documentType] &&
        Array.isArray(uploadedDocuments[documentType]) ? (
        (
          uploadedDocuments[documentType] as unknown as DocumentPickerResponse[]
        )?.map((document, index) => (
          <Image
            key={index}
            source={{ uri: document.uri }}
            style={[styles.innerContainerImage, { borderColor: colors.border }]}
          />
        ))
      ) : (
        <View style={[styles.innerContainer, { borderColor: colors.border }]}>
          <View style={styles.download}>
            <Icons.Download color={appColors.secondaryFont} />
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default renderDocumentUpload
