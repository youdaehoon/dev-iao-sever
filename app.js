const express = require("express");
const cor = require("cors");
const ogs = require("./service/ogs.js");

const userService = require("./service/User.js");

const server = express();
const routes = express.Router();
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
  const result = await userService.User.listUsers();
  // console.log(result);
  res.send(result.Users);
});

routes.post("/confirm", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const result = await userService.User.confirm(name);
    res.send(result);
    // console.log(result);
  } catch (err) {
    console.log("err in controller", err);
  }
});

// routes.delete("/user", async (req, res) => {
//   const { name } = req.body;

//   try {
//     const result = await users.userService.AdminDeleteUser(name);
//     res.json(result);
//   } catch (err) {
//     console.log(err);
//   }
// });

server.listen(3334, () => {
  console.log("server open");
});
