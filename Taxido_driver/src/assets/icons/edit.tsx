import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import SvgComponentProps from './type'

const SvgComponent: React.FC<SvgComponentProps> = ({ color }) => (
  <Svg width={16} height={16} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.2}
      d="M8.84 2.4 3.366 8.193c-.206.22-.406.654-.446.954l-.247 2.16c-.087.78.473 1.313 1.247 1.18l2.146-.367c.3-.053.72-.273.927-.5l5.473-5.793c.947-1 1.374-2.14-.1-3.534C10.9.913 9.786 1.4 8.84 2.4Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.2}
      d="M7.926 3.367A4.084 4.084 0 0 0 11.559 6.8M2 14.667h12"
    />
  </Svg>
)
export default SvgComponent
