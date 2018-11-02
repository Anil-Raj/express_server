var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
port = 3011;

mongoose.connect(
  "mongodb://localhost:27017/express_db",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
var nameSchema = new mongoose.Schema({
  firstName: String,
  secondName: String
});

var User = mongoose.model("User", nameSchema);
app.listen(port, () => {
  console.log("Server Listening on port #", port);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  console.log(User);
  var data = User.find({}, function(err, users) {
    if (err) throw err;
    console.log(data);
    res.send(users);
  });
});

app.post("/user", (req, res) => {
  console.log("data recieved", req);
  var data = new User(req.body);
  console.log(data);
  data
    .save()
    .then(() => {
      res.send("data saved to db");
    })
    .catch(err => {
      res.status(400).send("Unable to save data");
    });
});
