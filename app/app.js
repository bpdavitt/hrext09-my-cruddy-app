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
    "completed": completed === 'Y'
  }
  return workout;
}

var buildWorkout = function(workout, index){
  var $workout = $('<div class = "workout"></div>')
  var $date = $(`<div class = "date">${formatDate(workout.date)}</div>`)
  var $type = $(`<div class = "type">${workout.type}</div>`)
  var $duration = $(`<div class = "duration">${workout.duration} minutes</div>`)
  var $distance = $(`<div class = "distance">${workout.distance} miles</div>`)
  var $notes = $(`<div class = "notes">Notes: ${workout.notes}</div>`)
  var $time = $(`<div class = "time">Time of Day: ${workout.time}</div>`)
  var $completed = $(`<div class = "completed">Completed: ${workout.completed}</div>`)
  var $index = $(`<div class = "index">${index}</div>`)
  $workout.append($date, $type, $duration, $distance, $notes, $time, $completed, $index);
  return $workout;
}

var deleteWorkout = function(index){
  var allWorkouts = sortLocalStorage();
  allWorkouts.splice(index, 1);
  window.localStorage.setItem('workouts', JSON.stringify(allWorkouts));
  drawWorkouts();
}

var updateWorkout = function(workout, index){
  var allWorkouts = sortLocalStorage();
  allWorkouts.splice(index, 1, workout);
  window.localStorage.setItem('workouts', JSON.stringify(allWorkouts));
  drawWorkouts();
}

function sortLocalStorage(){
   var workouts = JSON.parse(localStorage.getItem('workouts'));
   workouts.sort(function(a,b){
    return a.date < b.date;
   })
   
   return workouts;
}

var formatDate = function(date){
  return date;
  
}

var drawWorkouts = function(){
  var $plannedWorkouts = $(".planned-workouts");
  $plannedWorkouts.html("Planned Workouts")
  var $completedWorkouts = $(".completed-workouts");
  $completedWorkouts.html("Completed Workouts")
  
  var allWorkouts = sortLocalStorage();
  for(var i = 0; i < allWorkouts.length; i++){
    var $workout = buildWorkout(allWorkouts[i], i);
    
    $($workout).click(function(event){
      event.preventDefault();
      //event.currentTarget.lastChild.textContent will allow for access of index
      /*
      var action = prompt("Would you like to delete or update this workout", "Delete/Update");
      if(action === "Delete"){
        deleteWorkout(Number(event.currentTarget.lastChild.textContent));
      }*/
      var $date = $("#dateUpdate")
      modifyWorkout.showModal();
      $("#deleteBtn").click(function(){    
        deleteWorkout(Number(event.currentTarget.lastChild.textContent));
        modifyWorkout.close()
      });
      $("#cancelBtn").click(function(){    
        modifyWorkout.close()
      });
      $("#updateBtn").click(function(){
        var date = $("#dateUpdate").val();
        if(date === ''){
          alert("You must enter a date");
          return undefined;
        }
        var type = $("#typeUpdate").val();
        var duration = Number($("#durationUpdate").val());
        var distance = Number($("#distanceUpdate").val());
        var notes = $("#notesUpdate").val();
        var time = Number($("#timeUpdate").val());
        var completed = $("#completeUpdate").val();
        var updated = createWorkout(date, type, duration, distance, notes, time, completed)
        updateWorkout(updated, event.currentTarget.lastChild.textContent)
        modifyWorkout.close()
      });

      console.log('Index: ' + event.currentTarget.lastChild.textContent);
      
    })
    if(allWorkouts[i].completed){
      $workout.appendTo(".completed-workouts");   
    }else{
      $workout.appendTo(".planned-workouts"); 
    }
  }

}


///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  
  drawWorkouts();

  $('#createButton').click(function(event) {
    event.preventDefault();

    var date = $("#dateInput").val();
    if(date === ''){
      alert("You must enter a date");
      return undefined;
    }
    var type = $("#typeInput").val();
    var duration = Number($("#durationInput").val());
    var distance = Number($("#distanceInput").val());
    var notes = $("#notesInput").val();
    var time = Number($("#timeInput").val());
    var completed = $("#completeInput").val();
    var workout = createWorkout(date, type, duration, distance, notes, time, completed)
    //passes workout into local storage
    createItem('workouts', workout);
    drawWorkouts();
  });

  $(".workout-holder").click(function(event){
    event.preventDefault();
    drawWorkouts();
  });
  
});
