const admin = require("./config/initFirebase");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
var io = require("socket.io")(http);
require("dotenv").config();



// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("/water_pump");

// ref.set({
//   value: 0,
//   isActive: 0,
// });

io.on("connection", (socket) => {
  socket.on("isActive", (data) => {
    ref.update({
      isActive: data,
    });
  });
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on(
    "value",
    function (snapshot) {
      socket.emit("data", snapshot.val());
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

// setup SSR
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.redirect("/index.html");
});

app.get("/access", (req, res, next) => {
  const {key} = req.query;
  console.log(key)

  if (key == process.env.PRIVATEKEY) {
    res.json({ isAuthorize: true })
  } else {
    res.status(401).json({ isAuthorize: false })
  }

})

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log("listening on *:3000");
});
