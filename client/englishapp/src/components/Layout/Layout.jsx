import React from 'react'
import { Header } from '../../containers'
const Layout = ({ children}) => {
  return (
    <div>
        <Header/>
        <div className='container'>{children}</div>
    </div>
  )
}

export default Layout