require("dotenv").config(); // load env files
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "testdb",
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed : ", err.message);
  } else {
    console.log("✅ DB connected succesfully");
  }
});

module.exports = db;
