//adding env
require("dotenv").config();

// adding express and app
const express = require("express");
const app = express();

const log = require("./controllers/logcontroller");
const user = require("./controllers/usercontroller");

//connecting database

const sequelize = require("./db");

sequelize.sync();
app.use(require("./middleware/headers"));

app.use(express.json());
app.use("/user", user);

app.use(require("./middleware/validate-session"));
app.use("/log", log);

app.listen(3000, function () {
  console.log("App is listing on port 3000");
});
