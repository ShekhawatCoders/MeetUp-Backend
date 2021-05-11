var admin = require("firebase-admin");

var serviceAccount = require("./google-services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://famous-palisade-233611.firebaseio.com"
});

exports.module.admin = admin