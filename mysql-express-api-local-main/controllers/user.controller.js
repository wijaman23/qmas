const { connection } = require('../config/db.config')

module.exports.home = (req, res, next ) => { 
  res.json({ message: "oki" });
  
 }

module.exports.list = (req, res, next) => {
  connection.query('SELECT * FROM usuarios', (error, results, fields) => {
    if (error)
        throw error;
    res.status(200).json(results);
    // console.log(result);
  });
};

module.exports.addUser = ( req, res ) => {

  const { nombre, contrasena, email } = req.body;
  // console.log(nombre, contrasena, email)
  connection.query( 'INSERT INTO usuarios(nombre, contrasena) VALUES (?,?)', 
  [nombre, contrasena],
  (error, results) => {
    if( error )
      throw error;
      console.log(results.affectedRows)
    res.status(201).json('Usuario añadido correctamente');
  });
};

module.exports.deleteUser =( req, res ) => {
  const id = req.params.id;
  connection.query('DELETE from usuarios where id = ?', [ id ],
  (error, results ) => {
    if( error )
      throw error;
    res.status(201).json('Usuario eliminado')
  })

  function invalidAuthError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { email: { message: "Usuario o contraseña invalidas" } },
      })
    );
  }

  const { user, password } = req.body;
    connection.query('select * from usuarios where user = "prueba" and password = 1245', [ user, password ],
      (error, results ) => {
        if (!user) {
          invalidAuthError();
        } else {
          return user.checkPassword(password).then((match) => {
            if (match) {
              req.session.userId = user.id;
              res.status(201).json(user);
            } else {
              invalidAuthError();
            }
          });
        }
      })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { user, password } = req.body;

  connection.query('select * from usuarios where user = ? and password = ?', [ user, password ], (error, results) => {
    if (error)
        throw error;
    res.status(200).json(results);
  });
};




