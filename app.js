const express = require("express");
const cor = require("cors");
const routes = express.Router();
const ogs = require("./ogs.js");

const server = express();
server.use(cor());
server.use(express.json());
server.use(routes);

routes.post("/ogtag", async (req, res) => {
  const { url } = req.body;
  const result = await ogs.getOg(url);
  console.log(result);
  res.send(result);
});

server.listen("http://54.180.93.82", () => {
  console.log("server open");
});
