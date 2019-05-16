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
  if(!keyExists(key)){
    var arr = [];
  }else{
    var arr = JSON.parse(window.localStorage[key])
  }
  arr.push(value);
  return window.localStorage.setItem(key, JSON.stringify(arr));
}

//update
var updateItem = function(key, value) {
  //Will probably need to have the index number of the item we'll be updating. Parse, update, then re-stringify and set value to key

  // need to JSON.parse the value @ this key, push value into the array, then re-stringify and replace the value in local storage
  // var arr = JSON.parse(window.localStorage[key])
  // arr.push(value);
  // return window.localStorage.setItem(key, JSON.stringify(arr));
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

var createWorkout = function(date, type, duration, distance, notes, time, completed){
  var workout = {
    "date": date,
    "type": type,
    "duration": duration,
    "distance": distance,
    "notes": notes,
    "time": time,
    "completed": completed === 'completed'
  }
  return workout;
}

var buildWorkout = function(workout){
  var $workout = $('<div class = "workout"></div>')
  var $date = $(`<div class = "date">${formatDate(workout.date)}</div>`)
  var $type = $(`<div class = "type">${workout.type}</div>`)
  var $duration = $(`<div class = "duration">${workout.duration} minutes</div>`)
  var $distance = $(`<div class = "distance">${workout.distance} miles</div>`)
  var $notes = $(`<div class = "notes">Notes: ${workout.notes}</div>`)
  var $time = $(`<div class = "time">Time of Day: ${workout.time}</div>`)
  var $completed = $(`<div class = "completed">Completed: ${workout.completed}</div>`)
  $workout.append($date, $type, $duration, $distance, $notes, $time, $completed);
  return $workout;
}

function sortLocalStorage(){
   var workouts = JSON.parse(localStorage.getItem('workouts'));
   workouts.sort(function(a,b){
    return a.date < b.date;
   })
   
   return workouts;
}

var formatDate = function(date){
  if(typeof date === 'number'){
    date = date.toString();
    return `${date.substring(0,2)}/${date.substring(2,4)}/${date.substring(4)}`
  }
  if(typeof date === 'string'){
    var temp = date.split('/');
    temp = temp[0] + temp[1] + temp[2];
    return Number(temp);
  }
}

var drawWorkouts = function(){
  var $workoutHolder = $('.workout-holder');
  $workoutHolder.html('Planned Workouts')
  var allWorkouts = sortLocalStorage();
  for(var i = 0; i < allWorkouts.length; i++){
    var $workout = buildWorkout(allWorkouts[i]);
    $workout.appendTo(".workout-holder"); 
  }

}


///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  $('#createButton').click(function(event) {
    event.preventDefault();

    var date = $("#dateInput").val();
    if(date === ''){
      alert("You must enter a date");
      return undefined;
    }
    date = formatDate(date);
    var type = $("#typeInput").val();
    var duration = Number($("#durationInput").val());
    var distance = Number($("#distanceInput").val());
    var notes = $("#notesInput").val();
    var time = Number($("#timeInput").val());
    var workout = createWorkout(date, type, duration, distance, notes, time, 'planned')
    //passes workout into local storage
    createItem('workouts', workout);
    drawWorkouts();
  });

  $(".workout-holder").click(function(event){
    event.preventDefault();
    drawWorkouts();
    //$workoutHolder.html('<div class = "workout-holder">Planned Workouts</div>');

  });



  
});
