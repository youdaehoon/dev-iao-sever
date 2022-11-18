const express = require("express");
const cor = require("cors");
const multer = require("multer");
const ogs = require("./service/ogs.js");
const S3 = require("./service/S3.js");
const userService = require("./service/User.js");

const server = express();
const routes = express.Router();
const upload = multer();
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

routes.delete("/user", async (req, res) => {
  const { name } = req.body;
  console.log(req.body);

  try {
    const result = await userService.User.AdminDeleteUser(name);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

routes.post("/image", upload.single("Image"), async (req, res) => {
  const file = req.file;
  try {
    const result = await S3.S3.uploadImage(file);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

routes.get("/image", async (req, res) => {
  const result = await S3.S3.getImage();
  console.log(result.Contents);
  let arr = [];
  for (let i = 0; i < result.Contents.length; i++) {
    const URL =
      "https://dev-iao-test-image.s3.ap-northeast-2.amazonaws.com/" +
      result.Contents[i].Key;
    arr.push(URL);
    if (i == result.Contents.length - 1) {
      console.log(arr);
      res.send(arr);
    }
  }
});

server.listen(3334, () => {
  console.log("server open");
});
