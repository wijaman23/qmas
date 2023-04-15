const { connection } = require('../config/db.config')
const createError = require("http-errors");

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
                req.session.loggedin = true;
				req.session.user = user;
                console.log(req.session)
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
                invalidAuthError()
            }
          }
    })
}
