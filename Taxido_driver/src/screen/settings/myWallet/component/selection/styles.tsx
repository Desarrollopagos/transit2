import { StyleSheet } from 'react-native'
import appFonts from '../../../../../theme/appFonts'
import { windowHeight, windowWidth } from '../../../../../theme/appConstant'

const styles = StyleSheet.create({
  selection: {
    height: windowHeight(6.5),
    marginHorizontal: windowWidth(5.8),
    borderRadius: windowHeight(1),
    marginTop: windowHeight(1.5),
  },
  earningView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight(0.9),
  },
  historyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight(0.9),
  },
  fonts: {
    fontFamily: appFonts.medium,
  },
})
export default styles
