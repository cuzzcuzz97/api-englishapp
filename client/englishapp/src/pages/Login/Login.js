import { useState } from 'react'
import { onLogin } from '../../api/auth'
import './login.css'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'
import Layout from '../../components/Layout/Layout'


const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await onLogin(values)
      dispatch(authenticateUser())

      localStorage.setItem('isAuth', 'true')
    } catch (error) {
      setError(error.response.data.errors[0].msg)
    }
  }

  return (
    <Layout>
    <div className='app__register'>
      <form onSubmit={(e) => onSubmit(e)} className='app__register-form'>
        <h1>Login</h1>

        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='username'
            name='username'
            value={values.username}
            placeholder='englishlearning123'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='password'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
          <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
      </form>
  </div>
  </Layout>
  )
}

export default Login