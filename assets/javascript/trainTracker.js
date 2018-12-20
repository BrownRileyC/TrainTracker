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
    var intervalID;
    var frequencyArray = [];
    var differenceArray = [];
    var difference = 0;

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
        difference = b.diff(a, 'm');

        while (difference < 1) {
            b.add(sv.frequency, 'm');
            difference = b.diff(a, 'm');
        };
        differenceArray.push(difference);
        frequencyArray.push(sv.frequency);
        var nextArrival = moment(b).format("HH:mm");

        var newRow = $('<tr>').appendTo('.myTable').addClass('row' + trainNumber);
        var trainName = $('<td>');
        var destination = $('<td>');
        var arrival = $('<td>');
        var frequency = $('<td>');
        var minutesAway = $('<td>');
        trainName.text(sv.name);
        destination.text(sv.destination);
        arrival.text(nextArrival).addClass('arrival'+trainNumber);
        minutesAway.text(difference).addClass('minutesAway'+trainNumber);
        frequency.text(sv.frequency);
        newRow.append(trainName, destination, frequency, arrival, minutesAway);
        trainNumber++;
        RunClock();

    }, function (errorObject) {
        alert("I fucked up man");
    });

    var countDown = function() {
        for (var i = 0; i < differenceArray.length; i ++) {
            var newDifference = parseInt(differenceArray[i])-1;
            if (newDifference === 0){
                console.log("The If Happened")
                newDifference = parseInt(frequencyArray[i]);
                var oldArrival = $('.arrival'+i).html();
                console.log("old arrival"+oldArrival);
                var newarrival = moment(oldArrival, "HH:mm");
                console.log("moment object"+newarrival);
                newarrival.add(frequencyArray[i],'m');
                var finalArrival = moment(newarrival).format('HH:mm');
                console.log("SHould be the new time"+finalArrival);
                $('.arrival'+i).text(finalArrival);
            }
            differenceArray.splice(i, 1, newDifference);
            $('.minutesAway'+i).text(differenceArray[i]);
        };
    }

    var RunClock = function() {
        clearInterval(intervalID);
        intervalID = setInterval(countDown, 60000);
    };
    
});