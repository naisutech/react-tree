import * as React from 'react'

type Props = {
  level: number,
  children?: React.Node
}

const Wrapper = (props: Props) => {
  return (
    <div className="T-wrapper" style={{ paddingLeft: 20 * props.level }}>
      {props.children}
    </div>
  )
}

Wrapper.defaultProps = {
  level: 0
}

export default Wrapper
