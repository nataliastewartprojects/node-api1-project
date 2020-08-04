const express = require("express");
const server = express();

server.use(express.json()); //middleware to read JSON

//creates a server
server.get("/testing", (req, res) => {
  res.send("testing server - server is running");
});

const port = 8000;
server.listen(port, () => console.log("server is running..!!"));
