import './App.css';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Learning from './pages/Learning/Learning';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
  const {isAuth} = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />} </>
}
const RestrictedRoutes = () => {
  const {isAuth} = useSelector((state) => state.auth)

  return <>{isAuth ? <Navigate to='/' /> : <Outlet />} </>
}


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home/>} />
            <Route path='/learning/:id' element={<Learning/>} />
          </Route>
          <Route element={<RestrictedRoutes />}>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
