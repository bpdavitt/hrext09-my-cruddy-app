/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

//localStorage interaction function
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
}

//create
var createItem = function(key, value) {
  var arr = [];
  arr.push(value);
  return window.localStorage.setItem(key, JSON.stringify(arr));
}

//update
var updateItem = function(key, value) {
  // need to JSON.parse the value @ this key, push value into the array, then re-stringify and replace the value in local storage
  window.localStorage[key].push(JSON.stringify(value));
}

//delete
var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

//clear everything
var clearEverything = function() {
  return window.localStorage.clear();
}

var keyExists = function(key) {
  var currentValue = getItem(key);
  return currentValue !== null;
}

var createWorkout = function(type, duration, distance, notes, time, completed){
  var workout = {
    "type": type,
    "duration": duration,
    "distance": distance,
    "notes": notes,
    "time": time,
    "completed": completed === 'completed'
  }
  return workout;
}


///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  $('#createButton').click(function(event) {
    event.preventDefault();

    var date = $("#dateInput").val();
    var type = $("#typeInput").val();
    var duration = $("#durationInput").val();
    var distance = $("#distanceInput").val();
    var notes = $("#notesInput").val();
    var time = $("#timeInput").val();
    var workout = createWorkout(type, duration, distance, notes, time, 'planned')
    if (keyExists(date)) {
      //current key exists, do something error-handle-y
      updateItem(date,workout);
    } else {
      createItem(date, workout);
    }
  });

  $('#updateButton').click(function(event) {
    event.preventDefault();

    var currentKey = $("#keyInput").val();
    var currentValue = $("#valueInput").val();
    if (keyExists(currentKey)) {
      updateItem(currentKey, currentValue);
    } else {
      //current key doesnt exist, do stuff
    }
  });
});
