const express = require("express");
const server = express();
const shortid = require("shortid");

server.use(express.json()); //middleware to read JSON

//creates a server
server.get("/testing", (req, res) => {
  res.send("testing server - server is running");
});

//------------Creating the ENDPOINTS------//
let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: shortid.generate(),
    name: "Billy",
    bio: "Someone very nice",
  },
  {
    id: shortid.generate(),
    name: "Natalia",
    bio: "Student from Lambda",
  },
];

//-->>GET USERS
server.get("/users", (req, res) => {
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

//-->>POST / add a user
server.post("/users", (req, res) => {
  const user = req.body;
  user.id = shortid.generate();

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      users.push(user);
      res.status(201).json(users);
    } catch {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
});

//-->>GET users by ID
server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  usersFind = users.filter((u) => u.id === id);

  if (!id) {
    res.status(404).json({
      message: "user not found.",
    });
  } else {
    try {
      res.status(200).json(usersFind);
    } catch {
      res.status(500).json({ errorMessage: "The user could not be found" });
    }
  }
});

//-->>DELETE user by id

server.delete("/users/:id", function (req, res) {
  const id = req.params.id;

  users = users.filter((u) => u.id !== id);

  if (!id) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else {
    try {
      res.status(200).json(users);
    } catch {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    }
  }
});

//-->> PUT - UPDATE
server.put(`/users/:id`, function (req, res) {
  const id = req.params.id;
  const user = req.body;

  const find = users.find((u) => u.id === id);

  if (!find) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else if (!find.name || !find.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      const updated = users.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: user.name,
            bio: user.bio,
          };
        } else {
          return item;
        }
      });
      users = updated;
      res.status(200).json(users);
    } catch {
      res.status(500).json({ errorMessage: "The user could not be updated" });
    }
  }
});

//Runs the server--//
const port = 8000;
server.listen(port, () => console.log("server is running..!!"));
