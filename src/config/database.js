const mongoose = require("mongoose");
require("dotenv").config();

// create the connection to database
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

const connection = () => {
    try {
        const options = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME,
        };
        mongoose.connect(process.env.DB_HOST, options);

        console.log(">>> Connect to database successful!");
    } catch (error) {
        console.log(">>> Error connection DB: ", error);
    }
};

module.exports = { connection };
