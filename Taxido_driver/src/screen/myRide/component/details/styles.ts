import { StyleSheet } from 'react-native'
import appColors from '../../../../theme/appColors'
import appFonts from '../../../../theme/appFonts'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../theme/appConstant'

const styles = StyleSheet.create({
  main: {
    marginHorizontal: windowWidth(4),
    height: windowHeight(33),
    marginTop: windowHeight(2.8),
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(0.7),
  },
  border: {
    borderBottomWidth: windowHeight(0.1),
    borderStyle: 'dashed',
    marginHorizontal: windowWidth(3),
  },
  rideData: {
    marginHorizontal: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: windowHeight(1.2),
  },
  carIdView: {
    alignItems: 'center',
  },
  idNo: {
    fontFamily: appFonts.medium,
    marginHorizontal: windowWidth(0.8),
  },
  carImage: {
    height: windowHeight(5.5),
    width: windowWidth(11),
    resizeMode: 'contain',
  },
  date: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
    marginHorizontal: windowWidth(1),
  },
  paymentView: {
    marginHorizontal: windowWidth(3),
    justifyContent: 'space-between',
    marginVertical: windowHeight(1.2),
  },
  paymentType: {
    fontFamily: appFonts.regular,
    marginHorizontal: windowWidth(0.8),
  },
  gst: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
    marginHorizontal: windowWidth(0.8),
    fontSize: fontSizes.FONT3HALF,
    marginVertical: windowHeight(0.5),
  },
  amount: {
    color: appColors.primary,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4HALF,
  },
  mapView: {
    height: windowHeight(12),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth(3),
    marginVertical: windowHeight(1.2),
  },
  mapImage: {
    height: windowHeight(12.8),
    width: '100%',
    borderRadius: windowHeight(0.9),
  },
  addressView: {
    marginHorizontal: windowWidth(4),
  },
  iconView: { justifyContent: 'space-between', height: windowHeight(5.5) },
  viewIcon: { alignItems: 'center', justifyContent: 'center' },
  tripCostText: {
    fontWeight: '400',
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    color: appColors.price,
    top: windowHeight(0.5),
  },
  tripTextContainer: {
    paddingHorizontal: windowHeight(1.4),
  },
})
export default styles
