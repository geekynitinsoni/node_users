const express = require("express");
const mysql = require("mysql2");
const db = require("./db");

const app = express();
app.use(express.json()); // JSON data handle karne ke liye

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(201)
        .json({ message: "user created", userId: result.insertId }); // 201 new entry in database created
    }
  });
}); // create data

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users where id=?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message }); // err from db
    } else if (result.length === 0) {
      res.status(400).json({ error: "user not found" }); // not found on sql db
    } else {
      res.status(200).json({ message: "user found", user: result[0] }); // 200 data fetched
    }
  });
}); // read data via id

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(200)
        .json({ message: "Users retrieved successfully", users: result });
    }
  });
}); // read data

app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const sql = "UPDATE users SET name=?,email=? WHERE id=?";
  db.query(sql, [name, email, req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      const fetchsql = "SELECT * FROM users WHERE id=?";
      db.query(fetchsql, [req.params.id], (err, data) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: "user updated!", user: data[0] });
        }
      });
    }
  });
}); // update data

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(200).json({ message: "user deleted successfully" });
    }
  });
}); // delete data

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// checking git push
