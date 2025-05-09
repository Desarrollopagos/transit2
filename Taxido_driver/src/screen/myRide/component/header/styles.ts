import { StyleSheet } from 'react-native'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../theme/appConstant'
import appFonts from '../../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: windowHeight(9.5),
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth(4),
    alignItems: 'center',
  },
  backButton: {
    height: windowHeight(5),
    width: windowWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: windowHeight(0.1),
  },
  title: {
    fontSize: fontSizes.FONT5,
    fontFamily: appFonts.medium,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
  },
  messageIcon: {
    height: windowHeight(5),
    width: windowWidth(10),
    borderWidth: windowHeight(0.1),
    borderRadius: 5,
    marginHorizontal: windowWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIcon: {
    height: windowHeight(5),
    width: windowWidth(10),
    borderWidth: windowHeight(0.1),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default styles
