import * as React from 'react'
import { ReactTreeApi } from '../Tree/Context'

export const useReactTreeApi = () => {
  return React.useRef() as React.MutableRefObject<ReactTreeApi>
}
