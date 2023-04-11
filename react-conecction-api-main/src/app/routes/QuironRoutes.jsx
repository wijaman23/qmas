import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import MensajeNew from '../pages/mensajeNew'
import {MessageId} from '../pages/MessageId'


export const QuironRoutes = () => {
  return (
    <Routes >
      <Route path='/' element = {<Home/>} />
      <Route path='/*' element = {<Navigate to="/"/>} />
      <Route path='/mensajes/:id' element = {<MessageId/>} />
      <Route path='/mensajenew' element = {<MensajeNew/>} />
    </Routes>
  )
}
