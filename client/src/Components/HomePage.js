import React from 'react'
import { logOut } from '../Redux/Helpers/authHelper'

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <button onClick={logOut}>Logout</button>
    </>
  )
}

export default HomePage