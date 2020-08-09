const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bot = require("./utils/BotFunction");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const port = 5000;

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const keyword = req.body.keyword;
  bot(username, password, keyword);
});
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
