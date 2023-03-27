import axios from 'axios'

const http = axios.create({
  baseURL: "http://localhost:3030",
  // withCredentials: true,
});

export const getUsers = () => { 
  return http.get('/users')
 }

 export const getMensajes = () => { 
  return http.get('/mensajes')
 }

 export const getMensajesDone = () => { 
  return http.get('/mensajesDone')
 }

 export const getMensajesRead = () => { 
  return http.get('/mensajesRead')
 }

 export const getMensajesNoRead = () => { 
  return http.get('/mensajesNoRead')
 }

 export const getMensaje = (id) => { 
  return http.get(`/mensajes/${id}`)
 }

 export const changeStateMessage = (id) => { 
  return http.post(`/mensajes/read/${id}`)
 }
