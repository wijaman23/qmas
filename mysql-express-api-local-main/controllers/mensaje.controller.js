const { connection } = require('../config/db.config')

module.exports.mensajes = (req, res, next) => {
  connection.query('SELECT m.id_mensaje, u.name , m.text, m.title , m.created_at, e.state , c.category FROM mensaje m JOIN usuarios u ON m.user = u.id_usuario JOIN estadoMensaje e ON m.state = e.id_state JOIN categoria c ON m.category_mensaje = c.id_categoria where e.state != "Finalizado" ORDER BY m.id_mensaje ASC', (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
   });
};

module.exports.mensajesDone = (req, res, next) => {
  connection.query('SELECT m.id_mensaje, u.name , m.text, m.title , m.created_at, e.state , c.category FROM mensaje m JOIN usuarios u ON m.user = u.id_usuario JOIN estadoMensaje e ON m.state = e.id_state JOIN categoria c ON m.category_mensaje = c.id_categoria where e.state = "Finalizado" ORDER BY m.id_mensaje ASC', (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
   });
};

module.exports.mensajesRead = (req, res, next) => {
  connection.query('SELECT m.id_mensaje, u.name , m.text, m.title , m.created_at, e.state , c.category FROM mensaje m JOIN usuarios u ON m.user = u.id_usuario JOIN estadoMensaje e ON m.state = e.id_state JOIN categoria c ON m.category_mensaje = c.id_categoria where e.state = "Leido" ORDER BY m.id_mensaje ASC', (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
   });
};

module.exports.mensajesNoRead = (req, res, next) => {
  connection.query('SELECT m.id_mensaje, u.name , m.text, m.title , m.created_at, e.state , c.category FROM mensaje m JOIN usuarios u ON m.user = u.id_usuario JOIN estadoMensaje e ON m.state = e.id_state JOIN categoria c ON m.category_mensaje = c.id_categoria where e.state = "No Leido" ORDER BY m.id_mensaje ASC', (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
   });
};

module.exports.read = (req, res, next) => {
  const id = req.params.id;

  connection.query('UPDATE mensaje SET state = 1 WHERE id_mensaje = ? ', [ id ], (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
  });
};

module.exports.done = (req, res, next) => {
  const id = req.params.id;

  connection.query('UPDATE mensaje SET state = 3 WHERE id_mensaje = ? ', [ id ], (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
  });
};

module.exports.mensaje = (req, res, next) => {
  const id = req.params.id;

  connection.query('SELECT m.id_mensaje, u.name , m.text , m.created_at, e.state , c.category FROM mensaje m JOIN usuarios u ON m.user = u.id_usuario JOIN estadoMensaje e ON m.state = e.id_state JOIN categoria c ON m.category_mensaje = c.id_categoria where m.id_mensaje = ?', [id], (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
   });
};

module.exports.insert = (req, res, next) => {
  const { text, category_mensaje, title } = req.body;

  connection.query('INSERT INTO mensaje VALUES (NULL, ? , 1, NOW(), 2, ?, ?)', [text, category_mensaje, title], (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
   });
};
