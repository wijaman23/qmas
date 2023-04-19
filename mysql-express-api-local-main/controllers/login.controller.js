const { connection } = require('../config/db.config')
const createError = require("http-errors");
const jwt = require ('jsonwebtoken')


module.exports.auth = (req, res, next) => {
    const { user, password } = req.body;

    function invalidAuthError() {
        next(
            createError(400, {
            message: "User validation failed",
            errors: { user: { message: "Usuario o contraseña invalidas" } },
            })
        );
    }

    connection.query('select * from usuarios where user = ?', [ user ], (error, results) => {
          if (error) {
            res.status(500).json({ error: 'Internal server error' });
          } else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            invalidAuthError()
          } else {
            const userName = results[0];
            if (userName.password === password){
                const token = jwt.sign({id: userName.id_usuario}, "jwtkey")
                const {password, ...other} = userName

                res
                .cookie("access_token", token, {
                  httpOnly: true,
                })
                .status(200)
                .json(other);
            
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
                invalidAuthError()
            }
          }
    })
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    req.session = null;
    res.status(204).send();
  };
