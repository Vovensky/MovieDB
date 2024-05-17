import React from 'react'

import DataLayout from '../DataLayout/DataLayOut'

function CustomTabs(props) {
  const { props: parameters } = props
  const { genres, session, mode, isOffline } = parameters
  const obj = { genres, session, mode, isOffline }
  return (
    <div className="tabs">
      <DataLayout parameters={obj} />
    </div>
  )
}

export default CustomTabs
