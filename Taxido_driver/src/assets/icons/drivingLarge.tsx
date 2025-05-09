import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import SvgComponentProps from './type'

const SvgComponent: React.FC<SvgComponentProps> = ({ color }) => (
  <Svg width={24} height={24} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.551 2h-5.1c-1.8 0-2.2.9-2.43 2.01l-.82 3.92h11.6l-.82-3.92c-.23-1.11-.63-2.01-2.43-2.01Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.24 14.32c.08.85-.6 1.58-1.47 1.58h-1.36c-.78 0-.89-.33-1.03-.75l-.15-.43c-.2-.59-.33-.99-1.38-.99h-3.71c-1.04 0-1.2.45-1.38.99l-.15.43c-.14.41-.25.75-1.03.75H6.22c-.87 0-1.55-.73-1.47-1.58l.41-4.42c.1-1.09.31-1.98 2.21-1.98h9.25c1.9 0 2.11.89 2.21 1.98l.41 4.42ZM6.2 5.75h-.73M18.53 5.75h-.73M7.65 10.83h2.17M14.18 10.83h2.17M12 17v1M12 21v1M3 18l-1 4M21 18l1 4"
    />
  </Svg>
)
export default SvgComponent
