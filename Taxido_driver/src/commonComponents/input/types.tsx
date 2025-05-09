import { KeyboardTypeOptions } from 'react-native'

interface InputProps {
  placeholder?: string
  keyboardType?: KeyboardTypeOptions
  value?: string
  warning?: string
  onChangeText?: (text: string) => void
  showWarning?: boolean
  emailFormatWarning?: string
  icon?: React.ReactNode
  titleShow?: boolean
  title?: string
  backgroundColor?: string
  rightIcon?: boolean
  onPress?: () => void
  secureText?: boolean
  borderColor?:string
  editable?:string
}

export default InputProps
