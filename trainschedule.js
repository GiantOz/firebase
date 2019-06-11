// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAWahpgzlEC_aIjZy3byG-tSsRvLpQu0zw",
  authDomain: "giantoz-train-schedule.firebaseapp.com",
  databaseURL: "https://giantoz-train-schedule.firebaseio.com",
  projectId: "giantoz-train-schedule",
  storageBucket: "giantoz-train-schedule.appspot.com",
  messagingSenderId: "720957282154",
  appId: "1:720957282154:web:49dca0fe27f29777"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "mm").format("X");
  var trainArrival = $("#arrival-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    arrival: trainArrival
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.arrival);

  $("#displayed-data").text(newTrain.name);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#arrival-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainArrival = childSnapshot.val().arrival;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainArrival);

 

  // Prettify the train start
  var trainStartPretty = moment().minute(15);


  var trainMinutes = moment().diff(moment(trainStart, "m"), "minute");
  console.log(trainMinutes);


  var trainArrival = trainMinutes + 15;
  console.log(trainArrival);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainStartPretty),    
    $("<td>").text(trainArrival),    
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


