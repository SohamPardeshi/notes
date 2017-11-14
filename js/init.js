// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1nbQ_QMFHAposHeZVJyfNjBT8F53cPss",
    authDomain: "markdownnotes-b88c1.firebaseapp.com",
    databaseURL: "https://markdownnotes-b88c1.firebaseio.com",
    projectId: "markdownnotes-b88c1",
    storageBucket: "markdownnotes-b88c1.appspot.com",
    messagingSenderId: "491819736828"
};
firebase.initializeApp(config);


var db = firebase.database();