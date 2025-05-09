import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'
import {
  windowHeight,
  fontSizes,
  windowWidth,
} from '../../../theme/appConstant'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapSection: {
    flex: 0.89,
    backgroundColor: appColors.primaryLight,
  },
  extraSection: {
    flex: 0.1,
  },
  greenSection: {
    position: 'absolute',
    bottom: windowHeight(2),
    width: '100%',
    height: windowHeight(40),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  additionalSection: {
    marginBottom: windowHeight(1),
    alignItems: 'center',
    height: windowHeight(23),
    marginHorizontal: windowWidth(4),
    borderRadius: 5,
    borderWidth: windowHeight(0.1),
    top: windowHeight(4),
  },
  date: {
    height: windowHeight(3.8),
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: windowWidth(3),
    marginBottom: windowHeight(1),
  },
  address: {
    height: windowHeight(3.8),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth(3),
    marginTop: windowHeight(1),
  },
  timing: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
  },
  otpInput: {
    height: windowHeight(6.5),
    width: '100%',
    borderWidth: windowHeight(0.1),
    borderRadius: 8,
    paddingHorizontal: windowWidth(3),
  },
  modelbackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.modelBg,
  },
  model: {
    borderRadius: windowHeight(0.9),
    height: windowHeight(28),
    width: windowWidth(91),
  },
  space: {
    paddingHorizontal: windowWidth(5),
  },
  closeIcon: {
    height: windowHeight(3.2),
    width: windowWidth(6.4),
    position: 'absolute',
    right: windowHeight(0),
    marginVertical: windowHeight(1.5),
    marginHorizontal: windowWidth(3),
  },
  title: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: fontSizes.FONT5,
    fontFamily: appFonts.medium,
    marginVertical: windowHeight(1.5),
  },
  backButton: {
    position: 'absolute',
    marginHorizontal: windowWidth(3),
    top: windowHeight(0.5),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  otpContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight(0.5),
  },
  otpInputs: {
    width: windowWidth(13),
    height: windowHeight(6.5),
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(1.3),
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonView: { position: 'absolute', bottom: 2, width: '100%' },
  img: { width: 100, height: 100 },
  vehicleMapImage: { width: 40, height: 40, resizeMode: 'contain' },
})
export default styles
