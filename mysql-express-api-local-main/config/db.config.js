const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql');
let connection;

try {
    connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    });

} catch (error) {
    console.log("Error al conectar con la base de datos");
}

setInterval(keepAlive, 290000)
let counterAlive = 5 
function keepAlive() {
    connection.query('SELECT 1')
    console.log(`Servidor activo ${counterAlive} minutos`)
    counterAlive += 5 
    return
}

module.exports = {connection};
