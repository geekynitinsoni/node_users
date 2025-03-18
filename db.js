require("dotenv").config(); // load env files
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12768264",
  password: process.env.DB_PASS,
  database: "sql12768264",
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed : ", err.message);
  } else {
    console.log("✅ DB connected succesfully");
  }
});

module.exports = db;
