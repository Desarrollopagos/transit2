import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import { windowHeight, fontSizes } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    marginHorizontal: windowHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight(0.8),
    borderWidth: windowHeight(0.1),
    paddingHorizontal: windowHeight(1.7),
    paddingVertical: windowHeight(1.2),
    shadowOffset: {
      width: windowHeight(0),
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderColor: appColors.border,
  },
  mediumTextBlack12: {
    fontWeight: '400',
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    color: appColors.primaryFont,
  },
  listContainer: {
    paddingVertical: windowHeight(2.8),
    paddingHorizontal: windowHeight(1),
    right: windowHeight(1),
  },
})
export { styles }
