// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

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

server.post("/api/users", (req, res) => {
  console.log(req.body);
  const user = req.body;
  db.insert(user)
    // .then(idObj => db.find())
    // .then(users => res.status(201).json(users));
    // .then(Objid =>db.find(Objid.id))
    .then(({ id }) =>
     db.findById(id))
        .then(user => {
      res.status(201).json(user);
    })
        .catch(err=>{console.log(err);
        res.status(500).json({error:"server error retriving user"})
    });
})
.catch(err=>{
    console.log(err);
    res.status(500).json({error:"server error inserting user"
})

server.get("/api/users/:id", (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      console.log("user", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: "the user with the specified UD does not exist" });
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
