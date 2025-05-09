import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../../../theme/appConstant'

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  listView: {
    paddingVertical: windowHeight(2),
    marginHorizontal: windowWidth(4),
  },
})

export default styles
