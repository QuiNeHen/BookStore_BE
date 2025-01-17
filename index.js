const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require("moment");
const cookieParser = require('cookie-parser');
const path = require("path");
const cors = require('cors');

require("dotenv").config();

const database = require('./app/config/database');
database.connect();

const clientRoute = require("./app/routes/client/index.route");
const adminRoute = require("./app/routes/admin/index.route");
const systemPrefix = require("./app/config/system")

const app = express();
const port = process.env.PORT;

// cookies
app.use(cookieParser('KWJFKWEIFHW'));
app.use(session({ cookie: { maxAge: 60000 }}));

app.use(express.static('public'))
// override
app.use(methodOverride('_method'));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

// TinyMCE
app.use(
  '/tinymce',
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE


// Variables
app.locals.adminPrefix = systemPrefix.adminPrefix;
app.locals.moment = moment;

// Routes
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
