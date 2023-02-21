const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");
const configViewEngine = require("./config/viewEngine");
const db = require("./config/database");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8081;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// config file upload
app.use(fileUpload());

// get data from env file
require("dotenv").config();

// config view template
configViewEngine(app);

// khai bao route
routes(app);

(async () => {
    // connect to db with mongoose
    await db.connection();

    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);
    // const dbName = "hoidanit";
    // await client.connect();
    // console.log("Connected successfully to server");
    // const db = client.db(dbName);
    // const collection = db.collection("customers");

    // await collection.insertOne({
    //     name: "Tai Van Nguyen",
    //     address: {
    //         province: "Quang Tri",
    //         country: {
    //             name: "Viet Nam",
    //             code: 10000,
    //         },
    //     },
    // });

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
})();
