const express = require("express");
// const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config");
const auth = require("./auth");
const PORT = 3000;

const app = express();
app.use(express.json());

app.listen(PORT, console.log("server running"));

//ログイン
app.post("/login", (req, res) => {
  const payload = {
    username: req.body.username,
    email: req.body.email,
  };

  const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);

  const body = {
    username: req.body.username,
    email: req.body.email,
    token: token,
  };

  res.status(200).json(body);
});

//認証してみよう
app.get("/test", auth, (req, res) => {
  res.status(200).json({
    msg: "承認に成功しました",
  });
});
