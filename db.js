const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nitin@2025",
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
