import { Route, Routes } from 'react-router-dom'
import { QuironRoutes } from '../app/routes/QuironRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'


export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={ <AuthRoutes /> }/>
      <Route path='/*' element={ <QuironRoutes /> }/>
      <Route />
    </Routes>
  )
}
