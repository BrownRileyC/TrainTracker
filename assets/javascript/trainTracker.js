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
        var newDeparture = $('#enterStartTime').val().trim();
        var newFrequency = $('#enterFrequency').val().trim();

        database.ref().push({
            name: newTrainName,
            destination: newDestination,
            departure: newDeparture,
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

        var now = moment().format("HH:mm");
        var a = moment(now, "HH:mm");
        var b = moment(sv.departure, "HH:mm");
        b.add(sv.frequency, 'm');
        console.log("a: "+a);
        console.log("b: "+b);
        var difference = b.diff(a, 'm');

        while (difference < 1) {
            b.add(sv.frequency, 'm');
            difference = b.diff(a, 'm');
        };
        var nextArrival = moment(b).format("HH:mm");
        console.log(nextArrival);
        console.log("difference: "+difference);

        var newRow = $('<tr>').appendTo('.myTable').addClass('row' + trainNumber);
        var trainName = $('<td>');
        var destination = $('<td>');
        var arrival = $('<td>');
        var frequency = $('<td>');
        var minutesAway = $('<td>');
        trainName.text(sv.name);
        destination.text(sv.destination);
        arrival.text(nextArrival);
        minutesAway.text(difference);
        frequency.text(sv.frequency);
        newRow.append(trainName, destination, frequency, arrival, minutesAway);

        trainNumber++;



    }, function (errorObject) {
        alert("I fucked up man");
    });

});