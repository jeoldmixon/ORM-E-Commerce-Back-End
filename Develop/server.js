const express = require("express");
const routes = require("./routes");
// Create the code needed in server.js to sync the Sequelize models to the MySQL database on server start.
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(
    `Shhh...App listening on port ${PORT}! - unlike teenagers who listen to nothing!!!`
  );
});
