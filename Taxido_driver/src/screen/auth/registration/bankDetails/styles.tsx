import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../../../../theme/appConstant'

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  subView: {
    height: '100%',
  },
  inputfildView: {
    marginHorizontal: windowWidth(4),
    marginTop: windowHeight(0.8),
  },

  buttonView1: {
    bottom: windowHeight(1.3),
  },
  accNumber: { bottom: windowHeight(0.8) },
  code: { bottom: windowHeight(1.5) },
  bank: { bottom: windowHeight(2.3) },
  swiftCode: { bottom: windowHeight(3.2) },
  payPal: { bottom: windowHeight(3.9) },
})
export default styles
