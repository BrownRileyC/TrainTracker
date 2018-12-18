$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCth5kyXrkHkaRHFW_IwVJbrG3SQ6rRbSs",
        authDomain: "traintracker-858bc.firebaseapp.com",
        databaseURL: "https://traintracker-858bc.firebaseio.com",
        projectId: "traintracker-858bc",
        storageBucket: "traintracker-858bc.appspot.com",
        messagingSenderId: "1063662366444"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var trainNumber = 0;


    $('.submitButton').on('click', function () {
        event.preventDefault();

        var newTrainName = $('#enterTrainName').val().trim();
        var newDestination = $('#enterDestination').val().trim();
        var newStartTime = $('#enterStartTime').val().trim();
        var newFrequency = $('#enterFrequency').val().trim();


        database.ref().push({
            name: newTrainName,
            destination: newDestination,
            start: newStartTime,
            frequency: newFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });
});