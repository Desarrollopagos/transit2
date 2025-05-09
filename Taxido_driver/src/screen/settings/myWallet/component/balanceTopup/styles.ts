import { StyleSheet } from 'react-native'
import appColors from '../../../../../theme/appColors'
import appFonts from '../../../../../theme/appFonts'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../../theme/appConstant'

const styles = StyleSheet.create({
  mainBalance: {
    marginTop: windowHeight(0),
    overflow: 'hidden',
    marginHorizontal: windowWidth(4),
  },
  walletImage: {
    height: windowHeight(15),
    width: windowWidth(100),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subBalance: {
    position: 'absolute',
    height: windowHeight(8),
    width: windowWidth(90),
    justifyContent: 'space-between',
    top: windowHeight(2.6),
  },
  balanceView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight(1.5),
    marginHorizontal: windowWidth(4.5),
  },
  balanceTitle: {
    color: appColors.categoryTitle,
    fontSize: fontSizes.FONT3,
    marginBottom: windowHeight(0.5),
    fontFamily: appFonts.regular,
  },
  totalBalance: {
    fontSize: fontSizes.FONT4,
    color: appColors.white,
    fontFamily: appFonts.bold,
  },
  topupBtn: {
    height: windowHeight(5),
    width: windowWidth(30),
    backgroundColor: appColors.white,
    borderRadius: windowHeight(0.6),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight(2),
    marginHorizontal: windowWidth(4.5),
  },
  topupTitle: {
    color: appColors.primary,
    fontFamily: appFonts.medium,
  },
  dashLine: {
    borderBottomWidth: windowHeight(0.1),
    borderStyle: 'dashed',
    borderColor: appColors.secondaryFont,
    marginHorizontal: windowWidth(4),
    bottom: windowHeight(1),
    width: '88%',
    alignSelf: 'center',
  },
})
export default styles
