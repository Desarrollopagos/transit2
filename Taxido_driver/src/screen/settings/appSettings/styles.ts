import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../../../theme/appConstant'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingHorizontal: windowWidth(4),
    marginTop: windowHeight(1.3),
  },
  listContainer: {
    height: windowHeight(34.5),
    width: '100%',
    marginVertical: windowHeight(1.5),
    borderRadius: windowHeight(1),
    borderWidth: windowHeight(0.1),
  },
})
export default styles
