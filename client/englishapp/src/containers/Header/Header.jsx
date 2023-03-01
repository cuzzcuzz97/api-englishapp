import React from 'react'
import './header.css';
import { onLogout } from '../../api/auth'
import { useDispatch } from 'react-redux'
import { unauthenticateUser } from '../../redux/slices/authSlice'

const Header = () => {
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const isAuth = localStorage.getItem('isAuth');
  return (
    <div className='app__header-nav'>
        <div className='app__header-nav-logo'>
            <a href="/">EnglishApp</a>
        </div>
        <div className='app__header-nav-user'>
          {!isAuth ? (<><nav>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </nav></> ): 
              
            (<><span>Username</span><span id="logout" onClick={() => logout()}>Logout</span></>)
             }
            
          </div>
    </div>
  )
}

export default Header