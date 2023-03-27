require("dotenv").config();
const express = require("express");
const app = express();
const createError = require("http-errors");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors')

dotenv.config();

require("./config/db.config");


app.use(express.json());
app.use(cors())
app.use( express.urlencoded({ extended: true, }));
app.use(logger("dev"));

const routes = require("./config/routes.config");
// console.log(routes)
app.use("/", routes);


app.listen(process.env.PORT||3300, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});