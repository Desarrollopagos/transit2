import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  profileView: {
    marginHorizontal: windowWidth(4),
    marginTop: windowHeight(10),
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(1),
    height: '80%',
  },
  profileImageView: {
    position: 'absolute',
    top: windowHeight(-7),
    left: '50%',
    marginLeft: windowWidth(-12),
    width: windowHeight(11),
    height: windowHeight(11),
    borderRadius: windowHeight(15),
    borderWidth: windowHeight(0.1),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: windowHeight(10),
    height: windowHeight(10),
    resizeMode: 'cover',
    borderRadius: windowHeight(6),
  },
  charImage: {
    width: windowHeight(10),
    height: windowHeight(10),
    resizeMode: 'cover',
    borderRadius: windowHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.primary,
  },
  firstLetter: {
    color: appColors.white,
    fontSize: fontSizes.FONT7,
    fontFamily: appFonts.bold,
  },
  fieldView: {
    marginHorizontal: windowWidth(4),
    marginTop: windowHeight(7),
    paddingBottom: windowHeight(1.5),
  },
  updateBtn: {
    marginBottom: windowHeight(1.3),
  },
  codeComponent: {
    marginRight: windowWidth(2.5),
  },
  countryCode: {
    height: windowHeight(6),
    width: windowWidth(15),
    backgroundColor: appColors.graybackground,
    paddingHorizontal: windowWidth(1.5),
    paddingVertical: windowHeight(1),
    borderRadius: windowWidth(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: windowHeight(0.1),
  },
  dialCode: {
    color: appColors.secondaryFont,
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.medium,
  },

  profileImageContainer: {
    alignSelf: 'center',
    marginTop: windowHeight(19),
  },
  editIconContainer: {
    width: windowHeight(4),
    height: windowHeight(4),
    borderRadius: windowHeight(24),
    position: 'absolute',
    alignSelf: 'flex-end',
    flexGrow: 1,
    top: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: windowHeight(0.1),
  },
  char: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5,
    backgroundColor: appColors.primary,
    width: windowHeight(75),
    height: windowHeight(74),
    borderRadius: windowHeight(74),
    textAlign: 'center',
    paddingVertical: windowHeight(25),
  },
  emailContainer: { top: windowHeight(0.2) },
  countryContainer: { marginVertical: windowHeight(1) },
  mobileNumber: { marginTop: windowHeight(0.3), fontFamily: appFonts.medium },
})

export default styles
