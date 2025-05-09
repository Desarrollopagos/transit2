import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Image,
} from 'react-native'
import appColors from '../../../theme/appColors'
import { useValues } from '../../../utils/context'
import { styles } from './styles'
import EmojiPicker from 'rn-emoji-keyboard'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import Voice from '@react-native-voice/voice'
import Icons from '../../../utils/icons/icons'
import { useTheme } from '@react-navigation/native'
import '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import Images from '../../../utils/images/images'
import { useSelector } from 'react-redux'

type ProfileScreenProps = NativeStackNavigationProp<RootStackParamList>

export function Chat() {
  const route = useRoute()
  const { driverId, riderId, rideId, riderName, riderImage } = route.params || {}
  const { goBack } = useNavigation<ProfileScreenProps>()
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [started, setStarted] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const { colors } = useTheme()
  const { viewRtlStyle, textRtlStyle, viewSelfRtlStyle, rtl } = useValues()
  const { translateData } = useSelector(state => state.setting)

  const getCurrentTime = () => {
    const now = new Date()
    let hours = now.getHours()
    const minutes = now.getMinutes()
    const amPM = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPM}`
  }

  const handlePick = (emoji: { emoji: string }): void => {
    if (emoji && emoji.emoji) {
      setInput(prev => prev + emoji.emoji)
    }
  }

  const onSpeechStart = () => {
    setStarted(true)
  }

  const onSpeechEnd = () => {
    setStarted(false)
  }

  const onSpeechResults = e => {
    if (e.value && e.value.length > 0) {
      setResults(e.value)
      setInput(prev => prev + ' ' + e.value[0])
    }
  }

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US')
      setResults([])
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechResults = onSpeechResults
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const ride_Id = `${rideId}`
  const currentUserId = `${driverId}`
  const chatWithUserId = `${riderId}`

  const chatId = [ride_Id, currentUserId, chatWithUserId].sort().join('_')

  const messagesRef = firestore()
    .collection('rides')
    .doc(chatId)
    .collection('messages')

  useEffect(() => {
    const unsubscribeMessages = messagesRef
      .orderBy('timestamp', 'asc')
      .onSnapshot(
        snapshot => {
          const fetchedMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setMessages(fetchedMessages)
          setLoading(false)
        },
        err => {
          setError('Error fetching messages: ' + err.message)
          setLoading(false)
        },
      )

    return () => {
      unsubscribeMessages()
    }
  }, [chatId])

  const sendMessage = async () => {
    if (input.trim()) {
      try {
        await messagesRef.add({
          message: input,
          senderId: currentUserId,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
      } catch (error) {
        setError('Failed to send message: ' + error.message)
      }
    }
  }

  return (
    <View style={styles.containerMain}>
      <View
        style={[
          styles.view_Main,
          {
            backgroundColor: colors.card,
            flexDirection: viewRtlStyle,
          },
        ]}
      >
        <View style={{ flexDirection: viewRtlStyle }}>
          <TouchableOpacity
            activeOpacity={0.7}

            style={[
              styles.backButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={goBack}
          >
            <Icons.Back color={colors.text} />
          </TouchableOpacity>
          <View style={styles.riderContainer}>
            <Text
              style={[
                styles.templetionStyle,
                { textAlign: textRtlStyle, color: colors.text },
              ]}
            >
              {riderName}
            </Text>
            <Text style={[styles.onlineText, { textAlign: textRtlStyle }]}>
              {translateData.online}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}

          style={[
            styles.backButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Icons.Moredata color={colors.text} />
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={[styles.modalContainer, { alignItems: viewSelfRtlStyle }]}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.7}
          >
            <View style={styles.modalSub}>
              <TouchableOpacity style={styles.modalTextView} onPress={() => { }} activeOpacity={0.7}
              >
                <Text style={styles.modalText}>{translateData.callNow}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      <FlatList
        data={messages}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={styles.listContainer}
        renderItem={({ item }) => {
          const timestamp = item.timestamp
            ? new Date(item.timestamp.seconds * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
            : `${translateData.sending}`

          return (
            <View
              style={[
                styles.mainContainer,
                {
                  flexDirection:
                    item.senderId === currentUserId ? 'row-reverse' : 'row',
                },
              ]}
            >
              {item.senderId !== currentUserId && (
                <Image
                  source={
                    riderImage ? { uri: riderImage } : Images.ProfileDefault
                  }
                  style={[styles.image, { borderColor: colors.border }]}
                />
              )}

              <View
                style={[
                  styles.messageContainer,
                  item.senderId === currentUserId
                    ? styles.senderMessage
                    : styles.receiverMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.senderId !== currentUserId
                      ? [
                        styles.senderMessageText,
                        { textAlign: rtl ? 'right' : 'left' },
                      ]
                      : styles.receiverMessageText,
                  ]}
                >
                  {item.message}
                </Text>
                <Text
                  style={[
                    styles.messageText,
                    item.senderId !== currentUserId
                      ? [
                        styles.senderMessageTime,
                        { textAlign: rtl ? 'right' : 'left' },
                      ]
                      : [
                        styles.receiverMessageTime,
                        { textAlign: rtl ? 'left' : 'right' },
                      ],
                  ]}
                >
                  {timestamp}
                </Text>
              </View>
            </View>
          )
        }}
      />

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.background },
          { flexDirection: viewRtlStyle },
        ]}
      >
        <View
          style={[
            styles.textInputView,
            {
              backgroundColor: colors.card,
              flexDirection: viewRtlStyle,
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsOpen(true)}>
            <Icons.Emoji />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input,
              { textAlign: textRtlStyle, color: colors.text },
            ]}
            value={input}
            onChangeText={setInput}
            placeholder={`${translateData.typeHere}`}
            multiline
            placeholderTextColor={appColors.secondaryFont}
          />
          <Pressable
            activeOpacity={0.7}
            style={styles.mic}
            onPressIn={startRecognizing}
            onPressOut={stopRecognizing}
          >
            <Icons.Mic />
          </Pressable>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} activeOpacity={0.7}
          >
            <Icons.SendChat />
          </TouchableOpacity>
        </View>
      </View>
      {isOpen && (
        <View>
          <EmojiPicker
            onEmojiSelected={handlePick}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </View>
      )}
    </View>
  )
}
