const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");
const mensaje = require("../controllers/mensaje.controller");

router.get('/', user.home); // prueba
router.get('/users', user.list);
router.post('/users', user.addUser);
router.delete('/users/:id', user.deleteUser);

router.get('/mensajes', mensaje.mensajes);
router.get('/mensajesDone', mensaje.mensajesDone);
router.get('/mensajesRead', mensaje.mensajesRead);
router.get('/mensajesNoRead', mensaje.mensajesNoRead);
router.get('/mensajes/:id', mensaje.mensaje);
router.post('/mensajes/read/:id', mensaje.read);


module.exports = router;
