const admin = require("./config/initFirebase");
const express = require("express");
const app = express();
const http = require("http").createServer(app);

var io = require("socket.io")(http);

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("/water_pump");

ref.set(
  {
    value: 0,
    isActive: 0,
  },
);

/**
 * Reading Value from
 * Firebase Data Object
 */
ref.once("value", function (snapshot) {
  var data = snapshot.val(); //Data is in JSON format.
  console.log(data);
});

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.redirect("/index.html");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
