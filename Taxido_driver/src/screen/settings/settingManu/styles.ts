import { StyleSheet } from 'react-native'
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    marginBottom: windowHeight(10),
  },
  container: {
    paddingHorizontal: windowWidth(4),
  },
  version: {
    color: appColors.iconColor, textAlign: 'center', marginTop: windowHeight(0.5), marginBottom: windowHeight(0.5), fontSize: fontSizes.FONT3HALF, fontFamily: appFonts.regular,
  },
})
export default styles
