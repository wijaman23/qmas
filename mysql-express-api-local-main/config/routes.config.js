const express = require("express");
const router = express.Router();

const mensaje = require("../controllers/mensaje.controller");
const LoginController = require("../controllers/login.controller");

router.post('/auth', LoginController.auth);
router.delete("/logout", LoginController.logout)

router.get('/mensajes', mensaje.mensajes);
router.get('/mensajesDone', mensaje.mensajesDone);
router.get('/mensajesRead', mensaje.mensajesRead);
router.get('/mensajesNoRead', mensaje.mensajesNoRead);
router.get('/mensajes/:id', mensaje.mensaje);
router.post('/mensajes/read/:id', mensaje.read);
router.post('/mensajes/done/:id', mensaje.done);
router.post('/insertMensaje', mensaje.insert);


module.exports = router;
