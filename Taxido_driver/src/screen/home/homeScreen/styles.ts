import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'
import { fontSizes, windowWidth } from '../../../theme/appConstant'
import { windowHeight } from '../../../theme/appConstant'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spaceBelow: {
    paddingBottom: windowHeight(10),
  },
  rideContainer: {
    paddingHorizontal: windowWidth(4),
    paddingBottom: windowHeight(3),
    paddingTop: windowHeight(2),
  },
  rideTitle: {
    marginVertical: windowHeight(0.3),
    fontSize: fontSizes.FONT5,
    fontFamily: appFonts.medium,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.modelBg,
  },
  modalContainer: {
    paddingHorizontal: windowWidth(1.7),
    alignItems: 'center',
  },
  modalTitle: {
    color: appColors.primaryFont,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
    width: '72%',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '102%',
    justifyContent: 'space-between',
    marginTop: windowHeight(2),
  },
  button: {
    backgroundColor: appColors.primary,
    width: windowWidth(39),
    height: windowHeight(5.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight(0.7),
  },
  buttonText: {
    fontFamily: appFonts.medium,
    color: appColors.white,
  },
  noRideText: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
    textAlign: 'center',
    width: windowWidth(80),
  },
  noRideImg: {
    height: windowHeight(25),
    width: windowWidth(80),
  },
  noRideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight(3),
    paddingBottom: windowHeight(10),
  },
  infoMenu: {
    marginHorizontal: windowWidth(2),
    paddingTop: windowHeight(0.2),
  },
  selfDriver: {
    position: 'absolute',
    bottom: windowHeight(10),
    zIndex: 3,
    height: windowHeight(8),
    width: '100%',
  },
  titleStyle: {
    fontFamily: appFonts.medium,
    paddingHorizontal: 10,
  },
  gifImg: {
    width: windowHeight(8),
    height: windowHeight(8),
  },
  listStyle: {
    paddingHorizontal: windowHeight(0.8),
  },
  containerStyles: {
    borderRadius: windowHeight(5),
    marginHorizontal: windowWidth(4),
    backgroundColor: appColors.primary,
  },
  railStyles: {
    borderRadius: windowHeight(5),
    borderWidth: windowHeight(0),
    paddingVertical: windowHeight(0.55),
  },
  thumbIconStyles: {
    borderRadius: windowHeight(5),
    borderWidth: windowHeight(0),
    width: 50,
    height: 50,
    backgroundColor: appColors.primary,
  },
  userimage: {
    height: windowHeight(6),
    width: windowHeight(6),
    borderRadius: windowHeight(3),
    resizeMode: 'cover',
  },
  userName: {
    marginHorizontal: windowWidth(1.5),
    fontFamily: appFonts.medium,
    color: appColors.primary,
    fontSize: fontSizes.FONT4HALF,
  },
  rate: {
    marginHorizontal: windowWidth(0.4),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: windowHeight(1.2),
    height: windowHeight(5.5),
  },
  starContainer: {
    bottom: windowHeight(0.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth(10),
  },
  text1: {
    fontFamily: appFonts.regular,
  },
  locationMarker: {
    marginTop: windowHeight(0.8),
  },
  number: {
    marginHorizontal: windowWidth(2),
    fontFamily: appFonts.regular,
  },
  driverDetailsText: {
    color: appColors.primaryFont,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT5,
    textAlign: 'center',
    marginTop: windowHeight(1.5),
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
  },
})
export default styles
