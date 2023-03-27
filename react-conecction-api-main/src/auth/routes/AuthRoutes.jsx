import { Navigate, Route, Routes } from 'react-router-dom'


export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to='/' /> }/>    
    </Routes>
  )
}
