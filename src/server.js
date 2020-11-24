const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://a.com",
};

const db = require("./models");
const Role = db.role;

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Serber." });
});

//require all routes inside /routes
require("fs")
  .readdirSync(__dirname + "/routes/")
  .forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== "index.js") {
      var name = file.replace(".js", "");
      require("./routes/" + name)(app);
      console.log(name);
    }
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
