import React from 'react'
import Header from '../components/Header'
import { MensajeLista } from '../components/MensajeLista'

export const Home = () => {
  return (
    <>
      <div className='card-header'>
        <Header />
      </div>
      <div>
        <MensajeLista />
      </div>
    </>
  )
}

