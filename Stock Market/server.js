const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

// application/json
app.use(bodyParser.json());

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const {
  PORT = 3000,
  SESS_LIFETIME = 1000 * 60 * 60 * 2, // mil seconds, seconds, minutes, hours
  SESS_NAME = 'sid',
  SESS_SECRET = 'Test',
  NODE_ENV = 'development'
} = process.env;

const IN_PROD = NODE_ENV == 'production'

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUnitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}));

require("./app/routes/user.routes.js")(app);
require("./app/routes/login.routes.js")(app);
require("./app/routes/share.routes.js")(app);
require("./app/routes/company.routes.js")(app);


// set port and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});