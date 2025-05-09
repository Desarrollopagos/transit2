import { StyleSheet } from 'react-native'
import appColors from '../../../../../theme/appColors'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../../theme/appConstant'
import appFonts from '../../../../../theme/appFonts'

const styles = StyleSheet.create({
  otpView: {
    position: 'absolute',
    bottom: windowHeight(0),
    left: windowHeight(0),
    right: windowHeight(0),
    height: windowHeight(48),
    borderTopRightRadius: windowHeight(3),
    borderTopLeftRadius: windowHeight(3),
  },
  otpContainer: {
    justifyContent: 'space-between',
  },
  otpInput: {
    textAlign: 'center',
    textAlignVertical: 'center', 
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(0.9),
    paddingVertical: 0, 
    paddingHorizontal: 0,
    fontSize: windowWidth(4.9),
  },
  
  subView: {
    marginHorizontal: windowWidth(4),
  },
  otpVef: {
    fontSize: fontSizes.FONT6,
    fontFamily: appFonts.medium,
    marginTop: windowHeight(0.7),
  },
  subtitle: {
    color: appColors.secondaryFont,
    marginTop: windowHeight(0.7),
    fontFamily: appFonts.regular,
    marginBottom: windowHeight(1.3),
  },
  title: {
    marginTop: windowHeight(2.5),
    marginBottom: windowHeight(1.3),
    fontFamily: appFonts.medium,
  },
  container: {
    marginTop: windowHeight(2.5),
    marginBottom: windowHeight(1.3),
  },
  inputContainer: {
    justifyContent: 'space-between',
    marginBottom: windowHeight(0.5),
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: windowHeight(2),
  },
  buttonView: {
    marginTop: windowHeight(4),
  },
  space: {
    height: windowHeight(4),
  },
  retry: {
    marginTop: windowHeight(1.5),
    alignSelf: 'center',
    gap: windowHeight(0.2),
  },
  notReceive: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
  },
  resend: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
  },
  warningText: {
    color: appColors.red,
  },
})

export default styles
