var admin = require("firebase-admin");
var serviceAccount = require("./config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arduino-mini-pump.firebaseio.com/",
});

module.exports = admin;
