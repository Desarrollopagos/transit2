import { StyleSheet } from 'react-native'
import { windowHeight } from '../../theme/appConstant'
import appColors from '../../theme/appColors'
import appFonts from '../../theme/appFonts'

const styles = StyleSheet.create({
  itemStyle: {
    fontFamily: appFonts.regular,
  },
  dashedLine: {
    height: 0.1,
    width: '100%',
    borderBottomWidth: windowHeight(0.1),
    borderColor: appColors.border,
    borderStyle: 'dashed',
    marginVertical: windowHeight(1.3),
  },
  pickUpLocationStyles: {
    fontFamily: appFonts.regular,
  },
  addressContainer: {
    shadowOffset: {
      width: windowHeight(0),
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: windowHeight(0.8),
    overflow: 'hidden',
    position: 'relative',
    paddingVertical: windowHeight(1),
  },
  icon: {
    borderStyle: 'dotted',
    height: windowHeight(3.5),
    borderLeftWidth: windowHeight(0.1),
    marginHorizontal: windowHeight(0.7),
    borderLeftColor: appColors.secondaryFont,
  },
  locationContainer: {
    flexDirection: 'column',
    marginHorizontal: windowHeight(1.5),
    marginTop: windowHeight(1),
  },
  locationText: {
    paddingVertical: windowHeight(0.8),
    marginHorizontal: windowHeight(0.8),
  },
})
export { styles }
