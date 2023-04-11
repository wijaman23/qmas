import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'


export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to='/' /> }/>
      <Route path='/login' element = {<LoginPage />} />
    </Routes>
  )
}
