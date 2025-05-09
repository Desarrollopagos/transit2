import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import { windowHeight, windowWidth } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  contain: {
    marginHorizontal: windowWidth(4),
    marginVertical: windowHeight(2),
  },
  spaceTop: {
    marginTop: windowHeight(1.5),
  },
  review: {
    color: appColors.primaryFont,
    textAlign: 'center',
    fontFamily: appFonts.regular,
    marginTop: windowHeight(1.5),
    marginBottom: windowHeight(3),
  },
})
export default styles
