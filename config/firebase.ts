const firebase = require("firebase");
require("firebase/firestore");


  const firebaseConfig = {
    apiKey: "AIzaSyB3WXuNqoQFQSk-QWB_SMBLOVHihqMAecg",
    authDomain: "wiz-word.firebaseapp.com",
    databaseURL: "https://wiz-word.firebaseio.com",
    projectId: "wiz-word",
    storageBucket: "wiz-word.appspot.com",
    messagingSenderId: "669338049620",
    appId: "1:669338049620:web:93eba8f9f570a57e8921c1",
    measurementId: "G-CR6NBS26KD"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;
