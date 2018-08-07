// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBBMQULm6gx3UwWg-EgCTaN0ca9G-lBZgM",
    authDomain: "click-counter-a7126.firebaseapp.com",
    databaseURL: "https://click-counter-a7126.firebaseio.com",
    projectId: "click-counter-a7126",
    storageBucket: "click-counter-a7126.appspot.com",
    messagingSenderId: "384695093857"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  var currentTime = moment();
var hora = moment(currentTime).format("HH:mm A");
$(".jumbotron").append('Current Time' + " " + hora);
//reload on minute basis to update time till next train
function relod() {
  location.reload();
}

window.setInterval(function () {
  /// call your function here
  relod();
}, 60000);
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var tName = $("#train-name-input").val().trim();//tnmae= any value nput it

    // Time is 3:30 AM
    var firstTime = $("#start-input").val().trim();//firstime= any value nput it
  
    var trainD = $("#destination-input").val().trim();//trainD= any value nput it
  
  
    var tFrequency =$("#frequency-input").val().trim();//frequency= any value nput it
  
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years").format("x");
  //coverts valu from first time into the right format for the function
    // First Time (pushed back 1 year to make sure it comes before current time)
  
  
    // Creates local "temporary" object for holding employee data
    var newEmp = {
      trainname: tName,
      firstrun: firstTimeConverted,
      destiny: trainD,
      often: tFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newEmp);
  
    // Logs everything to console
    console.log(newEmp.trainname);
    console.log(newEmp.firstrun);
    console.log(newEmp.destiny);
    console.log(newEmp.often);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tName = childSnapshot.val().trainname;
    var trainD = childSnapshot.val().destiny;
    var firstTimeConverted =moment(childSnapshot.val().firstrun,"x");
    var tFrequency = childSnapshot.val().often;
  
    // Employee Info
    console.log(tName);
    console.log(firstTimeConverted);
    console.log(trainD);
    console.log(tFrequency);
  
      // Current Time
  var currentTime = moment();

  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  //lower case h=normal time upper case H=military time
 
  // Difference between the times
  var diffTime = moment().diff(firstTimeConverted, "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  //$('#train').append("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(tName),
    $("<td>").text(moment(firstTimeConverted).format("hh:mm a")),//for matted for standard time
    $("<td>").text(trainD),
    $("<td>").text(tFrequency +' '+ "minutes"),
    $("<td>").text(tMinutesTillTrain),//for matted for standard time
    $("<td>").text(moment(nextTrain).format("HH:mm A"))
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  