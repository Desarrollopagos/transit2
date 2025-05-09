import { StyleSheet } from 'react-native'
import {
  windowHeight,
  fontSizes,
  windowWidth,
} from '../../../theme/appConstant'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  buttonView: {
    position: 'absolute',
    bottom: windowHeight(3),
    left: windowHeight(0),
    right: windowHeight(0),
  },
  closeBtn: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.modelBg,
  },
  modalContent: {
    width: '90%',
    padding: windowHeight(2),
    backgroundColor: appColors.white,
    borderRadius: windowHeight(1.3),
    alignItems: 'center',
  },
  modalText: {
    fontSize: fontSizes.FONT4HALF,
    marginBottom: windowHeight(4),
    color: appColors.primaryFont,
    fontFamily: appFonts.medium,
    textAlign: 'center',
    marginTop: windowHeight(0.3),
    width: '80%',
  },
  closeButton: {
    width: '98%',
    marginTop: windowHeight(3),
    marginBottom: windowHeight(0.8),
  },
  buttonText: {
    color: appColors.white,
    fontSize: 16,
  },
  otpTitle: {
    color: appColors.primaryFont,
    fontFamily: appFonts.medium,
    width: '100%',
    marginBottom: windowHeight(1),
    left: windowHeight(0.5),
  },
  otpContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    width: windowWidth(13),
    height: windowHeight(6.5),
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(1.1),
  },
  paymentView: { marginTop: windowHeight(-1) },
  bottomView: { marginBottom: 80 },
  refreshView: {
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth(22),
    paddingVertical: windowHeight(1),
    borderRadius: windowHeight(0.6),
    marginTop: windowHeight(2),
  },
  refreshText: {
    fontFamily: appFonts.regular,
    color: appColors.white,
  },
  completedPaymentText: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
    textAlign: 'center',
  },
  completedPaymentView: {
    borderRadius: windowHeight(0.6),
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight(18),
    marginVertical: windowHeight(2),
    width: '100%',
    paddingVertical: windowHeight(1),
    paddingHorizontal: windowWidth(3),
    borderWidth: windowHeight(0.1),
  },
  pendingView: { marginHorizontal: windowWidth(4) },
  billView: {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: windowHeight(0.9),
    marginTop: windowHeight(1.5),
  },
  billBorder: {
    borderBottomWidth: windowHeight(0.1),
    marginTop: windowHeight(1.5),
    borderStyle: 'dashed',
  },
  text: {
    fontFamily: appFonts.regular,
  },
  platformContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: windowHeight(1.5),
  },
  rideText: {
    marginTop: windowHeight(1),
    fontFamily: appFonts.bold,
  },
  completedMainView: { marginTop: windowHeight(2) },
  billMainView: { marginHorizontal: windowWidth(4) },
  viewBill: {
    borderRadius: windowHeight(0.6),
    width: '100%',
    paddingVertical: windowHeight(1),
    paddingHorizontal: windowWidth(3),
    borderWidth: windowHeight(0.1),
  },
})
export default styles
