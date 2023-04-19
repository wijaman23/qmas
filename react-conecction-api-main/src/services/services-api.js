import axios from 'axios'

const http = axios.create({
  baseURL: "http://localhost:3030",
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

 export const changeStateDone = (id) => { 
  return http.post(`/mensajes/done/${id}`)
 }

 export const insertMensaje = (data) => { 
  return http.post(`/insertMensaje`, data)
 }

 export const login = (data) => { 
  return http.post(`/auth`, data)
 }

 export function logout() {
  return http.delete("/logout");
}