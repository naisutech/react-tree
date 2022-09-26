import * as React from 'react'
import { ReactTreeApi } from '../Tree/Context'

export const useReactTreeApi = () =>
  React.useRef({}) as React.MutableRefObject<ReactTreeApi>
