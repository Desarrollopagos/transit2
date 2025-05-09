import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'
const SvgComponent = () => (
  <Svg width={18} height={18} fill="none">
    <G
      stroke="#8F8F8F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M12.75 15.75h-7.5c-3 0-3.75-.75-3.75-3.75V6c0-3 .75-3.75 3.75-3.75h7.5c3 0 3.75.75 3.75 3.75v6c0 3-.75 3.75-3.75 3.75ZM10.5 6h3.75M11.25 9h3M12.75 12h1.5" />
      <Path d="M6.375 8.467a1.358 1.358 0 1 0 0-2.715 1.358 1.358 0 0 0 0 2.715ZM9 12.248a2.265 2.265 0 0 0-2.055-2.04 5.79 5.79 0 0 0-1.14 0 2.272 2.272 0 0 0-2.055 2.04" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
