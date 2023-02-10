const express = require("express");
const app = express();
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const db = require("./config/database");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// get data from env file
require("dotenv").config();

const port = process.env.PORT || 8081;

// config view template
configViewEngine(app);

// khai bao route
app.use("/", webRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
