const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretkey = "secretkey";

app.get("/", (req, res) => {
  res.json({
    message: "a simple api",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "muskan",
    email: "muskandubey184@gmail.com",
    age: 18,
  };
  jwt.sign({ user }, secretkey, { expiresIn: "1000s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", vaerifytoken, (req, res) => {
  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      res.send({
        result: "invalid token",
      });
    } else {
      res.json({
        message: " profile accessed",
        authData,
      });
    }
  });
});
// function for vaerify token
function vaerifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "token is not valid",
    });
  }
}

app.listen(4000, () => {
  console.log("app is runing on 5000 port");
});
