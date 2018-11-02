var express = require("express");
var app = express();
port = 3010;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server Listening on port #", port);
});
