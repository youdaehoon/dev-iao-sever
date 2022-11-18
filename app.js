const express = require("express");
const cor = require("cors");
const routes = express.Router();
const ogs = require("./service/ogs.js");
const { PrivateNetworks } = require("aws-sdk");

const users = require("./service/User.js");

const server = express();
server.use(cor());
server.use(express.json());
server.use(routes);

routes.post("/ogtag", async (req, res) => {
  const { url } = req.body;
  console.log(url);
  const result = await ogs.getOg(url);
  console.log(result);
  res.send(result);
});

routes.get("/listUsers", async (req, res) => {
  const result = await users.userService.ListUesrs();
  res.send(result.Users);
});

server.listen(3333, () => {
  console.log("server open");
});
