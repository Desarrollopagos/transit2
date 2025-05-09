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
    flex: 1,
    marginVertical: windowHeight(0.3),
    marginHorizontal: windowWidth(4),
    marginBottom: windowHeight(4),
    height: windowHeight(10),
    bottom: windowHeight(10),
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: windowHeight(5),
  },
  mainContainer: {
    top: windowHeight(12.1),
    paddingHorizontal: windowHeight(2),
  },
  card: {
    height: windowHeight(12),
    width: windowWidth(43),
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(0.8),
    overflow: 'hidden',
    position: 'relative',
  },
  cardTop: {
    justifyContent: 'space-between',
    marginHorizontal: windowWidth(3),
    marginVertical: windowHeight(1),
  },
  cardBottom: {
    justifyContent: 'space-between',
    marginHorizontal: windowWidth(3),
  },
  data: {
    color: appColors.primary,
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5HALF,
    top: windowHeight(0.5),
  },
  iconContain: {
    height: windowHeight(4),
    width: windowWidth(8),
    borderRadius: windowHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: windowWidth(18),
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.medium,
  },
  iconSpace: {
    marginTop: windowHeight(2.3),
  },
  bottomBorder: {
    position: 'absolute',
    bottom: windowHeight(0),
    left: windowHeight(0),
    right: windowHeight(0),
    height: windowHeight(0.7),
    backgroundColor: appColors.primary,
  },
})
export default styles
