const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "workoutLog",
  "postgres",
  process.env.DATABASE_PASS,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(function () {
    console.log("Connected to workoutLog postgres database!");
  })
  .catch((err) => console.log(err));

module.exports = sequelize;
