import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
const SvgComponent = () => (
  <Svg width={18} height={18} fill="none">
    <Path
      stroke="#8F8F8F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M16.5 9c0 4.14-3.36 7.5-7.5 7.5-4.14 0-7.5-3.36-7.5-7.5 0-4.14 3.36-7.5 7.5-7.5 4.14 0 7.5 3.36 7.5 7.5Z"
    />
    <Path
      stroke="#8F8F8F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M11.783 11.385 9.458 9.997c-.405-.24-.735-.817-.735-1.29V5.632"
    />
  </Svg>
)
export default SvgComponent
