require("dotenv").config();
const express = require("express");
const session = require('express-session');
const app = express();
const createError = require("http-errors");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors')


dotenv.config();

require("./config/db.config");

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.set("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(cors())
app.use( express.urlencoded({ extended: true, }));
app.use(logger("dev"));

const routes = require("./config/routes.config");
app.use("/", routes);

app.listen(process.env.PORT||3300, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});