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
    var keyArray = [];


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

        $('#enterTrainName').val('');
        $('#enterDestination').val("");
        $('#enterStartTime').val("");
        $('#enterFrequency').val("");

    });

    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();
        keyArray.push(snapshot.key);
        console.log(keyArray);
        var now = moment();
        var a = moment(now.d).format('x');
        console.log(a);
        console.log(sv.dateAdded);
        sv.dateAdded

        var newRow = $('<tr>').appendTo('.myTable').addClass('row' + trainNumber);
        var trainName = $('<td>');
        var destination = $('<td>');
        var startTime = $('<td>');
        var frequency = $('<td>');
        trainName.text(sv.name);
        destination.text(sv.destination);
        startTime.text(sv.start);
        frequency.text(sv.frequency);
        newRow.append(trainName, destination, startTime, frequency);

        trainNumber++;



    }, function (errorObject) {
        alert("I fucked up man");
    });

});