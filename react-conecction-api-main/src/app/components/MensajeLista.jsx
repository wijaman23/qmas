import { useEffect, useState, useMemo  } from 'react'
import { NavLink, Link, Navigate } from "react-router-dom";
import * as mensajesService from '../../services/services-api'
import React from 'react'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'

function timeFormat(time) {
  let dayNew;
  const a = time.slice(5, 7);
  const day = time.slice(8, 10);

  if (day.slice(0, 1) === "0") {
    dayNew = day.slice(1, 2);
  } else {
    dayNew = day;
  }

  return (
    dayNew +
    "/" +
    a +
    "/" +
    time.slice(0, 4) +
    " " +
    time.slice(11, 16) +
    "h"
  );
}

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
  border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;
	&:hover {
		cursor: pointer;
	}
`
const ClearButton = styled.button`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  	<>
  		<TextField
  			id="search"
  			type="text"
    		placeholder="Busque por Titulo"
    		aria-label="Search Input"
  			value={filterText}
  			onChange={onFilter}
  		/>
  		<ClearButton type="button" onClick={onClear}>
  			X
  		</ClearButton>
  	</>
)

export const MensajeLista = () => {
  const [mensaje, setMensaje] = useState([])
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    mensajesService
      .getMensajes()
      .then(( data ) => setMensaje( data ))
      .catch((error) => console.error(error));
  }, [reload])

  function handleReadMessage(id, state) {
    if (state == "No leido" || state == "Leido"){
      mensajesService
      .changeStateMessage(id)
      .then(() => {
        setReload(!reload);
      })
    } 
  }

  function handleDone() {
    mensajesService
      .getMensajesDone()
      .then(( data ) => setMensaje( data ))
      .catch((error) => console.error(error));
  }

  function handleReadBoRead() {
    mensajesService
      .getMensajes()
      .then(( data ) => setMensaje( data ))
      .catch((error) => console.error(error));
  }

  function handleRead() {
    mensajesService
      .getMensajesRead()
      .then(( data ) => setMensaje( data ))
      .catch((error) => console.error(error));
  }

  function handleNoRead() {
    mensajesService
      .getMensajesNoRead()
      .then(( data ) => setMensaje( data ))
      .catch((error) => console.error(error));
  }

  const columns = [
    {
        name: 'ID',
        selector: row => row.id_mensaje,
        sortable: true,
        center: true
    },
    {
      name: 'Titulo',
      selector: row => row.title,
      sortable: true,
      width: "700px"
    },
    {
      name: 'Creador',
      selector: row => row.name,
      sortable: true,
      width: "250px",
      center: true
    },
    {
      name: 'Fecha',
      selector: row => timeFormat(row.created_at),
      sortable: true,
      width: "200px",
      center: true
    },
    {
      name: 'Estado',
      selector: row => row.state,
      sortable: true,
      width: "150px",
      center: true
    },
    {
      name: 'Categoria',
      selector: row => row.category,
      sortable: true,
      width: "200px",
      center: true,
    },
    {
      name: 'Leer',
      cell: row => <Link to={`http://localhost:5173/mensajes/${row.id_mensaje}`} className="nav-link">
                      <button className='btn btn-secondary btn-sm' onClick={() => handleReadMessage(row.id_mensaje, row.state)}>Ver mensaje</button>
                    </Link>,
      allowOverflow: true,
      ignoreRowClick: true,
      width: "200px",
      button: true,
    }
  ]
  
  const conditionalRowStyles = [
    	{
    		when: row => row.state === "Leido",
    		style: {
    			backgroundColor: 'rgba(63, 195, 128, 0.4)',
    			color: 'black',
    			'&:hover': {
    				cursor: 'pointer',
    			},
    		},
    	},
      {
        when: row => row.state === "No leido",
        style: {
          backgroundColor: 'rgba(248, 148, 6, 0.4)',
        	color: 'black',
        	'&:hover': {
        	cursor: 'pointer',
        	},
      	},
      },
    ];

  const paginacionOpciones = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  }

  const filteredItems = mensaje.data?.filter(item => item.name && item.title.toLowerCase().includes(filterText.toLowerCase()))

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
    			if (filterText) {
    			setResetPaginationToggle(!resetPaginationToggle);
    				setFilterText('');
    			}
    		};
    
    		return (
    			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    		);
    	}, [filterText, resetPaginationToggle]);
    
  
  if (!filteredItems)
          return (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          );

  return (
    <>
      <div className='ms-5 mt-5'>
        <h1>QMAS</h1>
      </div>
      <div>
      <fieldset className='mx-5 mt-3'>
        <legend>Seleccion mensaje</legend>
        <label className='mx-2'> 
          <input type="radio" name="numero" onClick={handleReadBoRead}/> Leido / No leido
        </label>
        <label className='mx-2'>
            <input type="radio" name="numero" onClick={handleRead}/> Leido 
        </label>
        <label className='mx-2'>
            <input type="radio" name="numero" onClick={handleNoRead}/> No leido
        </label>
        <label className='mx-2'>
            <input type="radio" name="numero" onClick={handleDone}/> Finalizado
        </label>
      </fieldset>
      </div>
      <div className='mx-5'>
          <DataTable 
            columns={columns}
            data={filteredItems}
            conditionalRowStyles={conditionalRowStyles}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight='600px'
            highlightOnHover
            pointerOnHover
            subHeader
            noDataComponent="No hay mensajes"
		        subHeaderComponent={subHeaderComponentMemo}
          />
      </div>
      <div className='mx-5'>
          <Link to="/mensajenew" className="nav-link">
              <button className='btn btn-secondary btn-sm'>Crear nuevo mensaje</button>
          </Link>
      </div>
    </>
  )
}
