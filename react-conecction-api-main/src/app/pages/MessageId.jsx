import React, { useEffect, useState } from 'react'
import * as mensajesService from '../../services/services-api'
import Header from '../components/Header'
import { useParams } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";


function timeFormat(time) {
  let dayNew;
  const a = time.slice(5, 7);
  const day = time.slice(8, 10);

  if (day.slice(0, 1) === "0") {
    dayNew = day.slice(1, 2);
  } else {
    dayNew = day;
  }

  let month = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let b = month[a - 1];

  return (
    dayNew +
    " de " +
    b +
    " de " +
    time.slice(0, 4) +
    " a las " +
    time.slice(11, 16) +
    "h"
  );
}

function handleDoneMessage(id) {
    mensajesService
    .changeStateDone(id)
}

export const MessageId = () => {
    const [mensaje, setMensaje] = useState()
    const { id } = useParams();

    useEffect(() => {
      mensajesService
        .getMensaje(id)
        .then((data) => setMensaje(data))
        .catch((error) => console.error(error));

    }, [])
    
    if (!mensaje)
    return (
      <center>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </center>
    );

    return (
        <>
          <div className="container-fluid">
            <Header />
          </div>
          <div className='p-5'>
            <div>
              <h1 className='mb-5'>Mensaje</h1>
            </div>
            <div className="card" style={{ width: 1800 }}>
              <div className="card-body">
                <div className="d-flex">
                  <i className="fa fa-user-circle fa-2x me-2" aria-hidden="true"></i>
                  <h4>{mensaje?.data[0]?.name}</h4>
                </div>
                <div>
                  {timeFormat(mensaje?.data[0]?.created_at)}
                </div>
                <div className='mt-4 p-3'>
                 {mensaje?.data[0]?.text}
                </div>
              </div>
            </div>
            <div className='mt-3 d-flex'>
              <Link to={`http://localhost:5173/`} className="nav-link">
                <button className="btn"><i className="fa fa-arrow-circle-left fa-2x" aria-hidden="true"></i></button>
              </Link>
                {mensaje?.data[0]?.state === "Leido" ? 
                <Link to={`http://localhost:5173/`} className="nav-link">
                  <button className="btn btn-outline-success" onClick={() => handleDoneMessage(mensaje?.data[0]?.id_mensaje)}>Realizado</button> 
                </Link>:                 
                <h3>Finalizado</h3>}
            </div>
          </div>
        </>
      )

}
