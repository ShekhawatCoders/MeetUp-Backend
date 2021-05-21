var admin = require("firebase-admin");
var serviceAccount = require("./google-services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teachtous.firebaseio.com"
});

const registrationToken = "fU0w9GZGQp6H7gvxLq6rd1:APA91bEnQTAdbrdlnTBso9ydk6n1hTKj_MgFmsSLoTVhlphNTu2qK9DlH4Nlg9bNnhLy2moUJJkRCxBx7zuvickm02WBvGcP4ZTXpYcUoo1tPj7bHf5Xy0hGAjwTc_eCbkqlhRpb_nr7";

const notification_options = {
    priority : "high",
    timeToLive : 60*60
};

const message = {
    notification : {
        title : "Nodejs App notification Payload",
        body : "This is custom app for nodejs tutorial"
    },
    data : {
        title : "Nodejs App Data Payload",
        desc : "This is description for the Notification",
        score : "1001"
    },
    topic : 'Cricket',
    token : registrationToken
};

admin.messaging().send(message)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

