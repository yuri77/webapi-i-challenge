// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The users information couldn't be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      console.log("user", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: "the yser with the specified UD does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The user information couldn't be retrieved" });
    });
});

server.listen(5000, () => console.log("server listening on port 5000"));
