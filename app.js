const express = require("express");
const passport = require("passport")
const initializePassport = require("./utils/passport-config")

const dbClient=require("./db/dbNew")
dbClient.connectDB()

const app = express();
const apiV1 = require("./modules/api.v1.route")
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
initializePassport.initialize(passport)
app.use(passport.initialize())

app.use("/", apiV1)

app.listen(3001, () => console.log("app listening on port 3001!"));


module.exports = app;
